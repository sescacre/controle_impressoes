import { state } from '../state';
import type { BannerKind } from '../types';
import { $ } from '../utils/dom';
import { banner } from '../utils/format';

export function showBanner(msg: string, kind: BannerKind): void {
  $('banners').innerHTML = banner(msg, kind);
}

/**
 * Executa uma exportação com o botão em estado "gerando…" e restaura o rótulo ao final.
 * `gerar` devolve o arquivo a baixar, ou `null` se já tratou o erro por conta própria.
 */
export async function runExport(
  btnId: string,
  labelGerando: string,
  gerar: () => Promise<{ filename: string; data: Blob | string } | null>,
): Promise<void> {
  const btn = $<HTMLButtonElement>(btnId);
  const originalLabel = btn.textContent;
  btn.disabled = true;
  btn.textContent = labelGerando;
  const restaurar = (): void => { btn.disabled = false; btn.textContent = originalLabel; };

  const arquivo = await gerar();
  if (!arquivo) { restaurar(); return; }

  if (state.downloads) {
    try { await state.downloads.save(arquivo); restaurar(); return; }
    catch (e) { console.error('download recusado', e); }
  }
  showBanner('Download disponível apenas quando este artifact é aberto na sua conta Claude.', 'warn');
  restaurar();
}
