import { CDN } from '../config';

export function loadScriptOnce(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-dyn="' + src + '"]');
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('load fail')));
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.dataset.dyn = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('load fail ' + src));
    document.head.appendChild(s);
  });
}

/** Carrega uma biblioteca global tentando o cdnjs e, se falhar, o jsDelivr. */
async function ensureLib(nome: string, isLoaded: () => boolean, urls: { cdnjs: string; jsdelivr: string }): Promise<boolean> {
  if (isLoaded()) return true;
  try { await loadScriptOnce(urls.cdnjs); }
  catch (e) { console.error(`Falha ao carregar ${nome} (cdnjs)`, e); }
  if (isLoaded()) return true;
  try { await loadScriptOnce(urls.jsdelivr); }
  catch (e) { console.error(`Falha ao carregar ${nome} (jsdelivr)`, e); }
  return isLoaded();
}

export const ensureSwal = () => ensureLib('SweetAlert2', () => !!window.Swal, CDN.swal);
export const ensureJsPDF = () => ensureLib('jsPDF', () => !!(window.jspdf && window.jspdf.jsPDF), CDN.jspdf);
export const ensureXLSX = () => ensureLib('XLSX', () => !!window.XLSX, CDN.xlsx);
