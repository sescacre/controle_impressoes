import { ADMIN_BUTTON_IDS } from '../config';
import { $ } from '../utils/dom';
import { banner } from '../utils/format';
import { ensureSwal } from '../utils/scriptLoader';

let isAdmin = false;
let loggedUserNome = '';

function setAdminButtonsVisible(visible: boolean): void {
  ADMIN_BUTTON_IDS.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('admin-only', !visible);
  });
}

const USER_ICON_SVG = '<svg class="user-badge-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';

function setUserBadge(nome: string): void {
  const badge = $('userBadge');
  badge.innerHTML = '';
  if (nome) {
    badge.insertAdjacentHTML('afterbegin', USER_ICON_SVG);
    const span = document.createElement('span');
    // nome vem do servidor (cadastro de usuário) — texto via textContent, nunca interpolado em HTML.
    span.textContent = nome;
    badge.appendChild(span);
  }
  badge.classList.toggle('visible', Boolean(nome));
}

/** Alterna um campo de senha entre oculto/visível pelo botão "olhinho" ao lado. */
function bindPassToggle(inputId: string, toggleId: string): void {
  const input = $<HTMLInputElement>(inputId);
  const toggle = $<HTMLButtonElement>(toggleId);
  toggle.addEventListener('click', () => {
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    toggle.textContent = show ? '🙈' : '👁';
    const label = show ? 'Ocultar senha' : 'Mostrar senha';
    toggle.setAttribute('aria-label', label);
    toggle.title = label;
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
      showCancelButton: true,
      confirmButtonText: '<span class="getic-btn-icon">🔒</span> Sair',
      cancelButtonText: '<span class="getic-btn-icon">✕</span> Cancelar',
      customClass: {
        popup: 'getic-swal-popup', title: 'getic-swal-title', htmlContainer: 'getic-swal-html',
        confirmButton: 'getic-swal-confirm', cancelButton: 'getic-swal-cancel', icon: 'getic-swal-icon',
        actions: 'getic-swal-actions', closeButton: 'getic-swal-closebtn',
      },
      buttonsStyling: false, confirmButtonColor: undefined,
    });
    if (r.isConfirmed) { isAdmin = false; setAdminButtonsVisible(false); btn.textContent = '🔒 Área admin'; setUserBadge(''); }
    return;
  }
  const { value: ok2 } = await Swal.fire({
    title: 'Área Administrativa',
    html:
      '<div class="swal2-input getic-swal-input">' +
      '<span class="getic-field-icon">👤</span>' +
      '<input id="swal-user" placeholder="Usuário" autocomplete="off">' +
      '</div>' +
      '<div class="swal2-input getic-swal-input">' +
      '<span class="getic-field-icon">🔒</span>' +
      '<input id="swal-pass" type="password" placeholder="Senha" autocomplete="off">' +
      '<button type="button" id="swal-pass-toggle" class="getic-pass-toggle" aria-label="Mostrar senha" title="Mostrar senha">👁</button>' +
      '</div>',
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: '<span class="getic-btn-icon">🔓</span> Entrar',
    cancelButtonText: '<span class="getic-btn-icon">✕</span> Cancelar',
    buttonsStyling: false,
    customClass: {
      popup: 'getic-swal-popup', title: 'getic-swal-title', htmlContainer: 'getic-swal-html',
      confirmButton: 'getic-swal-confirm', cancelButton: 'getic-swal-cancel',
      validationMessage: 'getic-swal-validation', actions: 'getic-swal-actions', closeButton: 'getic-swal-closebtn',
    },
    didOpen: () => {
      // Inputs são HTML manual, então o atalho padrão de Enter do SweetAlert2
      // (que só reconhece o próprio option "input") não se aplica aqui.
      const onEnter = (ev: KeyboardEvent) => { if (ev.key === 'Enter') Swal.clickConfirm(); };
      $<HTMLInputElement>('swal-user').addEventListener('keydown', onEnter);
      $<HTMLInputElement>('swal-pass').addEventListener('keydown', onEnter);
      bindPassToggle('swal-pass', 'swal-pass-toggle');
    },
    preConfirm: async () => {
      const confirmBtn = Swal.getConfirmButton();
      const resetBtn = () => { if (confirmBtn) confirmBtn.innerHTML = '<span class="getic-btn-icon">🔓</span> Entrar'; };

      const u = $<HTMLInputElement>('swal-user').value.trim();
      const p = $<HTMLInputElement>('swal-pass').value;
      if (!u || !p) { Swal.showValidationMessage('Preencha usuário e senha.'); return false; }

      if (confirmBtn) confirmBtn.innerHTML = '<span class="getic-btn-icon">⏳</span> Entrando...';
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ usuario: u, senha: p }),
        });
        if (!res.ok) {
          resetBtn();
          Swal.showValidationMessage('Usuário ou senha inválidos');
          return false;
        }
        const data = await res.json().catch(() => ({}) as { nome?: string });
        loggedUserNome = data.nome || u;
      } catch (e) {
        console.error('Falha ao validar login', e);
        resetBtn();
        Swal.showValidationMessage('Não foi possível validar o login agora. Tente novamente.');
        return false;
      }
      return true;
    },
  });
  if (ok2) {
    isAdmin = true;
    setAdminButtonsVisible(true);
    setUserBadge(loggedUserNome);
    btn.textContent = '🔓 Sair da área admin';
    Swal.fire({
      icon: 'success', title: 'Acesso liberado', timer: 1200, showConfirmButton: false,
      customClass: { popup: 'getic-swal-popup', title: 'getic-swal-title', icon: 'getic-swal-icon' },
    });
  }
}

async function cadastrarUsuario(): Promise<void> {
  const ok = await ensureSwal();
  const Swal = window.Swal;
  if (!ok || !Swal) {
    $('banners').innerHTML = banner('Não foi possível carregar o formulário agora. Tente novamente em instantes.', 'err');
    return;
  }
  const field = (icon: string, inputHtml: string, toggleId?: string) =>
    '<div class="swal2-input getic-swal-input">' +
    `<span class="getic-field-icon">${icon}</span>` +
    inputHtml +
    (toggleId ? `<button type="button" id="${toggleId}" class="getic-pass-toggle" aria-label="Mostrar senha" title="Mostrar senha">👁</button>` : '') +
    '</div>';

  const { value } = await Swal.fire({
    title: 'Cadastrar novo usuário',
    html:
      field('🪪', '<input id="swal-novo-nome" placeholder="Nome completo" autocomplete="off">') +
      field('👤', '<input id="swal-novo-usuario" placeholder="Usuário (login)" autocomplete="off">') +
      field('🔒', '<input id="swal-novo-senha" type="password" placeholder="Senha (mín. 6 caracteres)" autocomplete="new-password">', 'swal-novo-senha-toggle') +
      field('🔒', '<input id="swal-novo-senha2" type="password" placeholder="Confirmar senha" autocomplete="new-password">', 'swal-novo-senha2-toggle'),
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: '<span class="getic-btn-icon">➕</span> Cadastrar',
    cancelButtonText: '<span class="getic-btn-icon">✕</span> Cancelar',
    buttonsStyling: false,
    customClass: {
      popup: 'getic-swal-popup', title: 'getic-swal-title', htmlContainer: 'getic-swal-html',
      confirmButton: 'getic-swal-confirm', cancelButton: 'getic-swal-cancel',
      validationMessage: 'getic-swal-validation', actions: 'getic-swal-actions', closeButton: 'getic-swal-closebtn',
    },
    didOpen: () => {
      const onEnter = (ev: KeyboardEvent) => { if (ev.key === 'Enter') Swal.clickConfirm(); };
      ['swal-novo-nome', 'swal-novo-usuario', 'swal-novo-senha', 'swal-novo-senha2'].forEach(id => {
        $<HTMLInputElement>(id).addEventListener('keydown', onEnter);
      });
      bindPassToggle('swal-novo-senha', 'swal-novo-senha-toggle');
      bindPassToggle('swal-novo-senha2', 'swal-novo-senha2-toggle');
    },
    preConfirm: async () => {
      const confirmBtn = Swal.getConfirmButton();
      const resetBtn = () => { if (confirmBtn) confirmBtn.innerHTML = '<span class="getic-btn-icon">➕</span> Cadastrar'; };

      const nome = $<HTMLInputElement>('swal-novo-nome').value.trim();
      const usuario = $<HTMLInputElement>('swal-novo-usuario').value.trim();
      const senha = $<HTMLInputElement>('swal-novo-senha').value;
      const senha2 = $<HTMLInputElement>('swal-novo-senha2').value;
      if (!nome || !usuario) { Swal.showValidationMessage('Preencha nome e usuário.'); return false; }
      if (senha.length < 6) { Swal.showValidationMessage('A senha deve ter pelo menos 6 caracteres.'); return false; }
      if (senha !== senha2) { Swal.showValidationMessage('As senhas digitadas não coincidem.'); return false; }

      if (confirmBtn) confirmBtn.innerHTML = '<span class="getic-btn-icon">⏳</span> Cadastrando...';
      try {
        const res = await fetch('/api/usuarios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, usuario, senha }),
        });
        const data = await res.json().catch(() => ({}) as { error?: string });
        if (!res.ok) {
          resetBtn();
          Swal.showValidationMessage(data.error || 'Não foi possível cadastrar o usuário agora.');
          return false;
        }
      } catch (e) {
        console.error('Falha ao cadastrar usuário', e);
        resetBtn();
        Swal.showValidationMessage('Não foi possível cadastrar o usuário agora. Tente novamente.');
        return false;
      }
      return true;
    },
  });
  if (value) {
    Swal.fire({
      icon: 'success', title: 'Usuário cadastrado', timer: 1400, showConfirmButton: false,
      customClass: { popup: 'getic-swal-popup', title: 'getic-swal-title', icon: 'getic-swal-icon' },
    });
  }
}

export function bindAdmin(): void {
  setAdminButtonsVisible(false);
  $('btnAdmin').addEventListener('click', abrirAreaAdmin);
  $('btnCadastrarUsuario').addEventListener('click', cadastrarUsuario);
}
