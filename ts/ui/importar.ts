import { LS_KEY } from '../config';
import { loadFromDb } from '../data/repository';
import { state } from '../state';
import type { DocData } from '../types';
import { $ } from '../utils/dom';
import { banner } from '../utils/format';
import { ensureSwal } from '../utils/scriptLoader';

interface LocalStorageDump {
  equipamentos?: Record<string, DocData>;
  leituras?: Record<string, DocData>;
  meses?: Record<string, DocData>;
}

function lerDadosDoNavegador(): LocalStorageDump | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LocalStorageDump;
  } catch (e) {
    console.error('Falha ao ler localStorage', e);
    return null;
  }
}

async function importarDoNavegador(onImported: () => void): Promise<void> {
  const dump = lerDadosDoNavegador();
  if (!dump || (!dump.equipamentos && !dump.leituras && !dump.meses)) {
    $('banners').innerHTML = banner('Nenhum dado salvo foi encontrado neste navegador.', 'warn');
    return;
  }

  const ok = await ensureSwal();
  const Swal = window.Swal;
  if (ok && Swal) {
    const meses = Object.keys(dump.meses || {}).length;
    const { isConfirmed } = await Swal.fire({
      icon: 'warning',
      title: 'Importar dados deste navegador?',
      html: `Isso vai enviar os dados salvos <b>neste navegador</b> (${meses} mês(es) lançado(s)) para o banco compartilhado, substituindo os registros com o mesmo mês/equipamento já salvos no servidor.`,
      showCancelButton: true,
      confirmButtonText: 'Importar',
      cancelButtonText: 'Cancelar',
      buttonsStyling: false,
      customClass: {
        popup: 'getic-swal-popup', title: 'getic-swal-title', htmlContainer: 'getic-swal-html',
        confirmButton: 'getic-swal-confirm', cancelButton: 'getic-swal-cancel', icon: 'getic-swal-icon',
        actions: 'getic-swal-actions', closeButton: 'getic-swal-closebtn',
      },
    });
    if (!isConfirmed) return;
  }

  const btn = $<HTMLButtonElement>('btnImportarNavegador');
  const originalLabel = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Importando…';
  try {
    const res = await fetch('/api/import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dump),
    });
    if (!res.ok) throw new Error(`import falhou: ${res.status}`);
    if (state.db) await loadFromDb(state.db);
    onImported();
    $('banners').innerHTML = banner('Dados deste navegador importados para o banco compartilhado com sucesso.', 'ok');
  } catch (e) {
    console.error('Falha ao importar dados do navegador', e);
    $('banners').innerHTML = banner('Não foi possível importar os dados deste navegador agora. Tente novamente.', 'err');
  } finally {
    btn.disabled = false;
    btn.textContent = originalLabel;
  }
}

export function bindImportarNavegador(onImported: () => void): void {
  $('btnImportarNavegador').addEventListener('click', () => importarDoNavegador(onImported));
}
