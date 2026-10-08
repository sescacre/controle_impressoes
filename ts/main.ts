import { loadFromDb } from './data/repository';
import { makeApiDb, makeApiDownloads } from './data/apiDb';
import { bindExcel } from './export/excel';
import { bindPdf } from './export/pdf';
import { bindSql } from './export/sql';
import { state } from './state';
import { bindAdmin } from './ui/admin';
import { configureChartDefaults } from './ui/charts';
import { bindImportarNavegador } from './ui/importar';
import { bindLancamento } from './ui/lancamento';
import { renderAll } from './ui/render';
import { bindSelectors } from './ui/selectors';
import { bindTableSorting } from './ui/tables';

async function initCapabilities(): Promise<void> {
  state.db = makeApiDb();
  state.downloads = makeApiDownloads();
  state.canWrite = true;

  await loadFromDb(state.db);
  renderAll();
}

configureChartDefaults();
bindSelectors(renderAll);
bindTableSorting();
bindLancamento(renderAll);
bindImportarNavegador(renderAll);
bindAdmin();
bindExcel();
bindSql();
bindPdf();
initCapabilities();
