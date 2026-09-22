export const LS_KEY = 'getic_dashboard_v1';

export const MESES_PT = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

/* Regra de preço confirmada linha a linha contra a planilha Sermatec (Jan–Ago/2026):
   - Locação: C7020, C306, C605 e T120 = R$ 184; demais = R$ 80 (bate 100% com a planilha)
   - Valor por folha: C7020, C306 e C605 = R$ 0,38 · T120 = R$ 8,00 (plotter A1, preço bem mais alto
     por ser impressão de grande formato) · demais = R$ 0,05 */
export const MAQUINAS_038 = new Set(['C7020', 'C306', 'C605']);
export const MAQUINAS_LOC_184 = new Set(['C7020', 'C306', 'C605', 'T120']);

/* Modelos policromáticos (coloridos), usados na classificação exibida no card "Equipamentos ativos".
   Hoje coincidem com os de R$ 0,38 por folha, mas são regras independentes. */
export const MAQUINAS_POLICROMATICAS = new Set(['C7020', 'C306', 'C605']);

/* Valores mensais estimados do Contrato AC-2022-CS-003 (SERMATEC), cláusula Terceira - Do Preço:
   Impressão: itens 01+02+03 = 3.250,00 + 760,00 + 800,00 = 4.810,00
   Locação:   itens 04+05+06+07 = 1.360,00 + 552,00 + 184,00 + 160,00 = 2.256,00 */
export const CONTRATO_MENSAL = { impressao: 4810.00, locacao: 2496.00 }; // locação suplementada por aditivo
/* Total anual do Contrato AC-2022-CS-003, confirmado pelo usuário: R$ 84.792,00 (= 12 x mensal) */
export const CONTRATO_ANUAL = { impressao: 57720.00, locacao: 29952.00, total: 87672.00 }; // locação suplementada por aditivo (29.952,00/ano)

export const ADMIN_USER = 'admin';
export const ADMIN_PASS = 'c8s7e9s1';
export const ADMIN_BUTTON_IDS = ['btnNovoMes', 'btnExcel', 'btnSql', 'btnRecibo', 'historyPanel'];

export const CDN = {
  swal: {
    cdnjs: 'https://cdnjs.cloudflare.com/ajax/libs/sweetalert2/11.14.5/sweetalert2.all.min.js',
    jsdelivr: 'https://cdn.jsdelivr.net/npm/sweetalert2@11.14.5/dist/sweetalert2.all.min.js',
  },
  jspdf: {
    cdnjs: 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.2/jspdf.umd.min.js',
    jsdelivr: 'https://cdn.jsdelivr.net/npm/jspdf@2.5.2/dist/jspdf.umd.min.js',
  },
  xlsx: {
    cdnjs: 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
    jsdelivr: 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js',
  },
};
