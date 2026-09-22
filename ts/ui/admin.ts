import { ADMIN_BUTTON_IDS, ADMIN_PASS, ADMIN_USER } from '../config';
import { $ } from '../utils/dom';
import { banner } from '../utils/format';
import { ensureSwal } from '../utils/scriptLoader';

let isAdmin = false;

function setAdminButtonsVisible(visible: boolean): void {
  ADMIN_BUTTON_IDS.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('admin-only', !visible);
  });
}

async function abrirAreaAdmin(): Promise<void> {
  const btn = $('btnAdmin');
  const ok = await ensureSwal();
  const Swal = window.Swal;
  if (!ok || !Swal) {
    $('banners').innerHTML = banner('Não foi possível carregar a tela de login agora. Tente novamente em instantes.', 'err');
    return;
  }
  if (isAdmin) {
    const r = await Swal.fire({
      icon: 'question', title: 'Sair da área administrativa?',
      showCancelButton: true, confirmButtonText: 'Sair', cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'getic-swal-popup', title: 'getic-swal-title', htmlContainer: 'getic-swal-html',
        confirmButton: 'getic-swal-confirm', cancelButton: 'getic-swal-cancel', icon: 'getic-swal-icon',
        actions: 'getic-swal-actions', closeButton: 'getic-swal-closebtn',
      },
      buttonsStyling: false, confirmButtonColor: undefined,
    });
    if (r.isConfirmed) { isAdmin = false; setAdminButtonsVisible(false); btn.textContent = '🔒 Área admin'; }
    return;
  }
  const { value: ok2 } = await Swal.fire({
    title: 'Área Administrativa',
    html:
      '<input id="swal-user" class="swal2-input getic-swal-input" placeholder="Usuário" autocomplete="off">' +
      '<input id="swal-pass" type="password" class="swal2-input getic-swal-input" placeholder="Senha" autocomplete="off">',
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Entrar',
    cancelButtonText: 'Cancelar',
    buttonsStyling: false,
    customClass: {
      popup: 'getic-swal-popup', title: 'getic-swal-title', htmlContainer: 'getic-swal-html',
      confirmButton: 'getic-swal-confirm', cancelButton: 'getic-swal-cancel',
      validationMessage: 'getic-swal-validation', actions: 'getic-swal-actions', closeButton: 'getic-swal-closebtn',
    },
    preConfirm: () => {
      const u = $<HTMLInputElement>('swal-user').value.trim();
      const p = $<HTMLInputElement>('swal-pass').value;
      if (u !== ADMIN_USER || p !== ADMIN_PASS) {
        Swal.showValidationMessage('Usuário ou senha inválidos');
        return false;
      }
      return true;
    },
  });
  if (ok2) {
    isAdmin = true;
    setAdminButtonsVisible(true);
    btn.textContent = '🔓 Sair da área admin';
    Swal.fire({
      icon: 'success', title: 'Acesso liberado', timer: 1200, showConfirmButton: false,
      customClass: { popup: 'getic-swal-popup', title: 'getic-swal-title', icon: 'getic-swal-icon' },
    });
  }
}

export function bindAdmin(): void {
  setAdminButtonsVisible(false);
  $('btnAdmin').addEventListener('click', abrirAreaAdmin);
}
