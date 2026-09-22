import { state } from '../state';
import { $ } from '../utils/dom';
import { sqlEscape } from '../utils/format';
import { runExport, showBanner } from './download';

/* Gera script SQL (alternativa a banco relacional externo). */
function montarScriptSql(): string {
  const lines: string[] = [];
  lines.push('-- Script gerado pelo SGCI · Controle de Impressão e Locação');
  lines.push('-- Gerado em ' + new Date().toLocaleString('pt-BR'));
  lines.push('');
  lines.push('CREATE TABLE IF NOT EXISTS equipamentos (');
  lines.push('  item INTEGER PRIMARY KEY,');
  lines.push('  grupo VARCHAR(60) NOT NULL,');
  lines.push('  setor VARCHAR(200) NOT NULL,');
  lines.push('  cod_orc VARCHAR(20) NOT NULL,');
  lines.push('  sigla VARCHAR(60) NOT NULL,');
  lines.push('  maquina VARCHAR(30),');
  lines.push('  tipo_equip VARCHAR(30),');
  lines.push('  valor_loc DECIMAL(10,2) NOT NULL,');
  lines.push('  valor_unit DECIMAL(10,4) NOT NULL');
  lines.push(');');
  lines.push('');
  lines.push('CREATE TABLE IF NOT EXISTS leituras (');
  lines.push('  id INTEGER PRIMARY KEY AUTOINCREMENT,');
  lines.push('  month_key VARCHAR(7) NOT NULL,');
  lines.push('  item INTEGER NOT NULL REFERENCES equipamentos(item),');
  lines.push('  leitura_anterior DECIMAL(14,2) NOT NULL,');
  lines.push('  leitura_atual DECIMAL(14,2) NOT NULL,');
  lines.push('  saved_at DATETIME,');
  lines.push('  UNIQUE(month_key, item)');
  lines.push(');');
  lines.push('');
  lines.push('-- Cadastro de equipamentos');
  state.equipList.forEach(e => {
    lines.push(`INSERT INTO equipamentos (item, grupo, setor, cod_orc, sigla, maquina, tipo_equip, valor_loc, valor_unit) VALUES (${[
      sqlEscape(e.item), sqlEscape(e.grupo), sqlEscape(e.setor), sqlEscape(e.cod_orc), sqlEscape(e.sigla),
      sqlEscape(e.maquina), sqlEscape(e.tipo_equip), sqlEscape(e.valor_loc), sqlEscape(e.valor_unit),
    ].join(', ')});`);
  });
  lines.push('');
  lines.push('-- Leituras mensais');
  state.months.forEach(mk => {
    const readings = state.readingsByMonth[mk] || {};
    state.equipList.forEach(e => {
      const rd = readings[e.item];
      if (!rd) return;
      lines.push(`INSERT INTO leituras (month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES (${[
        sqlEscape(mk), sqlEscape(e.item), sqlEscape(rd.leitura_anterior), sqlEscape(rd.leitura_atual), sqlEscape(new Date().toISOString()),
      ].join(', ')});`);
    });
  });
  return lines.join('\n') + '\n';
}

async function gerarSql(): Promise<void> {
  await runExport('btnSql', 'Gerando SQL…', async () => {
    try {
      const filename = `script_banco_getic_${state.months[0]}_a_${state.months[state.months.length - 1]}.txt`;
      return { filename, data: montarScriptSql() };
    } catch (e) {
      console.error('Falha ao montar o SQL', e);
      showBanner('Não foi possível montar o script SQL.', 'err');
      return null;
    }
  });
}

export function bindSql(): void {
  $('btnSql').addEventListener('click', gerarSql);
}
