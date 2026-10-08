-- Script gerado a partir dos dados reais salvos no localStorage do navegador (chave getic_dashboard_v1)
-- Gerado em 2026-09-27T15:43:55.949Z

CREATE DATABASE IF NOT EXISTS controle_impressoes CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE controle_impressoes;

DROP TABLE IF EXISTS leituras;
DROP TABLE IF EXISTS meses;
DROP TABLE IF EXISTS equipamentos;

CREATE TABLE equipamentos (
  item INT PRIMARY KEY,
  grupo VARCHAR(60) NOT NULL,
  setor VARCHAR(200) NOT NULL,
  cod_orc VARCHAR(20) NOT NULL,
  sigla VARCHAR(60) NOT NULL,
  maquina VARCHAR(30) NOT NULL,
  tipo_equip VARCHAR(30) NOT NULL,
  valor_loc DECIMAL(10,2) NOT NULL,
  l_ant DECIMAL(14,2) NOT NULL,
  l_atual DECIMAL(14,2) NOT NULL,
  valor_unit DECIMAL(10,4) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE meses (
  month_key VARCHAR(7) PRIMARY KEY,
  label VARCHAR(20) NOT NULL,
  created_at DATETIME NOT NULL
) ENGINE=InnoDB;

-- Sem FOREIGN KEY para meses/equipamentos: o app grava as leituras de um mês
-- antes de gravar o registro do mês em si (ver ts/data/repository.ts e
-- ts/ui/lancamento.ts), então uma FK aqui rejeitaria essa ordem de escrita.
CREATE TABLE leituras (
  id VARCHAR(20) PRIMARY KEY,
  month_key VARCHAR(7) NOT NULL,
  item INT NOT NULL,
  leitura_anterior DECIMAL(14,2) NOT NULL,
  leitura_atual DECIMAL(14,2) NOT NULL,
  saved_at DATETIME NOT NULL,
  UNIQUE KEY uq_mes_item (month_key, item)
) ENGINE=InnoDB;

-- Usuários com acesso à área administrativa. Sem DROP TABLE (diferente das
-- tabelas acima): reexecutar este script não pode apagar as contas já
-- cadastradas. Senha nunca em texto puro — só o hash (bcrypt) via server/api.js.
-- "usuario" usa collation _bin (case sensitive): "Admin" e "admin" são logins
-- distintos, tanto na unicidade quanto na checagem feita em POST /api/auth/login.
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario VARCHAR(60) COLLATE utf8mb4_bin NOT NULL UNIQUE,
  nome VARCHAR(120) NOT NULL,
  senha_hash VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL
) ENGINE=InnoDB;

-- Usuário admin "de bootstrap" (mesmas credenciais hoje hardcoded em ts/config.ts:
-- ADMIN_USER/ADMIN_PASS = admin/c8s7e9s1). Hash bcrypt da senha "c8s7e9s1".
-- ON DUPLICATE KEY UPDATE: reexecutar o script atualiza o hash em vez de duplicar a conta.
INSERT INTO usuarios (usuario, nome, senha_hash, created_at)
VALUES ('admin', 'Administrador', '$2b$10$WA9//RKJpwbYqQvAYpdEO.Zygwp1lh.VXi469t8ZxY9ehTeL0JWMq', NOW())
ON DUPLICATE KEY UPDATE senha_hash = VALUES(senha_hash);

-- Cadastro de equipamentos (26 registros)
INSERT INTO equipamentos (item, grupo, setor, cod_orc, sigla, maquina, tipo_equip, valor_loc, l_ant, l_atual, valor_unit) VALUES (1, 'SESC RIO BRANCO', 'Gerencia de Comunicação Institucional - DPI - Bosque', '001400160102', 'GEDPI', 'C7020', 'Multifuncional', 184, 116619, 118129, 0.38);
INSERT INTO equipamentos (item, grupo, setor, cod_orc, sigla, maquina, tipo_equip, valor_loc, l_ant, l_atual, valor_unit) VALUES (2, 'SESC RIO BRANCO', 'Ensino Fundamental - Bosque', '001600050102', 'ESCOLA', 'C306', 'Multifuncional', 184, 33238, 35590, 0.38);
INSERT INTO equipamentos (item, grupo, setor, cod_orc, sigla, maquina, tipo_equip, valor_loc, l_ant, l_atual, valor_unit) VALUES (3, 'SESC RIO BRANCO', 'Direção, Coordenação e Supervisão - GDR 2° Andar - Bosque', '001400050102', 'GDR', 'C605', 'Multifuncional', 184, 41929, 44200, 0.38);
INSERT INTO equipamentos (item, grupo, setor, cod_orc, sigla, maquina, tipo_equip, valor_loc, l_ant, l_atual, valor_unit) VALUES (4, 'SESC RIO BRANCO', 'Gerência de Manutenção e Obras', '001400150102', 'GEA', 'T120', 'Impressora A1', 184, 4150.65, 4305.16, 8);
INSERT INTO equipamentos (item, grupo, setor, cod_orc, sigla, maquina, tipo_equip, valor_loc, l_ant, l_atual, valor_unit) VALUES (5, 'SESC RIO BRANCO', 'Contabilidade', '001400120102', 'GECON', '3320', 'Impressora', 80, 259412, 259882, 0.05);
INSERT INTO equipamentos (item, grupo, setor, cod_orc, sigla, maquina, tipo_equip, valor_loc, l_ant, l_atual, valor_unit) VALUES (6, 'SESC RIO BRANCO', 'Direção, Coordenação e Supervisão - Nutrição', '001600020103', 'NUTRIÇÃO', '3320', 'Impressora', 80, 234499, 235967, 0.05);
INSERT INTO equipamentos (item, grupo, setor, cod_orc, sigla, maquina, tipo_equip, valor_loc, l_ant, l_atual, valor_unit) VALUES (8, 'SESC RIO BRANCO', 'Segurança Alimentar e Apoio Social/projeto Mesa Brasil', '001600100115', 'MESA BRASIL', '3225', 'Multifuncional', 80, 74807, 75966, 0.05);
INSERT INTO equipamentos (item, grupo, setor, cod_orc, sigla, maquina, tipo_equip, valor_loc, l_ant, l_atual, valor_unit) VALUES (9, 'SESC RIO BRANCO', 'Segurança Alimentar e Apoio Social/projeto Mesa Brasil', '001600100115', 'MESA BRASIL', '3225', 'Multifuncional', 80, 87481, 88114, 0.05);
INSERT INTO equipamentos (item, grupo, setor, cod_orc, sigla, maquina, tipo_equip, valor_loc, l_ant, l_atual, valor_unit) VALUES (10, 'SESC RIO BRANCO', 'Ensino Fundamental - Bosque', '001600050102', 'ESCOLA', '-', 'Multifuncional', 80, 600849, 605205, 0.05);
INSERT INTO equipamentos (item, grupo, setor, cod_orc, sigla, maquina, tipo_equip, valor_loc, l_ant, l_atual, valor_unit) VALUES (11, 'SESC RIO BRANCO', 'Relacionamento Com Cliente - Bloco de Saúde - Bosque', '001600120102', 'CR-ACADEMIA', '4070', 'Multifuncional', 80, 14307, 16609, 0.05);
INSERT INTO equipamentos (item, grupo, setor, cod_orc, sigla, maquina, tipo_equip, valor_loc, l_ant, l_atual, valor_unit) VALUES (12, 'SESC RIO BRANCO', 'Relacionamento com Cliente - Bosque', '001600120102', 'CR-BOSQUE', '4070', 'Multifuncional', 80, 455003, 457155, 0.05);
INSERT INTO equipamentos (item, grupo, setor, cod_orc, sigla, maquina, tipo_equip, valor_loc, l_ant, l_atual, valor_unit) VALUES (13, 'SESC RIO BRANCO', 'Serviços Jurídicos - ASSEJUR', '001400030102', 'ASSEJUR', '3225', 'Multifuncional', 80, 28736, 29285, 0.05);
INSERT INTO equipamentos (item, grupo, setor, cod_orc, sigla, maquina, tipo_equip, valor_loc, l_ant, l_atual, valor_unit) VALUES (14, 'SESC RIO BRANCO', 'Assessoria de Planejamento e Orçamento 3° Andar - Bosque', '001400060102', 'ATP', '4070', 'Multifuncional', 80, 168022, 169009, 0.05);
INSERT INTO equipamentos (item, grupo, setor, cod_orc, sigla, maquina, tipo_equip, valor_loc, l_ant, l_atual, valor_unit) VALUES (15, 'SESC RIO BRANCO', 'Gerência de Gestão de Pessoas 2° Andar - Bosque', '001400080102', 'GEPES', 'M428', 'Multifuncional', 80, 135427, 137928, 0.05);
INSERT INTO equipamentos (item, grupo, setor, cod_orc, sigla, maquina, tipo_equip, valor_loc, l_ant, l_atual, valor_unit) VALUES (16, 'SESC RIO BRANCO', 'Direção, Coordenação e Supervisão - DAF 2° Andar - Bosque', '001400070102', 'DAF', '4070', 'Multifuncional', 80, 292744, 303189, 0.05);
INSERT INTO equipamentos (item, grupo, setor, cod_orc, sigla, maquina, tipo_equip, valor_loc, l_ant, l_atual, valor_unit) VALUES (17, 'SESC RIO BRANCO', 'Gerência de Cultura', '001500030102', 'CULTURA', '3315', 'Multifuncional', 80, 100564, 102437, 0.05);
INSERT INTO equipamentos (item, grupo, setor, cod_orc, sigla, maquina, tipo_equip, valor_loc, l_ant, l_atual, valor_unit) VALUES (18, 'SESC RIO BRANCO', 'Odontologia', '001600140102', 'ODONTO', 'M4070FR', 'Multifuncional', 80, 275343, 275495, 0.05);
INSERT INTO equipamentos (item, grupo, setor, cod_orc, sigla, maquina, tipo_equip, valor_loc, l_ant, l_atual, valor_unit) VALUES (19, 'SESC INTERIOR', 'Unid. De Cultura e Lazer - Senador Guiomard', '001800020102', 'ULCA-SEN.GUIOM', 'HP432', 'Multifuncional', 80, 102568, 103930, 0.05);
INSERT INTO equipamentos (item, grupo, setor, cod_orc, sigla, maquina, tipo_equip, valor_loc, l_ant, l_atual, valor_unit) VALUES (20, 'SESC INTERIOR', 'Sesc Ler - Xapuri', '002000010102', 'SESC - LER - XAPURI', '2121', 'Multifuncional', 80, 237058, 238167, 0.05);
INSERT INTO equipamentos (item, grupo, setor, cod_orc, sigla, maquina, tipo_equip, valor_loc, l_ant, l_atual, valor_unit) VALUES (21, 'SESC INTERIOR', 'Unid. De Cultura e Lazer - Brasileia', '001700020102', 'ULCA-BRASILEIA', '8085', 'Multifuncional', 80, 100939, 102020, 0.05);
INSERT INTO equipamentos (item, grupo, setor, cod_orc, sigla, maquina, tipo_equip, valor_loc, l_ant, l_atual, valor_unit) VALUES (22, 'SESC INTERIOR', 'Unid. De Cultura e Lazer - Plácido de Castro', '001900020102', 'ULCA PLÁC. CASTRO', '4070', 'Multifuncional', 80, 75131, 76120, 0.05);
INSERT INTO equipamentos (item, grupo, setor, cod_orc, sigla, maquina, tipo_equip, valor_loc, l_ant, l_atual, valor_unit) VALUES (23, 'SESC INTERIOR', 'Sesc Ler - Feijó', '002100010102', 'SESC - LER - FEIJÓ', '8085', 'Multifuncional', 80, 105432, 106065, 0.05);
INSERT INTO equipamentos (item, grupo, setor, cod_orc, sigla, maquina, tipo_equip, valor_loc, l_ant, l_atual, valor_unit) VALUES (24, 'SESC C. SUL', 'Gerência da Unidade de Turismo e Lazer CZS', '002200010102', 'GUTLA', 'M4070FR', 'Multifuncional', 80, 118577, 119402, 0.05);
INSERT INTO equipamentos (item, grupo, setor, cod_orc, sigla, maquina, tipo_equip, valor_loc, l_ant, l_atual, valor_unit) VALUES (25, 'SESC C. SUL', 'Gerência do Hotel - CZS', '002200020102', 'GEH', 'SP4510SF', 'Multifuncional', 80, 273955, 276699, 0.05);
INSERT INTO equipamentos (item, grupo, setor, cod_orc, sigla, maquina, tipo_equip, valor_loc, l_ant, l_atual, valor_unit) VALUES (26, 'SESC C. SUL', 'Central de Relacionamento CZS', '002200070102', 'CR', 'SP4510SF', 'Multifuncional', 80, 76535, 77027, 0.05);
INSERT INTO equipamentos (item, grupo, setor, cod_orc, sigla, maquina, tipo_equip, valor_loc, l_ant, l_atual, valor_unit) VALUES (27, 'SESC C. SUL', 'Nutrição CZS', '002200060103', 'NUTRIÇÃO', 'M432', 'Multifuncional', 80, 53436, 54345, 0.05);

-- Meses lançados (9 registros)
INSERT INTO meses (month_key, label, created_at) VALUES ('2026-01', 'Janeiro/2026', '2026-09-23 15:29:33');
INSERT INTO meses (month_key, label, created_at) VALUES ('2026-02', 'Fevereiro/2026', '2026-09-23 15:29:33');
INSERT INTO meses (month_key, label, created_at) VALUES ('2026-03', 'Março/2026', '2026-09-23 15:29:33');
INSERT INTO meses (month_key, label, created_at) VALUES ('2026-04', 'Abril/2026', '2026-09-23 15:29:33');
INSERT INTO meses (month_key, label, created_at) VALUES ('2026-05', 'Maio/2026', '2026-09-23 15:29:33');
INSERT INTO meses (month_key, label, created_at) VALUES ('2026-06', 'Junho/2026', '2026-09-23 15:29:33');
INSERT INTO meses (month_key, label, created_at) VALUES ('2026-07', 'Julho/2026', '2026-09-23 15:29:33');
INSERT INTO meses (month_key, label, created_at) VALUES ('2026-08', 'Agosto/2026', '2026-09-23 15:29:33');
INSERT INTO meses (month_key, label, created_at) VALUES ('2026-09', 'Setembro/2026', '2026-09-24 19:25:43');

-- Leituras mensais (234 registros)
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-01_1', '2026-01', 1, 108581, 109522, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-01_10', '2026-01', 10, 552158, 553942, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-01_11', '2026-01', 11, 198566, 202756, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-01_12', '2026-01', 12, 433293, 438942, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-01_13', '2026-01', 13, 25257, 25707, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-01_14', '2026-01', 14, 161304, 162295, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-01_15', '2026-01', 15, 113523, 116856, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-01_16', '2026-01', 16, 238265, 244893, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-01_17', '2026-01', 17, 91172, 91555, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-01_18', '2026-01', 18, 274439, 274574, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-01_19', '2026-01', 19, 89848, 94259, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-01_2', '2026-01', 2, 134991, 135989, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-01_20', '2026-01', 20, 233388, 233388, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-01_21', '2026-01', 21, 92657, 93247, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-01_22', '2026-01', 22, 65116, 66534, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-01_23', '2026-01', 23, 98788, 99605, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-01_24', '2026-01', 24, 111793, 112689, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-01_25', '2026-01', 25, 249073, 253478, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-01_26', '2026-01', 26, 69497, 69994, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-01_27', '2026-01', 27, 46619, 47788, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-01_3', '2026-01', 3, 30802, 31984, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-01_4', '2026-01', 4, 2897.57, 3268.94, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-01_5', '2026-01', 5, 255693, 256224, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-01_6', '2026-01', 6, 222541, 224190, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-01_8', '2026-01', 8, 63640, 65265, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-01_9', '2026-01', 9, 84258, 84673, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-02_1', '2026-02', 1, 109522, 110453, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-02_10', '2026-02', 10, 553942, 555017, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-02_11', '2026-02', 11, 202756, 207794, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-02_12', '2026-02', 12, 438942, 441498, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-02_13', '2026-02', 13, 25707, 26012, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-02_14', '2026-02', 14, 162295, 163166, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-02_15', '2026-02', 15, 116856, 119146, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-02_16', '2026-02', 16, 244893, 250830, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-02_17', '2026-02', 17, 91555, 91894, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-02_18', '2026-02', 18, 274574, 274706, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-02_19', '2026-02', 19, 94259, 94259, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-02_2', '2026-02', 2, 135989, 141109, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-02_20', '2026-02', 20, 233388, 233993, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-02_21', '2026-02', 21, 93247, 93934, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-02_22', '2026-02', 22, 66534, 66881, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-02_23', '2026-02', 23, 99605, 99907, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-02_24', '2026-02', 24, 112689, 113331, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-02_25', '2026-02', 25, 253478, 257354, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-02_26', '2026-02', 26, 69994, 71066, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-02_27', '2026-02', 27, 47788, 48565, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-02_3', '2026-02', 3, 31984, 33599, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-02_4', '2026-02', 4, 3268.94, 3643.9, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-02_5', '2026-02', 5, 256224, 256597, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-02_6', '2026-02', 6, 224190, 225713, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-02_8', '2026-02', 8, 65265, 65265, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-02_9', '2026-02', 9, 84673, 85073, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-03_1', '2026-03', 1, 110453, 111775, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-03_10', '2026-03', 10, 555017, 562125, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-03_11', '2026-03', 11, 207794, 212209, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-03_12', '2026-03', 12, 441498, 444608, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-03_13', '2026-03', 13, 26012, 26513, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-03_14', '2026-03', 14, 163166, 164211, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-03_15', '2026-03', 15, 119146, 122739, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-03_16', '2026-03', 16, 250830, 257715, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-03_17', '2026-03', 17, 91894, 93686, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-03_18', '2026-03', 18, 274706, 274836, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-03_19', '2026-03', 19, 94259, 94259, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-03_2', '2026-03', 2, 141109, 144983, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-03_20', '2026-03', 20, 233993, 234535, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-03_21', '2026-03', 21, 93934, 94723, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-03_22', '2026-03', 22, 66881, 67592, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-03_23', '2026-03', 23, 99907, 99907, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-03_24', '2026-03', 24, 113331, 114214, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-03_25', '2026-03', 25, 257354, 260512, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-03_26', '2026-03', 26, 71066, 72635, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-03_27', '2026-03', 27, 48565, 49907, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-03_3', '2026-03', 3, 33599, 35378, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-03_4', '2026-03', 4, 3643.9, 3871.08, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-03_5', '2026-03', 5, 256597, 257190, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-03_6', '2026-03', 6, 225713, 227536, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-03_8', '2026-03', 8, 65265, 69432, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-03_9', '2026-03', 9, 85073, 85663, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-04_1', '2026-04', 1, 111775, 112396, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-04_10', '2026-04', 10, 562125, 574606, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-04_11', '2026-04', 11, 390, 4542, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-04_12', '2026-04', 12, 444308, 447163, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-04_13', '2026-04', 13, 26513, 26988, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-04_14', '2026-04', 14, 164211, 164897, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-04_15', '2026-04', 15, 122739, 126052, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-04_16', '2026-04', 16, 257715, 265538, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-04_17', '2026-04', 17, 93683, 95216, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-04_18', '2026-04', 18, 274836, 274923, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-04_19', '2026-04', 19, 94259, 95966, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-04_2', '2026-04', 2, 144983, 148152, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-04_20', '2026-04', 20, 234535, 235548, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-04_21', '2026-04', 21, 94723, 96460, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-04_22', '2026-04', 22, 67592, 69184, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-04_23', '2026-04', 23, 99907, 102184, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-04_24', '2026-04', 24, 114214, 115454, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-04_25', '2026-04', 25, 260512, 264679, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-04_26', '2026-04', 26, 72635, 73839, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-04_27', '2026-04', 27, 49907, 50871, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-04_3', '2026-04', 3, 35378, 37003, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-04_4', '2026-04', 4, 3871.08, 3960.82, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-04_5', '2026-04', 5, 257190, 257611, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-04_6', '2026-04', 6, 227536, 229418, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-04_8', '2026-04', 8, 69432, 70924, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-04_9', '2026-04', 9, 85663, 86036, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-05_1', '2026-05', 1, 112396, 113684, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-05_10', '2026-05', 10, 574606, 580848, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-05_11', '2026-05', 11, 4542, 8044, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-05_12', '2026-05', 12, 447163, 449788, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-05_13', '2026-05', 13, 26988, 27663, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-05_14', '2026-05', 14, 164897, 165919, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-05_15', '2026-05', 15, 126052, 128800, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-05_16', '2026-05', 16, 265538, 272693, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-05_17', '2026-05', 17, 95216, 97327, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-05_18', '2026-05', 18, 274923, 275119, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-05_19', '2026-05', 19, 95966, 98005, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-05_2', '2026-05', 2, 9387, 16595, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-05_20', '2026-05', 20, 235548, 236393, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-05_21', '2026-05', 21, 96460, 98135, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-05_22', '2026-05', 22, 69184, 71325, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-05_23', '2026-05', 23, 102184, 103431, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-05_24', '2026-05', 24, 115454, 116587, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-05_25', '2026-05', 25, 264679, 267405, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-05_26', '2026-05', 26, 73839, 74767, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-05_27', '2026-05', 27, 50871, 51600, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-05_3', '2026-05', 3, 37003, 38717, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-05_4', '2026-05', 4, 3960.82, 4021.62, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-05_5', '2026-05', 5, 257611, 258237, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-05_6', '2026-05', 6, 229418, 231173, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-05_8', '2026-05', 8, 70924, 72345, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-05_9', '2026-05', 9, 86036, 86491, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-06_1', '2026-06', 1, 113684, 115624, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-06_10', '2026-06', 10, 580848, 596740, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-06_11', '2026-06', 11, 8044, 11643, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-06_12', '2026-06', 12, 449788, 452772, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-06_13', '2026-06', 13, 27663, 28446, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-06_14', '2026-06', 14, 165919, 167383, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-06_15', '2026-06', 15, 128800, 132051, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-06_16', '2026-06', 16, 272693, 284942, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-06_17', '2026-06', 17, 97327, 99944, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-06_18', '2026-06', 18, 275119, 275264, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-06_19', '2026-06', 19, 98005, 100469, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-06_2', '2026-06', 2, 16595, 28270, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-06_20', '2026-06', 20, 236393, 237058, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-06_21', '2026-06', 21, 98135, 99535, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-06_22', '2026-06', 22, 71325, 73307, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-06_23', '2026-06', 23, 103431, 104543, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-06_24', '2026-06', 24, 116587, 117626, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-06_25', '2026-06', 25, 267405, 270594, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-06_26', '2026-06', 26, 74767, 75835, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-06_27', '2026-06', 27, 51600, 52392, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-06_3', '2026-06', 3, 38717, 40553, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-06_4', '2026-06', 4, 4021.62, 4138.08, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-06_5', '2026-06', 5, 258237, 259021, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-06_6', '2026-06', 6, 231173, 233016, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-06_8', '2026-06', 8, 72345, 73541, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-06_9', '2026-06', 9, 86491, 87040, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-07_1', '2026-07', 1, 115624, 116619, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-07_10', '2026-07', 10, 596740, 600849, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-07_11', '2026-07', 11, 11643, 14307, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-07_12', '2026-07', 12, 452772, 455003, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-07_13', '2026-07', 13, 28446, 28736, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-07_14', '2026-07', 14, 167383, 168022, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-07_15', '2026-07', 15, 132051, 135427, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-07_16', '2026-07', 16, 284942, 292744, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-07_17', '2026-07', 17, 99944, 100564, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-07_18', '2026-07', 18, 275264, 275343, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-07_19', '2026-07', 19, 100469, 102568, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-07_2', '2026-07', 2, 28270, 33238, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-07_20', '2026-07', 20, 237058, 237058, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-07_21', '2026-07', 21, 99535, 100939, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-07_22', '2026-07', 22, 73307, 75131, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-07_23', '2026-07', 23, 104543, 105432, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-07_24', '2026-07', 24, 117626, 118577, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-07_25', '2026-07', 25, 270594, 273955, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-07_26', '2026-07', 26, 75835, 76535, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-07_27', '2026-07', 27, 52392, 53436, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-07_3', '2026-07', 3, 40553, 41929, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-07_4', '2026-07', 4, 4138.08, 4150.65, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-07_5', '2026-07', 5, 259021, 259412, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-07_6', '2026-07', 6, 233016, 234499, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-07_8', '2026-07', 8, 73541, 74807, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-07_9', '2026-07', 9, 87040, 87481, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-08_1', '2026-08', 1, 116619, 118129, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-08_10', '2026-08', 10, 600849, 605205, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-08_11', '2026-08', 11, 14307, 16609, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-08_12', '2026-08', 12, 455003, 457155, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-08_13', '2026-08', 13, 28736, 29285, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-08_14', '2026-08', 14, 168022, 169009, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-08_15', '2026-08', 15, 135427, 137928, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-08_16', '2026-08', 16, 292744, 303189, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-08_17', '2026-08', 17, 100564, 102437, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-08_18', '2026-08', 18, 275343, 275495, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-08_19', '2026-08', 19, 102568, 103930, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-08_2', '2026-08', 2, 33238, 35590, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-08_20', '2026-08', 20, 237058, 238167, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-08_21', '2026-08', 21, 100939, 102020, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-08_22', '2026-08', 22, 75131, 76120, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-08_23', '2026-08', 23, 105432, 106065, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-08_24', '2026-08', 24, 118577, 119402, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-08_25', '2026-08', 25, 273955, 276699, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-08_26', '2026-08', 26, 76535, 77027, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-08_27', '2026-08', 27, 53436, 54345, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-08_3', '2026-08', 3, 41929, 44200, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-08_4', '2026-08', 4, 4150.65, 4305.16, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-08_5', '2026-08', 5, 259412, 259882, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-08_6', '2026-08', 6, 234499, 235967, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-08_8', '2026-08', 8, 74807, 75966, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-08_9', '2026-08', 9, 87481, 88114, '2026-09-23 15:29:33');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-09_1', '2026-09', 1, 118129, 119348, '2026-09-24 19:25:43');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-09_10', '2026-09', 10, 605205, 621870, '2026-09-24 19:25:43');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-09_11', '2026-09', 11, 16609, 18587, '2026-09-24 19:25:43');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-09_12', '2026-09', 12, 457155, 458705, '2026-09-24 19:25:43');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-09_13', '2026-09', 13, 29285, 29744, '2026-09-24 19:25:43');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-09_14', '2026-09', 14, 406768, 407993, '2026-09-24 19:25:43');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-09_15', '2026-09', 15, 137928, 143244, '2026-09-24 19:25:43');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-09_16', '2026-09', 16, 303189, 312272, '2026-09-24 19:25:43');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-09_17', '2026-09', 17, 102437, 103906, '2026-09-24 19:25:43');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-09_18', '2026-09', 18, 275495, 275691, '2026-09-24 19:25:43');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-09_19', '2026-09', 19, 103930, 105416, '2026-09-24 19:25:43');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-09_2', '2026-09', 2, 35590, 46573, '2026-09-24 19:25:43');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-09_20', '2026-09', 20, 238167, 238719, '2026-09-24 19:25:43');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-09_21', '2026-09', 21, 102020, 103341, '2026-09-24 19:25:43');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-09_22', '2026-09', 22, 76120, 77684, '2026-09-24 19:25:43');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-09_23', '2026-09', 23, 106065, 106635, '2026-09-24 19:25:43');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-09_24', '2026-09', 24, 119402, 120141, '2026-09-24 19:25:43');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-09_25', '2026-09', 25, 276699, 279010, '2026-09-24 19:25:43');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-09_26', '2026-09', 26, 77027, 77634, '2026-09-24 19:25:43');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-09_27', '2026-09', 27, 54345, 55186, '2026-09-24 19:25:43');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-09_3', '2026-09', 3, 44200, 45880, '2026-09-24 19:25:43');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-09_4', '2026-09', 4, 4305.16, 4374.86, '2026-09-24 19:25:43');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-09_5', '2026-09', 5, 259882, 260588, '2026-09-24 19:25:43');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-09_6', '2026-09', 6, 235967, 237625, '2026-09-24 19:25:43');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-09_8', '2026-09', 8, 75966, 76985, '2026-09-24 19:25:43');
INSERT INTO leituras (id, month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES ('2026-09_9', '2026-09', 9, 88114, 88719, '2026-09-24 19:25:43');

