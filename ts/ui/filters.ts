import { state } from '../state';
import { $ } from '../utils/dom';

export function renderFilters(onChange: () => void): void {
  const grupos = ['Todos', ...Array.from(new Set(state.equipList.map(e => e.grupo)))];
  const el = $('filters');
  el.innerHTML = grupos.map(g => `<button class="pill" data-g="${g}">${g === 'Todos' ? 'Todas as unidades' : g}</button>`).join('');
  el.querySelectorAll<HTMLButtonElement>('button').forEach(b => {
    if (b.dataset.g === state.currentGrupo) b.classList.add('active');
    b.addEventListener('click', () => { state.currentGrupo = b.dataset.g as string; onChange(); });
  });
}
