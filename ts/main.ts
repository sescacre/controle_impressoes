import { loadFromDb } from './data/repository';
import { makeLocalDb, makeLocalDownloads } from './data/localDb';
import { bindExcel } from './export/excel';
import { bindPdf } from './export/pdf';
import { bindSql } from './export/sql';
import { state } from './state';
import { bindAdmin } from './ui/admin';
import { configureChartDefaults } from './ui/charts';
import { bindLancamento } from './ui/lancamento';
import { renderAll } from './ui/render';
import { bindSelectors } from './ui/selectors';
import { bindTableSorting } from './ui/tables';
import { $ } from './utils/dom';

async function initCapabilities(): Promise<void> {
  state.db = makeLocalDb();
  state.downloads = makeLocalDownloads();
  state.canWrite = true;

  $('dbNote').textContent = 'Versão independente — os dados ficam salvos neste navegador (localStorage), não são compartilhados com mais ninguém.';

  await loadFromDb(state.db);
  renderAll();
}

configureChartDefaults();
bindSelectors(renderAll);
bindTableSorting();
bindLancamento(renderAll);
bindAdmin();
bindExcel();
bindSql();
bindPdf();
initCapabilities();
