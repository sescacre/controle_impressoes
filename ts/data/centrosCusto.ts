/**
 * Mapeamento cod_orc -> projeto/rateio, conforme planilha de referência da GETIC.
 * Fonte: tabela de centros de custo e projetos informada pelo usuário.
 * PROVISÓRIO: nome do projeto para itens não confirmados na planilha de exemplo
 * foi derivado do setor; ajustar depois se divergir do nome oficial do projeto.
 */
export interface ProjetoInfo {
  projeto: number;
  nome: string;
}

export const PROJETO_POR_COD_ORC: Record<string, ProjetoInfo> = {
  '001400160102': { projeto: 1427, nome: 'Gestão de Comunicação Institucional' },
  '001600050102': { projeto: 1461, nome: 'Ensino Fundamental' },
  '001400050102': { projeto: 1416, nome: 'Direção Regional' },
  '001400150102': { projeto: 1426, nome: 'Gerência de Obras e Manutenção' },
  '001400120102': { projeto: 1423, nome: 'Gerência de Contabilidade' },
  '001600020103': { projeto: 1432, nome: 'Nutrição' },
  '001600100115': { projeto: 1494, nome: 'Mesa Brasil' },
  '001600120102': { projeto: 1467, nome: 'Central de Relacionamento' },
  '001400030102': { projeto: 1414, nome: 'Assessoria Jurídica' },
  '001400060102': { projeto: 1417, nome: 'Assessoria de Planejamento e Orçamento' },
  '001400080102': { projeto: 1419, nome: 'Gerência de Pessoas' },
  '001400070102': { projeto: 1418, nome: 'Diretoria Administrativa e Financeira' },
  '001500030102': { projeto: 1436, nome: 'Gerência de Cultura' },
  '001600140102': { projeto: 1430, nome: 'Odontologia' },
  '001800020102': { projeto: 1497, nome: 'Unidade de Cultura e Lazer - Senador Guiomard' },
  '002000010102': { projeto: 1429, nome: 'Sesc Ler - Xapuri' },
  '001700020102': { projeto: 1495, nome: 'Unidade de Cultura e Lazer - Brasiléia' },
  '001900020102': { projeto: 1496, nome: 'Unidade de Cultura e Lazer - Plácido de Castro' },
  '002100010102': { projeto: 1429, nome: 'Sesc Ler - Feijó' },
  '002200010102': { projeto: 1472, nome: 'Gerência da Unidade de Turismo e Lazer' },
  '002200020102': { projeto: 1473, nome: 'Gerência do Hotel' },
  '002200070102': { projeto: 1467, nome: 'Central de Relacionamento' },
  '002200060103': { projeto: 1432, nome: 'Nutrição' },
};
