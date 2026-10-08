"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

  // ts/data/seed.ts
  var EQUIP_SEED_RAW = [{ "item": 1, "grupo": "SESC RIO BRANCO", "setor": "Gest\xE3o de Comunica\xE7\xE3o Institucional - DPI - Bosque", "cod_orc": "001400160102", "sigla": "GEDPI", "maquina": "C7020", "tipo_equip": "Multifuncional", "valor_loc": 184, "l_ant": 116619, "l_atual": 118129, "valor_unit": 0.38 }, { "item": 2, "grupo": "SESC RIO BRANCO", "setor": "Ensino Fundamental - Bosque", "cod_orc": "001600050102", "sigla": "ESCOLA", "maquina": "C306", "tipo_equip": "Multifuncional", "valor_loc": 184, "l_ant": 33238, "l_atual": 35590, "valor_unit": 0.38 }, { "item": 3, "grupo": "SESC RIO BRANCO", "setor": "Dire\xE7\xE3o, Coordena\xE7\xE3o e Supervis\xE3o - GDR 2\xB0 Andar - Bosque", "cod_orc": "001400050102", "sigla": "GDR", "maquina": "C605", "tipo_equip": "Multifuncional", "valor_loc": 184, "l_ant": 41929, "l_atual": 44200, "valor_unit": 0.38 }, { "item": 4, "grupo": "SESC RIO BRANCO", "setor": "Ger\xEAncia de Manuten\xE7\xE3o e Obras", "cod_orc": "001400150102", "sigla": "GEA", "maquina": "T120", "tipo_equip": "Impressora A1", "valor_loc": 184, "l_ant": 4150.65, "l_atual": 4305.16, "valor_unit": 0.38 }, { "item": 5, "grupo": "SESC RIO BRANCO", "setor": "Contabilidade", "cod_orc": "001400120102", "sigla": "GECON", "maquina": "3320", "tipo_equip": "Impressora", "valor_loc": 80, "l_ant": 259412, "l_atual": 259882, "valor_unit": 0.05 }, { "item": 6, "grupo": "SESC RIO BRANCO", "setor": "Dire\xE7\xE3o, Coordena\xE7\xE3o e Supervis\xE3o - Nutri\xE7\xE3o", "cod_orc": "001600020103", "sigla": "NUTRI\xC7\xC3O", "maquina": "3320", "tipo_equip": "Impressora", "valor_loc": 80, "l_ant": 234499, "l_atual": 235967, "valor_unit": 0.05 }, { "item": 8, "grupo": "SESC RIO BRANCO", "setor": "Seguran\xE7a Alimentar e Apoio Social/projeto Mesa Brasil", "cod_orc": "001600100115", "sigla": "MESA BRASIL", "maquina": "3225", "tipo_equip": "Multifuncional", "valor_loc": 80, "l_ant": 74807, "l_atual": 75966, "valor_unit": 0.05 }, { "item": 9, "grupo": "SESC RIO BRANCO", "setor": "Seguran\xE7a Alimentar e Apoio Social/projeto Mesa Brasil", "cod_orc": "001600100115", "sigla": "MESA BRASIL", "maquina": "3225", "tipo_equip": "Multifuncional", "valor_loc": 80, "l_ant": 87481, "l_atual": 88114, "valor_unit": 0.05 }, { "item": 10, "grupo": "SESC RIO BRANCO", "setor": "Ensino Fundamental - Bosque", "cod_orc": "001600050102", "sigla": "ESCOLA", "maquina": "-", "tipo_equip": "Multifuncional", "valor_loc": 80, "l_ant": 600849, "l_atual": 605205, "valor_unit": 0.05 }, { "item": 11, "grupo": "SESC RIO BRANCO", "setor": "Relacionamento Com Cliente - Bloco de Sa\xFAde - Bosque", "cod_orc": "001600120102", "sigla": "CR-ACADEMIA", "maquina": "4070", "tipo_equip": "Multifuncional", "valor_loc": 80, "l_ant": 14307, "l_atual": 16609, "valor_unit": 0.05 }, { "item": 12, "grupo": "SESC RIO BRANCO", "setor": "Relacionamento com Cliente - Bosque", "cod_orc": "001600120102", "sigla": "CR-BOSQUE", "maquina": "4070", "tipo_equip": "Multifuncional", "valor_loc": 80, "l_ant": 455003, "l_atual": 457155, "valor_unit": 0.05 }, { "item": 13, "grupo": "SESC RIO BRANCO", "setor": "Servi\xE7os Jur\xEDdicos - ASSEJUR", "cod_orc": "001400030102", "sigla": "ASSEJUR", "maquina": "3225", "tipo_equip": "Multifuncional", "valor_loc": 80, "l_ant": 28736, "l_atual": 29285, "valor_unit": 0.05 }, { "item": 14, "grupo": "SESC RIO BRANCO", "setor": "Assessoria de Planejamento e Or\xE7amento 3\xB0 Andar - Bosque", "cod_orc": "001400060102", "sigla": "ATP", "maquina": "4070", "tipo_equip": "Multifuncional", "valor_loc": 80, "l_ant": 168022, "l_atual": 169009, "valor_unit": 0.05 }, { "item": 15, "grupo": "SESC RIO BRANCO", "setor": "Ger\xEAncia de Gest\xE3o de Pessoas 2\xB0 Andar - Bosque", "cod_orc": "001400080102", "sigla": "GEPES", "maquina": "M428", "tipo_equip": "Multifuncional", "valor_loc": 80, "l_ant": 135427, "l_atual": 137928, "valor_unit": 0.05 }, { "item": 16, "grupo": "SESC RIO BRANCO", "setor": "Dire\xE7\xE3o, Coordena\xE7\xE3o e Supervis\xE3o - DAF 2\xB0 Andar - Bosque", "cod_orc": "001400070102", "sigla": "DAF", "maquina": "4070", "tipo_equip": "Multifuncional", "valor_loc": 80, "l_ant": 292744, "l_atual": 303189, "valor_unit": 0.05 }, { "item": 17, "grupo": "SESC RIO BRANCO", "setor": "Ger\xEAncia de Cultura", "cod_orc": "001500030102", "sigla": "CULTURA", "maquina": "3315", "tipo_equip": "Multifuncional", "valor_loc": 80, "l_ant": 100564, "l_atual": 102437, "valor_unit": 0.05 }, { "item": 18, "grupo": "SESC RIO BRANCO", "setor": "Odontologia", "cod_orc": "001600140102", "sigla": "ODONTO", "maquina": "M4070FR", "tipo_equip": "Multifuncional", "valor_loc": 80, "l_ant": 275343, "l_atual": 275495, "valor_unit": 0.05 }, { "item": 19, "grupo": "SESC INTERIOR", "setor": "Unid. De Cultura e Lazer - Senador Guiomard", "cod_orc": "001800020102", "sigla": "ULCA-SEN.GUIOM", "maquina": "HP432", "tipo_equip": "Multifuncional", "valor_loc": 80, "l_ant": 102568, "l_atual": 103930, "valor_unit": 0.05 }, { "item": 20, "grupo": "SESC INTERIOR", "setor": "Sesc Ler - Xapuri", "cod_orc": "002000010102", "sigla": "SESC - LER - XAPURI", "maquina": "2121", "tipo_equip": "Multifuncional", "valor_loc": 80, "l_ant": 237058, "l_atual": 238167, "valor_unit": 0.05 }, { "item": 21, "grupo": "SESC INTERIOR", "setor": "Unid. De Cultura e Lazer - Brasileia", "cod_orc": "001700020102", "sigla": "ULCA-BRASILEIA", "maquina": "8085", "tipo_equip": "Multifuncional", "valor_loc": 80, "l_ant": 100939, "l_atual": 102020, "valor_unit": 0.05 }, { "item": 22, "grupo": "SESC INTERIOR", "setor": "Unid. De Cultura e Lazer - Pl\xE1cido de Castro", "cod_orc": "001900020102", "sigla": "ULCA PL\xC1C. CASTRO", "maquina": "4070", "tipo_equip": "Multifuncional", "valor_loc": 80, "l_ant": 75131, "l_atual": 76120, "valor_unit": 0.05 }, { "item": 23, "grupo": "SESC INTERIOR", "setor": "Sesc Ler - Feij\xF3", "cod_orc": "002100010102", "sigla": "SESC - LER - FEIJ\xD3", "maquina": "8085", "tipo_equip": "Multifuncional", "valor_loc": 80, "l_ant": 105432, "l_atual": 106065, "valor_unit": 0.05 }, { "item": 24, "grupo": "SESC C. SUL", "setor": "Ger\xEAncia da Unidade de Turismo e Lazer CZS", "cod_orc": "002200010102", "sigla": "GUTLA", "maquina": "M4070FR", "tipo_equip": "Multifuncional", "valor_loc": 80, "l_ant": 118577, "l_atual": 119402, "valor_unit": 0.05 }, { "item": 25, "grupo": "SESC C. SUL", "setor": "Ger\xEAncia do Hotel - CZS", "cod_orc": "002200020102", "sigla": "GEH", "maquina": "SP4510SF", "tipo_equip": "Multifuncional", "valor_loc": 80, "l_ant": 273955, "l_atual": 276699, "valor_unit": 0.05 }, { "item": 26, "grupo": "SESC C. SUL", "setor": "Central de Relacionamento CZS", "cod_orc": "002200070102", "sigla": "CR", "maquina": "SP4510SF", "tipo_equip": "Multifuncional", "valor_loc": 80, "l_ant": 76535, "l_atual": 77027, "valor_unit": 0.05 }, { "item": 27, "grupo": "SESC C. SUL", "setor": "Nutri\xE7\xE3o CZS", "cod_orc": "002200060103", "sigla": "NUTRI\xC7\xC3O", "maquina": "M432", "tipo_equip": "Multifuncional", "valor_loc": 80, "l_ant": 53436, "l_atual": 54345, "valor_unit": 0.05 }];
  var ALL_MONTHS_SEED = { "2026-01": { "1": { "leitura_anterior": 108581, "leitura_atual": 109522 }, "2": { "leitura_anterior": 134991, "leitura_atual": 135989 }, "3": { "leitura_anterior": 30802, "leitura_atual": 31984 }, "4": { "leitura_anterior": 2897.57, "leitura_atual": 3268.94 }, "5": { "leitura_anterior": 255693, "leitura_atual": 256224 }, "6": { "leitura_anterior": 222541, "leitura_atual": 224190 }, "8": { "leitura_anterior": 63640, "leitura_atual": 65265 }, "9": { "leitura_anterior": 84258, "leitura_atual": 84673 }, "10": { "leitura_anterior": 552158, "leitura_atual": 553942 }, "11": { "leitura_anterior": 198566, "leitura_atual": 202756 }, "12": { "leitura_anterior": 433293, "leitura_atual": 438942 }, "13": { "leitura_anterior": 25257, "leitura_atual": 25707 }, "14": { "leitura_anterior": 161304, "leitura_atual": 162295 }, "15": { "leitura_anterior": 113523, "leitura_atual": 116856 }, "16": { "leitura_anterior": 238265, "leitura_atual": 244893 }, "17": { "leitura_anterior": 91172, "leitura_atual": 91555 }, "18": { "leitura_anterior": 274439, "leitura_atual": 274574 }, "19": { "leitura_anterior": 89848, "leitura_atual": 94259 }, "20": { "leitura_anterior": 233388, "leitura_atual": 233388 }, "21": { "leitura_anterior": 92657, "leitura_atual": 93247 }, "22": { "leitura_anterior": 65116, "leitura_atual": 66534 }, "23": { "leitura_anterior": 98788, "leitura_atual": 99605 }, "24": { "leitura_anterior": 111793, "leitura_atual": 112689 }, "25": { "leitura_anterior": 249073, "leitura_atual": 253478 }, "26": { "leitura_anterior": 69497, "leitura_atual": 69994 }, "27": { "leitura_anterior": 46619, "leitura_atual": 47788 } }, "2026-02": { "1": { "leitura_anterior": 109522, "leitura_atual": 110453 }, "2": { "leitura_anterior": 135989, "leitura_atual": 141109 }, "3": { "leitura_anterior": 31984, "leitura_atual": 33599 }, "4": { "leitura_anterior": 3268.94, "leitura_atual": 3643.9 }, "5": { "leitura_anterior": 256224, "leitura_atual": 256597 }, "6": { "leitura_anterior": 224190, "leitura_atual": 225713 }, "8": { "leitura_anterior": 65265, "leitura_atual": 65265 }, "9": { "leitura_anterior": 84673, "leitura_atual": 85073 }, "10": { "leitura_anterior": 553942, "leitura_atual": 555017 }, "11": { "leitura_anterior": 202756, "leitura_atual": 207794 }, "12": { "leitura_anterior": 438942, "leitura_atual": 441498 }, "13": { "leitura_anterior": 25707, "leitura_atual": 26012 }, "14": { "leitura_anterior": 162295, "leitura_atual": 163166 }, "15": { "leitura_anterior": 116856, "leitura_atual": 119146 }, "16": { "leitura_anterior": 244893, "leitura_atual": 250830 }, "17": { "leitura_anterior": 91555, "leitura_atual": 91894 }, "18": { "leitura_anterior": 274574, "leitura_atual": 274706 }, "19": { "leitura_anterior": 94259, "leitura_atual": 94259 }, "20": { "leitura_anterior": 233388, "leitura_atual": 233993 }, "21": { "leitura_anterior": 93247, "leitura_atual": 93934 }, "22": { "leitura_anterior": 66534, "leitura_atual": 66881 }, "23": { "leitura_anterior": 99605, "leitura_atual": 99907 }, "24": { "leitura_anterior": 112689, "leitura_atual": 113331 }, "25": { "leitura_anterior": 253478, "leitura_atual": 257354 }, "26": { "leitura_anterior": 69994, "leitura_atual": 71066 }, "27": { "leitura_anterior": 47788, "leitura_atual": 48565 } }, "2026-03": { "1": { "leitura_anterior": 110453, "leitura_atual": 111775 }, "2": { "leitura_anterior": 141109, "leitura_atual": 144983 }, "3": { "leitura_anterior": 33599, "leitura_atual": 35378 }, "4": { "leitura_anterior": 3643.9, "leitura_atual": 3871.08 }, "5": { "leitura_anterior": 256597, "leitura_atual": 257190 }, "6": { "leitura_anterior": 225713, "leitura_atual": 227536 }, "8": { "leitura_anterior": 65265, "leitura_atual": 69432 }, "9": { "leitura_anterior": 85073, "leitura_atual": 85663 }, "10": { "leitura_anterior": 555017, "leitura_atual": 562125 }, "11": { "leitura_anterior": 207794, "leitura_atual": 212209 }, "12": { "leitura_anterior": 441498, "leitura_atual": 444608 }, "13": { "leitura_anterior": 26012, "leitura_atual": 26513 }, "14": { "leitura_anterior": 163166, "leitura_atual": 164211 }, "15": { "leitura_anterior": 119146, "leitura_atual": 122739 }, "16": { "leitura_anterior": 250830, "leitura_atual": 257715 }, "17": { "leitura_anterior": 91894, "leitura_atual": 93686 }, "18": { "leitura_anterior": 274706, "leitura_atual": 274836 }, "19": { "leitura_anterior": 94259, "leitura_atual": 94259 }, "20": { "leitura_anterior": 233993, "leitura_atual": 234535 }, "21": { "leitura_anterior": 93934, "leitura_atual": 94723 }, "22": { "leitura_anterior": 66881, "leitura_atual": 67592 }, "23": { "leitura_anterior": 99907, "leitura_atual": 99907 }, "24": { "leitura_anterior": 113331, "leitura_atual": 114214 }, "25": { "leitura_anterior": 257354, "leitura_atual": 260512 }, "26": { "leitura_anterior": 71066, "leitura_atual": 72635 }, "27": { "leitura_anterior": 48565, "leitura_atual": 49907 } }, "2026-04": { "1": { "leitura_anterior": 111775, "leitura_atual": 112396 }, "2": { "leitura_anterior": 144983, "leitura_atual": 148152 }, "3": { "leitura_anterior": 35378, "leitura_atual": 37003 }, "4": { "leitura_anterior": 3871.08, "leitura_atual": 3960.82 }, "5": { "leitura_anterior": 257190, "leitura_atual": 257611 }, "6": { "leitura_anterior": 227536, "leitura_atual": 229418 }, "8": { "leitura_anterior": 69432, "leitura_atual": 70924 }, "9": { "leitura_anterior": 85663, "leitura_atual": 86036 }, "10": { "leitura_anterior": 562125, "leitura_atual": 574606 }, "11": { "leitura_anterior": 390, "leitura_atual": 4542 }, "12": { "leitura_anterior": 444308, "leitura_atual": 447163 }, "13": { "leitura_anterior": 26513, "leitura_atual": 26988 }, "14": { "leitura_anterior": 164211, "leitura_atual": 164897 }, "15": { "leitura_anterior": 122739, "leitura_atual": 126052 }, "16": { "leitura_anterior": 257715, "leitura_atual": 265538 }, "17": { "leitura_anterior": 93683, "leitura_atual": 95216 }, "18": { "leitura_anterior": 274836, "leitura_atual": 274923 }, "19": { "leitura_anterior": 94259, "leitura_atual": 95966 }, "20": { "leitura_anterior": 234535, "leitura_atual": 235548 }, "21": { "leitura_anterior": 94723, "leitura_atual": 96460 }, "22": { "leitura_anterior": 67592, "leitura_atual": 69184 }, "23": { "leitura_anterior": 99907, "leitura_atual": 102184 }, "24": { "leitura_anterior": 114214, "leitura_atual": 115454 }, "25": { "leitura_anterior": 260512, "leitura_atual": 264679 }, "26": { "leitura_anterior": 72635, "leitura_atual": 73839 }, "27": { "leitura_anterior": 49907, "leitura_atual": 50871 } }, "2026-05": { "1": { "leitura_anterior": 112396, "leitura_atual": 113684 }, "2": { "leitura_anterior": 9387, "leitura_atual": 16595 }, "3": { "leitura_anterior": 37003, "leitura_atual": 38717 }, "4": { "leitura_anterior": 3960.82, "leitura_atual": 4021.62 }, "5": { "leitura_anterior": 257611, "leitura_atual": 258237 }, "6": { "leitura_anterior": 229418, "leitura_atual": 231173 }, "8": { "leitura_anterior": 70924, "leitura_atual": 72345 }, "9": { "leitura_anterior": 86036, "leitura_atual": 86491 }, "10": { "leitura_anterior": 574606, "leitura_atual": 580848 }, "11": { "leitura_anterior": 4542, "leitura_atual": 8044 }, "12": { "leitura_anterior": 447163, "leitura_atual": 449788 }, "13": { "leitura_anterior": 26988, "leitura_atual": 27663 }, "14": { "leitura_anterior": 164897, "leitura_atual": 165919 }, "15": { "leitura_anterior": 126052, "leitura_atual": 128800 }, "16": { "leitura_anterior": 265538, "leitura_atual": 272693 }, "17": { "leitura_anterior": 95216, "leitura_atual": 97327 }, "18": { "leitura_anterior": 274923, "leitura_atual": 275119 }, "19": { "leitura_anterior": 95966, "leitura_atual": 98005 }, "20": { "leitura_anterior": 235548, "leitura_atual": 236393 }, "21": { "leitura_anterior": 96460, "leitura_atual": 98135 }, "22": { "leitura_anterior": 69184, "leitura_atual": 71325 }, "23": { "leitura_anterior": 102184, "leitura_atual": 103431 }, "24": { "leitura_anterior": 115454, "leitura_atual": 116587 }, "25": { "leitura_anterior": 264679, "leitura_atual": 267405 }, "26": { "leitura_anterior": 73839, "leitura_atual": 74767 }, "27": { "leitura_anterior": 50871, "leitura_atual": 51600 } }, "2026-06": { "1": { "leitura_anterior": 113684, "leitura_atual": 115624 }, "2": { "leitura_anterior": 16595, "leitura_atual": 28270 }, "3": { "leitura_anterior": 38717, "leitura_atual": 40553 }, "4": { "leitura_anterior": 4021.62, "leitura_atual": 4138.08 }, "5": { "leitura_anterior": 258237, "leitura_atual": 259021 }, "6": { "leitura_anterior": 231173, "leitura_atual": 233016 }, "8": { "leitura_anterior": 72345, "leitura_atual": 73541 }, "9": { "leitura_anterior": 86491, "leitura_atual": 87040 }, "10": { "leitura_anterior": 580848, "leitura_atual": 596740 }, "11": { "leitura_anterior": 8044, "leitura_atual": 11643 }, "12": { "leitura_anterior": 449788, "leitura_atual": 452772 }, "13": { "leitura_anterior": 27663, "leitura_atual": 28446 }, "14": { "leitura_anterior": 165919, "leitura_atual": 167383 }, "15": { "leitura_anterior": 128800, "leitura_atual": 132051 }, "16": { "leitura_anterior": 272693, "leitura_atual": 284942 }, "17": { "leitura_anterior": 97327, "leitura_atual": 99944 }, "18": { "leitura_anterior": 275119, "leitura_atual": 275264 }, "19": { "leitura_anterior": 98005, "leitura_atual": 100469 }, "20": { "leitura_anterior": 236393, "leitura_atual": 237058 }, "21": { "leitura_anterior": 98135, "leitura_atual": 99535 }, "22": { "leitura_anterior": 71325, "leitura_atual": 73307 }, "23": { "leitura_anterior": 103431, "leitura_atual": 104543 }, "24": { "leitura_anterior": 116587, "leitura_atual": 117626 }, "25": { "leitura_anterior": 267405, "leitura_atual": 270594 }, "26": { "leitura_anterior": 74767, "leitura_atual": 75835 }, "27": { "leitura_anterior": 51600, "leitura_atual": 52392 } }, "2026-07": { "1": { "leitura_anterior": 115624, "leitura_atual": 116619 }, "2": { "leitura_anterior": 28270, "leitura_atual": 33238 }, "3": { "leitura_anterior": 40553, "leitura_atual": 41929 }, "4": { "leitura_anterior": 4138.08, "leitura_atual": 4150.65 }, "5": { "leitura_anterior": 259021, "leitura_atual": 259412 }, "6": { "leitura_anterior": 233016, "leitura_atual": 234499 }, "8": { "leitura_anterior": 73541, "leitura_atual": 74807 }, "9": { "leitura_anterior": 87040, "leitura_atual": 87481 }, "10": { "leitura_anterior": 596740, "leitura_atual": 600849 }, "11": { "leitura_anterior": 11643, "leitura_atual": 14307 }, "12": { "leitura_anterior": 452772, "leitura_atual": 455003 }, "13": { "leitura_anterior": 28446, "leitura_atual": 28736 }, "14": { "leitura_anterior": 167383, "leitura_atual": 168022 }, "15": { "leitura_anterior": 132051, "leitura_atual": 135427 }, "16": { "leitura_anterior": 284942, "leitura_atual": 292744 }, "17": { "leitura_anterior": 99944, "leitura_atual": 100564 }, "18": { "leitura_anterior": 275264, "leitura_atual": 275343 }, "19": { "leitura_anterior": 100469, "leitura_atual": 102568 }, "20": { "leitura_anterior": 237058, "leitura_atual": 237058 }, "21": { "leitura_anterior": 99535, "leitura_atual": 100939 }, "22": { "leitura_anterior": 73307, "leitura_atual": 75131 }, "23": { "leitura_anterior": 104543, "leitura_atual": 105432 }, "24": { "leitura_anterior": 117626, "leitura_atual": 118577 }, "25": { "leitura_anterior": 270594, "leitura_atual": 273955 }, "26": { "leitura_anterior": 75835, "leitura_atual": 76535 }, "27": { "leitura_anterior": 52392, "leitura_atual": 53436 } }, "2026-08": { "1": { "leitura_anterior": 116619, "leitura_atual": 118129 }, "2": { "leitura_anterior": 33238, "leitura_atual": 35590 }, "3": { "leitura_anterior": 41929, "leitura_atual": 44200 }, "4": { "leitura_anterior": 4150.65, "leitura_atual": 4305.16 }, "5": { "leitura_anterior": 259412, "leitura_atual": 259882 }, "6": { "leitura_anterior": 234499, "leitura_atual": 235967 }, "8": { "leitura_anterior": 74807, "leitura_atual": 75966 }, "9": { "leitura_anterior": 87481, "leitura_atual": 88114 }, "10": { "leitura_anterior": 600849, "leitura_atual": 605205 }, "11": { "leitura_anterior": 14307, "leitura_atual": 16609 }, "12": { "leitura_anterior": 455003, "leitura_atual": 457155 }, "13": { "leitura_anterior": 28736, "leitura_atual": 29285 }, "14": { "leitura_anterior": 168022, "leitura_atual": 169009 }, "15": { "leitura_anterior": 135427, "leitura_atual": 137928 }, "16": { "leitura_anterior": 292744, "leitura_atual": 303189 }, "17": { "leitura_anterior": 100564, "leitura_atual": 102437 }, "18": { "leitura_anterior": 275343, "leitura_atual": 275495 }, "19": { "leitura_anterior": 102568, "leitura_atual": 103930 }, "20": { "leitura_anterior": 237058, "leitura_atual": 238167 }, "21": { "leitura_anterior": 100939, "leitura_atual": 102020 }, "22": { "leitura_anterior": 75131, "leitura_atual": 76120 }, "23": { "leitura_anterior": 105432, "leitura_atual": 106065 }, "24": { "leitura_anterior": 118577, "leitura_atual": 119402 }, "25": { "leitura_anterior": 273955, "leitura_atual": 276699 }, "26": { "leitura_anterior": 76535, "leitura_atual": 77027 }, "27": { "leitura_anterior": 53436, "leitura_atual": 54345 } } };

  // ts/config.ts
  var LS_KEY = "getic_dashboard_v1";
  var MESES_PT = ["Janeiro", "Fevereiro", "Mar\xE7o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  var MAQUINAS_038 = /* @__PURE__ */ new Set(["C7020", "C306", "C605"]);
  var MAQUINAS_LOC_184 = /* @__PURE__ */ new Set(["C7020", "C306", "C605", "T120"]);
  var MAQUINAS_POLICROMATICAS = /* @__PURE__ */ new Set(["C7020", "C306", "C605"]);
  var CONTRATO_ANUAL = { impressao: 57720, locacao: 29952, total: 87672 };
  var ADMIN_USER = "admin";
  var ADMIN_PASS = "c8s7e9s1";
  var ADMIN_BUTTON_IDS = ["btnNovoMes", "btnExcel", "btnSql", "btnRecibo", "historyPanel"];
  var CDN = {
    swal: {
      cdnjs: "https://cdnjs.cloudflare.com/ajax/libs/sweetalert2/11.14.5/sweetalert2.all.min.js",
      jsdelivr: "https://cdn.jsdelivr.net/npm/sweetalert2@11.14.5/dist/sweetalert2.all.min.js"
    },
    jspdf: {
      cdnjs: "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.2/jspdf.umd.min.js",
      jsdelivr: "https://cdn.jsdelivr.net/npm/jspdf@2.5.2/dist/jspdf.umd.min.js"
    },
    xlsx: {
      cdnjs: "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js",
      jsdelivr: "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"
    }
  };

  // ts/data/pricing.ts
  function valorUnitFor(maquina) {
    if (MAQUINAS_038.has(maquina)) return 0.38;
    if (maquina === "T120") return 8;
    return 0.05;
  }
  function valorLocFor(maquina) {
    return MAQUINAS_LOC_184.has(maquina) ? 184 : 80;
  }
  var EQUIP_SEED = EQUIP_SEED_RAW.map((e) => __spreadProps(__spreadValues({}, e), {
    setor: e.setor === "Gest\xE3o de Comunica\xE7\xE3o Institucional - DPI - Bosque" ? "Gerencia de Comunica\xE7\xE3o Institucional - DPI - Bosque" : e.setor,
    valor_unit: valorUnitFor(e.maquina),
    valor_loc: valorLocFor(e.maquina)
  }));

  // ts/state.ts
  var SEED_MONTHS = Object.keys(ALL_MONTHS_SEED).sort();
  var SEED_MONTH = SEED_MONTHS[SEED_MONTHS.length - 1];
  var currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  var seedYear = Number(SEED_MONTH.split("-")[0]);
  var initialMonth = currentYear > seedYear ? `${currentYear}-01` : SEED_MONTH;
  var state = {
    db: null,
    downloads: null,
    canWrite: true,
    equipList: EQUIP_SEED.slice(),
    months: SEED_MONTHS.slice(),
    currentMonth: initialMonth,
    readingsByMonth: JSON.parse(JSON.stringify(ALL_MONTHS_SEED)),
    currentGrupo: "Todos"
  };

  // ts/utils/dom.ts
  function $(id) {
    return document.getElementById(id);
  }

  // ts/utils/format.ts
  var fmtR = (n) => "R$ " + (n || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  var fmtN = (n) => {
    const v = n || 0;
    const casas = Number.isInteger(Math.round(v * 100) / 100) ? 0 : 2;
    return v.toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas });
  };
  function monthLabel(key) {
    const [y, m] = key.split("-").map(Number);
    return MESES_PT[m - 1] + "/" + y;
  }
  function monthLabelLong(key) {
    const [y, m] = key.split("-").map(Number);
    return MESES_PT[m - 1] + " de " + y;
  }
  function nextMonthKey(key) {
    let [y, m] = key.split("-").map(Number);
    m++;
    if (m > 12) {
      m = 1;
      y++;
    }
    return y + "-" + String(m).padStart(2, "0");
  }
  function banner(msg, kind) {
    return `<div class="banner ${kind}">${msg}</div>`;
  }
  function sqlEscape(v) {
    if (v === null || v === void 0) return "NULL";
    if (typeof v === "number") return String(v);
    return "'" + String(v).replace(/'/g, "''") + "'";
  }

  // ts/data/repository.ts
  async function semearMes(db, mk) {
    const readings = ALL_MONTHS_SEED[mk];
    await Promise.all(Object.keys(readings).map((itemStr) => db.collection("leituras").doc(mk + "_" + itemStr).set({
      monthKey: mk,
      item: Number(itemStr),
      leitura_anterior: readings[itemStr].leitura_anterior,
      leitura_atual: readings[itemStr].leitura_atual,
      savedAt: (/* @__PURE__ */ new Date()).toISOString()
    })));
    await db.collection("meses").doc(mk).set({ monthKey: mk, label: monthLabel(mk), createdAt: (/* @__PURE__ */ new Date()).toISOString() });
  }
  async function loadFromDb(db) {
    try {
      const eqSnap = await db.collection("equipamentos").get();
      if (eqSnap.empty) {
        await Promise.all(EQUIP_SEED.map((e) => db.collection("equipamentos").doc(String(e.item)).set(__spreadValues({}, e))));
        for (const mk of SEED_MONTHS) await semearMes(db, mk);
      } else {
        state.equipList = eqSnap.docs.map((d) => d.data());
        state.equipList.sort((a, b) => a.item - b.item);
        const corrigir = state.equipList.filter(
          (e) => e.valor_unit !== valorUnitFor(e.maquina) || e.valor_loc !== valorLocFor(e.maquina) || e.sigla === "GEDPI" && e.setor === "Gest\xE3o de Comunica\xE7\xE3o Institucional - DPI - Bosque" || e.sigla === "GEA" && e.cod_orc !== "001400150102"
        );
        if (corrigir.length) {
          state.equipList = state.equipList.map((e) => __spreadProps(__spreadValues({}, e), {
            setor: e.sigla === "GEDPI" && e.setor === "Gest\xE3o de Comunica\xE7\xE3o Institucional - DPI - Bosque" ? "Gerencia de Comunica\xE7\xE3o Institucional - DPI - Bosque" : e.setor,
            cod_orc: e.sigla === "GEA" ? "001400150102" : e.cod_orc,
            valor_unit: valorUnitFor(e.maquina),
            valor_loc: valorLocFor(e.maquina)
          }));
          try {
            await Promise.all(corrigir.map((e) => db.collection("equipamentos").doc(String(e.item)).update({
              setor: e.sigla === "GEDPI" && e.setor === "Gest\xE3o de Comunica\xE7\xE3o Institucional - DPI - Bosque" ? "Gerencia de Comunica\xE7\xE3o Institucional - DPI - Bosque" : e.setor,
              cod_orc: e.sigla === "GEA" ? "001400150102" : e.cod_orc,
              valor_unit: valorUnitFor(e.maquina),
              valor_loc: valorLocFor(e.maquina)
            })));
          } catch (e) {
            console.error("Falha ao corrigir dados salvos", e);
          }
        }
      }
      const mesesSnap = await db.collection("meses").orderBy("monthKey", "asc").get();
      if (!mesesSnap.empty) {
        state.months = mesesSnap.docs.map((d) => d.id);
      }
      const faltantesHistorico = SEED_MONTHS.filter((mk) => !state.months.includes(mk));
      if (faltantesHistorico.length) {
        for (const mk of faltantesHistorico) await semearMes(db, mk);
        const mesesSnap2 = await db.collection("meses").orderBy("monthKey", "asc").get();
        state.months = mesesSnap2.docs.map((d) => d.id);
      }
      state.readingsByMonth = {};
      for (const mk of state.months) {
        const snap = await db.collection("leituras").where("monthKey", "==", mk).get();
        const r = {};
        snap.docs.forEach((d) => {
          const v = d.data();
          r[v.item] = { leitura_anterior: v.leitura_anterior, leitura_atual: v.leitura_atual };
        });
        state.readingsByMonth[mk] = r;
      }
      const lastMonth = state.months[state.months.length - 1] || SEED_MONTH;
      const currentYear2 = (/* @__PURE__ */ new Date()).getFullYear();
      state.currentMonth = currentYear2 > Number(lastMonth.split("-")[0]) ? `${currentYear2}-01` : lastMonth;
    } catch (e) {
      console.error("Falha ao ler banco do artifact", e);
      $("banners").innerHTML = banner("N\xE3o foi poss\xEDvel carregar os dados salvos agora. Mostrando o m\xEAs semente.", "warn");
    }
  }

  // ts/data/apiDb.ts
  async function apiGet(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Falha ao consultar ${path}: ${res.status}`);
    const body = await res.json();
    return { docs: body.docs.map((d) => ({ id: d.id, data: () => d.data })) };
  }
  async function apiWrite(method, path, data) {
    const res = await fetch(path, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`Falha ao salvar ${path}: ${res.status}`);
  }
  function makeApiDb() {
    function collection(name) {
      return {
        async get() {
          const { docs } = await apiGet(`/api/db/${name}`);
          return { empty: docs.length === 0, docs };
        },
        doc(id) {
          const path = `/api/db/${name}/${encodeURIComponent(id)}`;
          return {
            id,
            async get() {
              const res = await fetch(path);
              if (!res.ok) throw new Error(`Falha ao consultar ${path}: ${res.status}`);
              const body = await res.json();
              return { exists: body.exists, data: () => body.data || {} };
            },
            async set(data) {
              await apiWrite("PUT", path, data);
            },
            async update(data) {
              await apiWrite("PATCH", path, data);
            },
            async delete() {
              throw new Error("delete n\xE3o \xE9 suportado pelo banco compartilhado");
            }
          };
        },
        where(field, op, value) {
          return {
            async get() {
              const { docs } = await apiGet(`/api/db/${name}?where=${encodeURIComponent(field)},${encodeURIComponent(op)},${encodeURIComponent(String(value))}`);
              return { empty: docs.length === 0, docs };
            }
          };
        },
        orderBy(field, dir) {
          return {
            async get() {
              const { docs } = await apiGet(`/api/db/${name}?orderBy=${encodeURIComponent(field)},${dir || "asc"}`);
              return { empty: docs.length === 0, docs };
            }
          };
        }
      };
    }
    return { collection };
  }
  function makeApiDownloads() {
    return {
      async save({ filename, data }) {
        let blob;
        if (data instanceof Blob) {
          blob = data;
        } else if (typeof data === "string") {
          blob = new Blob([data], { type: "text/plain;charset=utf-8" });
        } else {
          blob = new Blob([data]);
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 4e3);
        return { status: "saved" };
      }
    };
  }

  // ts/data/centrosCusto.ts
  var PROJETO_POR_COD_ORC = {
    "001400160102": { projeto: 1427, nome: "Gest\xE3o de Comunica\xE7\xE3o Institucional" },
    "001600050102": { projeto: 1461, nome: "Ensino Fundamental" },
    "001400050102": { projeto: 1416, nome: "Dire\xE7\xE3o Regional" },
    "001400150102": { projeto: 1426, nome: "Ger\xEAncia de Obras e Manuten\xE7\xE3o" },
    "001400120102": { projeto: 1423, nome: "Ger\xEAncia de Contabilidade" },
    "001600020103": { projeto: 1432, nome: "Nutri\xE7\xE3o" },
    "001600100115": { projeto: 1494, nome: "Mesa Brasil" },
    "001600120102": { projeto: 1467, nome: "Central de Relacionamento" },
    "001400030102": { projeto: 1414, nome: "Assessoria Jur\xEDdica" },
    "001400060102": { projeto: 1417, nome: "Assessoria de Planejamento e Or\xE7amento" },
    "001400080102": { projeto: 1419, nome: "Ger\xEAncia de Pessoas" },
    "001400070102": { projeto: 1418, nome: "Diretoria Administrativa e Financeira" },
    "001500030102": { projeto: 1436, nome: "Ger\xEAncia de Cultura" },
    "001600140102": { projeto: 1430, nome: "Odontologia" },
    "001800020102": { projeto: 1497, nome: "Unidade de Cultura e Lazer - Senador Guiomard" },
    "002000010102": { projeto: 1429, nome: "Sesc Ler - Xapuri" },
    "001700020102": { projeto: 1495, nome: "Unidade de Cultura e Lazer - Brasil\xE9ia" },
    "001900020102": { projeto: 1496, nome: "Unidade de Cultura e Lazer - Pl\xE1cido de Castro" },
    "002100010102": { projeto: 1429, nome: "Sesc Ler - Feij\xF3" },
    "002200010102": { projeto: 1472, nome: "Ger\xEAncia da Unidade de Turismo e Lazer" },
    "002200020102": { projeto: 1473, nome: "Ger\xEAncia do Hotel" },
    "002200070102": { projeto: 1467, nome: "Central de Relacionamento" },
    "002200060103": { projeto: 1432, nome: "Nutri\xE7\xE3o" }
  };

  // ts/data/rows.ts
  function seedReadings() {
    const r = {};
    EQUIP_SEED.forEach((e) => {
      r[e.item] = { leitura_anterior: e.l_ant, leitura_atual: e.l_atual };
    });
    return r;
  }
  function qtdCobrada(anterior, atual) {
    return Math.max(0, Math.round((atual - anterior) * 100) / 100);
  }
  function rowsForMonth(monthKey) {
    const readings = state.readingsByMonth[monthKey] || {};
    return state.equipList.map((e) => {
      const rd = readings[e.item] || { leitura_anterior: e.l_ant, leitura_atual: e.l_ant };
      const qtd = qtdCobrada(rd.leitura_anterior, rd.leitura_atual);
      const valor_copias = qtd * e.valor_unit;
      const geral = valor_copias + e.valor_loc;
      return {
        item: e.item,
        grupo: e.grupo,
        setor: e.setor,
        cod_orc: e.cod_orc,
        sigla: e.sigla,
        maquina: e.maquina,
        tipo_equip: e.tipo_equip,
        valor_loc: e.valor_loc,
        valor_unit: e.valor_unit,
        leitura_anterior: rd.leitura_anterior,
        leitura_atual: rd.leitura_atual,
        qtd_copia: qtd,
        valor_copias,
        geral,
        pct: 0
      };
    });
  }
  function withPct(rows) {
    const tot = rows.reduce((s, d) => s + d.geral, 0) || 1;
    rows.forEach((d) => {
      d.pct = Math.round(d.geral / tot * 1e3) / 10;
    });
    return rows;
  }
  function mesTemDados(monthKey) {
    return state.months.includes(monthKey);
  }
  function filtered() {
    const rows = withPct(rowsForMonth(state.currentMonth));
    return state.currentGrupo === "Todos" ? rows : rows.filter((d) => d.grupo === state.currentGrupo);
  }

  // ts/export/download.ts
  function showBanner(msg, kind) {
    $("banners").innerHTML = banner(msg, kind);
  }
  async function runExport(btnId, labelGerando, gerar) {
    const btn = $(btnId);
    const originalLabel = btn.textContent;
    btn.disabled = true;
    btn.textContent = labelGerando;
    const restaurar = () => {
      btn.disabled = false;
      btn.textContent = originalLabel;
    };
    const arquivo = await gerar();
    if (!arquivo) {
      restaurar();
      return;
    }
    if (state.downloads) {
      try {
        await state.downloads.save(arquivo);
        restaurar();
        return;
      } catch (e) {
        console.error("download recusado", e);
      }
    }
    showBanner("Download dispon\xEDvel apenas quando este artifact \xE9 aberto na sua conta Claude.", "warn");
    restaurar();
  }

  // ts/export/excel.ts
  var HISTORICO = "PREG\xC3O ELETR\xD4NICO N\xBA 04/2022";
  var GRUPO_LOCACAO = "3332001";
  var FLUXO_LOCACAO = "2001007";
  var GRUPO_IMPRESSAO = "3332003";
  var FLUXO_IMPRESSAO = "3001002";
  var CSV_DELIM = ";";
  function csvEscape(value) {
    if (value.includes(CSV_DELIM) || value.includes('"') || value.includes("\n")) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }
  function formatValorBR(n) {
    return n.toFixed(2).replace(".", ",");
  }
  function montarCsvRateio(monthKey) {
    const rows = rowsForMonth(monthKey);
    const linhas = [
      ["C\xF3digo do grupo de pagamento", "Fluxo de caixa", "Centro de custo", "Projeto", "Valor", "Hist\xF3rico"]
    ];
    rows.forEach((d) => {
      const info = PROJETO_POR_COD_ORC[d.cod_orc];
      const centroCusto = d.cod_orc;
      const projeto = info ? String(info.projeto) : "";
      linhas.push([GRUPO_LOCACAO, FLUXO_LOCACAO, centroCusto, projeto, formatValorBR(d.valor_loc), HISTORICO]);
      linhas.push([GRUPO_IMPRESSAO, FLUXO_IMPRESSAO, centroCusto, projeto, formatValorBR(d.valor_copias), HISTORICO]);
    });
    const csv = linhas.map((linha) => linha.map(csvEscape).join(CSV_DELIM)).join("\r\n");
    return `\uFEFF${csv}`;
  }
  function dataAtualBR() {
    const hoje = /* @__PURE__ */ new Date();
    const dd = String(hoje.getDate()).padStart(2, "0");
    const mm = String(hoje.getMonth() + 1).padStart(2, "0");
    return `${dd}-${mm}-${hoje.getFullYear()}`;
  }
  async function exportarCsv() {
    await runExport("btnExcel", "Gerando CSV\u2026", async () => {
      const csv = montarCsvRateio(state.currentMonth);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const filename = `PrintGest_GETIC_${dataAtualBR()}.csv`;
      return { filename, data: blob };
    });
  }
  function bindExcel() {
    $("btnExcel").addEventListener("click", exportarCsv);
  }

  // ts/utils/scriptLoader.ts
  function loadScriptOnce(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-dyn="' + src + '"]');
      if (existing) {
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () => reject(new Error("load fail")));
        return;
      }
      const s = document.createElement("script");
      s.src = src;
      s.dataset.dyn = src;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("load fail " + src));
      document.head.appendChild(s);
    });
  }
  async function ensureLib(nome, isLoaded, urls) {
    if (isLoaded()) return true;
    try {
      await loadScriptOnce(urls.cdnjs);
    } catch (e) {
      console.error(`Falha ao carregar ${nome} (cdnjs)`, e);
    }
    if (isLoaded()) return true;
    try {
      await loadScriptOnce(urls.jsdelivr);
    } catch (e) {
      console.error(`Falha ao carregar ${nome} (jsdelivr)`, e);
    }
    return isLoaded();
  }
  var ensureSwal = () => ensureLib("SweetAlert2", () => !!window.Swal, CDN.swal);
  var ensureJsPDF = () => ensureLib("jsPDF", () => !!(window.jspdf && window.jspdf.jsPDF), CDN.jspdf);

  // ts/export/pdf.ts
  var COLS = [
    { key: "item", title: "#", w: 8, align: "left" },
    { key: "sigla", title: "Sigla", w: 24, align: "left" },
    { key: "cod_orc", title: "Centro de Custo", w: 26, align: "left" },
    { key: "setor", title: "Setor", w: 58, align: "left" },
    { key: "tipo_equip", title: "Tipo", w: 22, align: "left" },
    { key: "leitura_anterior", title: "Leit. Ant.", w: 18, align: "right" },
    { key: "leitura_atual", title: "Leit. Atual", w: 18, align: "right" },
    { key: "qtd_copia", title: "C\xF3pias", w: 16, align: "right" },
    { key: "valor_loc", title: "Loca\xE7\xE3o (R$)", w: 20, align: "right" },
    { key: "valor_copias", title: "Impress\xE3o (R$)", w: 22, align: "right" },
    { key: "geral", title: "Total (R$)", w: 20, align: "right" },
    { key: "pct", title: "%", w: 12, align: "right" }
  ];
  function truncateToWidth(doc, text, maxWidth) {
    const str = String(text != null ? text : "");
    if (doc.getTextWidth(str) <= maxWidth) return str;
    let t = str;
    while (t.length > 1 && doc.getTextWidth(t + "\u2026") > maxWidth) {
      t = t.slice(0, -1);
    }
    return t + "\u2026";
  }
  function carregarLogo() {
    var _a;
    const src = (_a = document.querySelector("header .logo")) == null ? void 0 : _a.src;
    if (!src) return Promise.resolve(null);
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(null);
            return;
          }
          ctx.drawImage(img, 0, 0);
          resolve({ dataUrl: canvas.toDataURL("image/png"), ratio: img.naturalWidth / img.naturalHeight });
        } catch (e) {
          console.error("Falha ao preparar o logo para o PDF", e);
          resolve(null);
        }
      };
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }
  function gerarRelatorioPdf(jsPDFCtor, logo) {
    const rows = withPct(rowsForMonth(state.currentMonth));
    const totGeral = rows.reduce((s, d) => s + d.geral, 0);
    const totImpr = rows.reduce((s, d) => s + d.valor_copias, 0);
    const totLoc = rows.reduce((s, d) => s + d.valor_loc, 0);
    const totCop = rows.reduce((s, d) => s + d.qtd_copia, 0);
    const doc = new jsPDFCtor({ orientation: "landscape", unit: "mm", format: "a4" });
    const PAGE_W = doc.internal.pageSize.getWidth();
    const PAGE_H = doc.internal.pageSize.getHeight();
    const MARGIN = 12;
    const HEADER_H = 26;
    function drawHeader() {
      doc.setFillColor(21, 37, 64);
      doc.rect(0, 0, PAGE_W, HEADER_H, "F");
      doc.setTextColor(255, 255, 255);
      if (logo) {
        const h = 11;
        doc.addImage(logo.dataUrl, "PNG", MARGIN, 3, h * logo.ratio, h);
      } else {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("PrintGest", MARGIN, 11);
      }
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text("Controle de Impress\xE3o & Loca\xE7\xE3o de Equipamentos", MARGIN, 18.5);
      doc.setFontSize(7.5);
      doc.text("GETIC \u2014 Ger\xEAncia de Tecnologia da Informa\xE7\xE3o e Comunica\xE7\xE3o", MARGIN, 22.5);
      doc.setFontSize(9);
      doc.text("M\xEAs de refer\xEAncia: " + monthLabel(state.currentMonth), PAGE_W - MARGIN, 11, { align: "right" });
      doc.setFontSize(8);
      doc.text("Gerado em " + (/* @__PURE__ */ new Date()).toLocaleString("pt-BR"), PAGE_W - MARGIN, 18.5, { align: "right" });
    }
    function drawKpis(y2) {
      const kpis = [
        { label: "Custo total do m\xEAs", value: fmtR(totGeral) },
        { label: "Custo com impress\xE3o", value: fmtR(totImpr) },
        { label: "Custo com loca\xE7\xE3o", value: fmtR(totLoc) },
        { label: "C\xF3pias/impress\xF5es", value: fmtN(totCop) }
      ];
      const gap = 4, w = (PAGE_W - 2 * MARGIN - gap * 3) / 4, h = 16;
      kpis.forEach((k, i) => {
        const x = MARGIN + i * (w + gap);
        doc.setDrawColor(225, 230, 238);
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(x, y2, w, h, 1.5, 1.5, "FD");
        doc.setFillColor(47, 111, 237);
        doc.rect(x, y2, 1.2, h, "F");
        doc.setTextColor(92, 107, 128);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.text(k.label, x + 5, y2 + 6);
        doc.setTextColor(21, 37, 64);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12.5);
        doc.text(String(k.value), x + 5, y2 + 12.5);
      });
      return y2 + h + 6;
    }
    const totalW = COLS.reduce((s, c) => s + c.w, 0);
    const rowH = 6.2;
    function drawTableHeader(y2) {
      doc.setFillColor(21, 37, 64);
      doc.rect(MARGIN, y2, totalW, 7, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.8);
      let x = MARGIN;
      COLS.forEach((c) => {
        const tx = c.align === "right" ? x + c.w - 1.5 : x + 1.5;
        doc.text(c.title, tx, y2 + 4.8, { align: c.align });
        x += c.w;
      });
      return y2 + 7;
    }
    function drawRow(y2, d, idx) {
      if (idx % 2 === 1) {
        doc.setFillColor(244, 246, 249);
        doc.rect(MARGIN, y2, totalW, rowH, "F");
      }
      doc.setTextColor(27, 36, 52);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.6);
      let x = MARGIN;
      COLS.forEach((c) => {
        var _a;
        let text;
        if (c.key === "qtd_copia" || c.key === "leitura_anterior" || c.key === "leitura_atual") text = fmtN(d[c.key]);
        else if (c.key === "valor_loc" || c.key === "valor_copias" || c.key === "geral") text = fmtR(d[c.key]).replace("R$ ", "");
        else if (c.key === "pct") text = d.pct.toFixed(1) + "%";
        else text = String((_a = d[c.key]) != null ? _a : "");
        if (c.align === "left" && c.key !== "item") text = truncateToWidth(doc, text, c.w - 3);
        const tx = c.align === "right" ? x + c.w - 1.5 : x + 1.5;
        doc.text(text, tx, y2 + 4.3, { align: c.align });
        x += c.w;
      });
    }
    function drawTotalsRow(y2) {
      doc.setFillColor(21, 37, 64);
      doc.rect(MARGIN, y2, totalW, 7, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.9);
      doc.text("TOTAL GERAL", MARGIN + 1.5, y2 + 4.8);
      let x = MARGIN;
      COLS.forEach((c) => {
        if (c.key === "valor_loc") {
          doc.text(fmtR(totLoc).replace("R$ ", ""), x + c.w - 1.5, y2 + 4.8, { align: "right" });
        }
        if (c.key === "valor_copias") {
          doc.text(fmtR(totImpr).replace("R$ ", ""), x + c.w - 1.5, y2 + 4.8, { align: "right" });
        }
        if (c.key === "geral") {
          doc.text(fmtR(totGeral).replace("R$ ", ""), x + c.w - 1.5, y2 + 4.8, { align: "right" });
        }
        if (c.key === "qtd_copia") {
          doc.text(fmtN(totCop), x + c.w - 1.5, y2 + 4.8, { align: "right" });
        }
        x += c.w;
      });
      return y2 + 7;
    }
    drawHeader();
    let y = drawKpis(HEADER_H + 6);
    y = drawTableHeader(y);
    rows.forEach((d, idx) => {
      if (y + rowH > PAGE_H - 16) {
        doc.addPage();
        doc.setFillColor(21, 37, 64);
        doc.rect(0, 0, PAGE_W, 10, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.text("Continua\xE7\xE3o \u2014 " + monthLabel(state.currentMonth), MARGIN, 6.5);
        y = drawTableHeader(14);
      }
      drawRow(y, d, idx);
      y += rowH;
    });
    y = drawTotalsRow(y);
    const pageCount = doc.getNumberOfPages();
    for (let p = 1; p <= pageCount; p++) {
      doc.setPage(p);
      doc.setTextColor(140, 150, 165);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.text("P\xE1gina " + p + " de " + pageCount, PAGE_W - MARGIN, PAGE_H - 6, { align: "right" });
    }
    return doc;
  }
  async function baixarRecibo() {
    await runExport("btnRecibo", "Gerando PDF\u2026", async () => {
      if (!mesTemDados(state.currentMonth)) {
        showBanner("N\xE3o h\xE1 leituras lan\xE7adas para este m\xEAs. Selecione um m\xEAs com dados para gerar o relat\xF3rio.", "warn");
        return null;
      }
      const ok = await ensureJsPDF();
      const lib = window.jspdf;
      if (!ok || !lib) {
        showBanner("N\xE3o foi poss\xEDvel carregar o gerador de PDF agora. Verifique a conex\xE3o e tente novamente.", "err");
        return null;
      }
      try {
        const blob = gerarRelatorioPdf(lib.jsPDF, await carregarLogo()).output("blob");
        return { filename: `relatorio_getic_${state.currentMonth}.pdf`, data: blob };
      } catch (e) {
        console.error("Falha ao montar o PDF", e);
        showBanner("N\xE3o foi poss\xEDvel montar o relat\xF3rio em PDF.", "err");
        return null;
      }
    });
  }
  function bindPdf() {
    $("btnRecibo").addEventListener("click", baixarRecibo);
  }

  // ts/export/sql.ts
  function montarScriptSql() {
    const lines = [];
    lines.push("-- Script gerado pelo PrintGest \xB7 Controle de Impress\xE3o & Loca\xE7\xE3o de Equipamentos");
    lines.push("-- Gerado em " + (/* @__PURE__ */ new Date()).toLocaleString("pt-BR"));
    lines.push("");
    lines.push("CREATE TABLE IF NOT EXISTS equipamentos (");
    lines.push("  item INTEGER PRIMARY KEY,");
    lines.push("  grupo VARCHAR(60) NOT NULL,");
    lines.push("  setor VARCHAR(200) NOT NULL,");
    lines.push("  cod_orc VARCHAR(20) NOT NULL,");
    lines.push("  sigla VARCHAR(60) NOT NULL,");
    lines.push("  maquina VARCHAR(30),");
    lines.push("  tipo_equip VARCHAR(30),");
    lines.push("  valor_loc DECIMAL(10,2) NOT NULL,");
    lines.push("  valor_unit DECIMAL(10,4) NOT NULL");
    lines.push(");");
    lines.push("");
    lines.push("CREATE TABLE IF NOT EXISTS leituras (");
    lines.push("  id INTEGER PRIMARY KEY AUTOINCREMENT,");
    lines.push("  month_key VARCHAR(7) NOT NULL,");
    lines.push("  item INTEGER NOT NULL REFERENCES equipamentos(item),");
    lines.push("  leitura_anterior DECIMAL(14,2) NOT NULL,");
    lines.push("  leitura_atual DECIMAL(14,2) NOT NULL,");
    lines.push("  saved_at DATETIME,");
    lines.push("  UNIQUE(month_key, item)");
    lines.push(");");
    lines.push("");
    lines.push("-- Cadastro de equipamentos");
    state.equipList.forEach((e) => {
      lines.push(`INSERT INTO equipamentos (item, grupo, setor, cod_orc, sigla, maquina, tipo_equip, valor_loc, valor_unit) VALUES (${[
        sqlEscape(e.item),
        sqlEscape(e.grupo),
        sqlEscape(e.setor),
        sqlEscape(e.cod_orc),
        sqlEscape(e.sigla),
        sqlEscape(e.maquina),
        sqlEscape(e.tipo_equip),
        sqlEscape(e.valor_loc),
        sqlEscape(e.valor_unit)
      ].join(", ")});`);
    });
    lines.push("");
    lines.push("-- Leituras mensais");
    state.months.forEach((mk) => {
      const readings = state.readingsByMonth[mk] || {};
      state.equipList.forEach((e) => {
        const rd = readings[e.item];
        if (!rd) return;
        lines.push(`INSERT INTO leituras (month_key, item, leitura_anterior, leitura_atual, saved_at) VALUES (${[
          sqlEscape(mk),
          sqlEscape(e.item),
          sqlEscape(rd.leitura_anterior),
          sqlEscape(rd.leitura_atual),
          sqlEscape((/* @__PURE__ */ new Date()).toISOString())
        ].join(", ")});`);
      });
    });
    return lines.join("\n") + "\n";
  }
  async function gerarSql() {
    await runExport("btnSql", "Gerando SQL\u2026", async () => {
      try {
        const filename = `script_banco_getic_${state.months[0]}_a_${state.months[state.months.length - 1]}.txt`;
        return { filename, data: montarScriptSql() };
      } catch (e) {
        console.error("Falha ao montar o SQL", e);
        showBanner("N\xE3o foi poss\xEDvel montar o script SQL.", "err");
        return null;
      }
    });
  }
  function bindSql() {
    $("btnSql").addEventListener("click", gerarSql);
  }

  // ts/ui/admin.ts
  var isAdmin = false;
  function setAdminButtonsVisible(visible) {
    ADMIN_BUTTON_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.classList.toggle("admin-only", !visible);
    });
  }
  async function abrirAreaAdmin() {
    const btn = $("btnAdmin");
    const ok = await ensureSwal();
    const Swal = window.Swal;
    if (!ok || !Swal) {
      $("banners").innerHTML = banner("N\xE3o foi poss\xEDvel carregar a tela de login agora. Tente novamente em instantes.", "err");
      return;
    }
    if (isAdmin) {
      const r = await Swal.fire({
        icon: "question",
        title: "Sair da \xE1rea administrativa?",
        showCancelButton: true,
        confirmButtonText: "Sair",
        cancelButtonText: "Cancelar",
        customClass: {
          popup: "getic-swal-popup",
          title: "getic-swal-title",
          htmlContainer: "getic-swal-html",
          confirmButton: "getic-swal-confirm",
          cancelButton: "getic-swal-cancel",
          icon: "getic-swal-icon",
          actions: "getic-swal-actions",
          closeButton: "getic-swal-closebtn"
        },
        buttonsStyling: false,
        confirmButtonColor: void 0
      });
      if (r.isConfirmed) {
        isAdmin = false;
        setAdminButtonsVisible(false);
        btn.textContent = "\u{1F512} \xC1rea admin";
      }
      return;
    }
    const { value: ok2 } = await Swal.fire({
      title: "\xC1rea Administrativa",
      html: '<input id="swal-user" class="swal2-input getic-swal-input" placeholder="Usu\xE1rio" autocomplete="off"><input id="swal-pass" type="password" class="swal2-input getic-swal-input" placeholder="Senha" autocomplete="off">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Entrar",
      cancelButtonText: "Cancelar",
      buttonsStyling: false,
      customClass: {
        popup: "getic-swal-popup",
        title: "getic-swal-title",
        htmlContainer: "getic-swal-html",
        confirmButton: "getic-swal-confirm",
        cancelButton: "getic-swal-cancel",
        validationMessage: "getic-swal-validation",
        actions: "getic-swal-actions",
        closeButton: "getic-swal-closebtn"
      },
      didOpen: () => {
        const onEnter = (ev) => {
          if (ev.key === "Enter") Swal.clickConfirm();
        };
        $("swal-user").addEventListener("keydown", onEnter);
        $("swal-pass").addEventListener("keydown", onEnter);
      },
      preConfirm: () => {
        const confirmBtn = Swal.getConfirmButton();
        if (confirmBtn) confirmBtn.textContent = "Entrando...";
        const u = $("swal-user").value.trim();
        const p = $("swal-pass").value;
        if (u !== ADMIN_USER || p !== ADMIN_PASS) {
          if (confirmBtn) confirmBtn.textContent = "Entrar";
          Swal.showValidationMessage("Usu\xE1rio ou senha inv\xE1lidos");
          return false;
        }
        return true;
      }
    });
    if (ok2) {
      isAdmin = true;
      setAdminButtonsVisible(true);
      btn.textContent = "\u{1F513} Sair da \xE1rea admin";
      Swal.fire({
        icon: "success",
        title: "Acesso liberado",
        timer: 1200,
        showConfirmButton: false,
        customClass: { popup: "getic-swal-popup", title: "getic-swal-title", icon: "getic-swal-icon" }
      });
    }
  }
  function bindAdmin() {
    setAdminButtonsVisible(false);
    $("btnAdmin").addEventListener("click", abrirAreaAdmin);
  }

  // ts/data/categorias.ts
  var CATEGORIAS = [
    { id: "policromatica", rotulo: "Policrom\xE1tica", singular: "policrom\xE1tica", plural: "policrom\xE1ticas" },
    { id: "plotter", rotulo: "Plotter A1", singular: "plotter A1", plural: "plotter A1" },
    { id: "frenteVerso", rotulo: "Frente e verso", singular: "frente e verso", plural: "frente e verso" },
    { id: "multifuncional", rotulo: "Multifuncional", singular: "multifuncional", plural: "multifuncionais" }
  ];
  function categoriaOf(e) {
    if (MAQUINAS_POLICROMATICAS.has(e.maquina)) return "policromatica";
    if (e.tipo_equip === "Impressora A1") return "plotter";
    if (e.tipo_equip === "Impressora") return "frenteVerso";
    return "multifuncional";
  }
  function rotuloCategoria(e) {
    const id = categoriaOf(e);
    return CATEGORIAS.find((c) => c.id === id).rotulo;
  }

  // ts/ui/charts.ts
  var charts = {};
  var COR_CATEGORIA = {
    multifuncional: "--accent",
    plotter: "--amber",
    frenteVerso: "--teal",
    policromatica: "--purple"
  };
  function destroy(id) {
    if (charts[id]) {
      charts[id].destroy();
      delete charts[id];
    }
  }
  var hasChart = () => typeof window.Chart !== "undefined";
  function configureChartDefaults() {
    if (window.Chart) {
      window.Chart.defaults.font.family = "'IBM Plex Sans', system-ui, sans-serif";
      window.Chart.defaults.font.size = 11.5;
    }
  }
  function cssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }
  function canvasOrFallback(id) {
    const canvas = $(id);
    if (!hasChart()) {
      canvas.parentElement.innerHTML = '<div class="chart-fallback">Gr\xE1fico indispon\xEDvel nesta visualiza\xE7\xE3o.</div>';
      return null;
    }
    return canvas;
  }
  function renderChartSetor() {
    const canvas = canvasOrFallback("chartSetor");
    if (!canvas) return;
    const rows = [...filtered()].sort((a, b) => b.geral - a.geral).slice(0, 10);
    destroy("setor");
    charts.setor = new window.Chart(canvas, {
      type: "bar",
      data: { labels: rows.map((d) => d.sigla), datasets: [{ data: rows.map((d) => d.geral), backgroundColor: cssVar("--accent"), borderRadius: 4, maxBarThickness: 22 }] },
      options: {
        indexAxis: "y",
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (c) => fmtR(c.raw), afterLabel: (c) => `Impressora: ${rotuloCategoria(rows[c.dataIndex])}` } }
        },
        scales: { x: { grid: { color: cssVar("--grid") }, ticks: { callback: (v) => "R$" + v } }, y: { grid: { display: false } } }
      }
    });
  }
  function renderChartTipo() {
    const canvas = canvasOrFallback("chartTipo");
    if (!canvas) return;
    const byCategoria = {};
    filtered().forEach((d) => {
      const c = categoriaOf(d);
      byCategoria[c] = (byCategoria[c] || 0) + d.geral;
    });
    const categorias = CATEGORIAS.filter((c) => byCategoria[c.id] !== void 0);
    destroy("tipo");
    charts.tipo = new window.Chart(canvas, {
      type: "doughnut",
      data: {
        labels: categorias.map((c) => c.plural.charAt(0).toUpperCase() + c.plural.slice(1)),
        datasets: [{ data: categorias.map((c) => byCategoria[c.id]), backgroundColor: categorias.map((c) => cssVar(COR_CATEGORIA[c.id])), borderWidth: 2, borderColor: cssVar("--panel") }]
      },
      options: { cutout: "62%", plugins: { legend: { position: "bottom", labels: { boxWidth: 10, boxHeight: 10, padding: 14 } }, tooltip: { callbacks: { label: (c) => c.label + ": " + fmtR(c.raw) } } } }
    });
  }
  function renderChartUnidade() {
    const canvas = canvasOrFallback("chartUnidade");
    if (!canvas) return;
    const rows = withPct(rowsForMonth(state.currentMonth));
    const byGrupo = {};
    rows.forEach((d) => {
      byGrupo[d.grupo] = (byGrupo[d.grupo] || 0) + d.geral;
    });
    const labels = Object.keys(byGrupo);
    destroy("unidade");
    charts.unidade = new window.Chart(canvas, {
      type: "bar",
      data: { labels, datasets: [{ data: labels.map((l) => byGrupo[l]), backgroundColor: labels.map((l) => l === state.currentGrupo || state.currentGrupo === "Todos" ? cssVar("--teal") : cssVar("--muted")), borderRadius: 4, maxBarThickness: 46 }] },
      options: { plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => fmtR(c.raw) } } }, scales: { x: { grid: { display: false } }, y: { grid: { color: cssVar("--grid") }, ticks: { callback: (v) => "R$" + v } } } }
    });
  }
  function renderChartTop() {
    const canvas = canvasOrFallback("chartTop");
    if (!canvas) return;
    const rows = [...filtered()].sort((a, b) => b.pct - a.pct).slice(0, 8);
    destroy("top");
    charts.top = new window.Chart(canvas, {
      type: "bar",
      data: { labels: rows.map((d) => d.sigla), datasets: [{ data: rows.map((d) => d.pct), backgroundColor: cssVar("--amber"), borderRadius: 4, maxBarThickness: 20 }] },
      options: { indexAxis: "y", plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => c.raw + "%" } } }, scales: { x: { grid: { color: cssVar("--grid") }, ticks: { callback: (v) => v + "%" } }, y: { grid: { display: false } } } }
    });
  }
  function renderCharts() {
    try {
      renderChartSetor();
      renderChartTipo();
      renderChartUnidade();
      renderChartTop();
    } catch (e) {
      console.error("Falha ao desenhar gr\xE1ficos", e);
    }
  }

  // ts/ui/importar.ts
  function lerDadosDoNavegador() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.error("Falha ao ler localStorage", e);
      return null;
    }
  }
  async function importarDoNavegador(onImported) {
    const dump = lerDadosDoNavegador();
    if (!dump || !dump.equipamentos && !dump.leituras && !dump.meses) {
      $("banners").innerHTML = banner("Nenhum dado salvo foi encontrado neste navegador.", "warn");
      return;
    }
    const ok = await ensureSwal();
    const Swal = window.Swal;
    if (ok && Swal) {
      const meses = Object.keys(dump.meses || {}).length;
      const { isConfirmed } = await Swal.fire({
        icon: "warning",
        title: "Importar dados deste navegador?",
        html: `Isso vai enviar os dados salvos <b>neste navegador</b> (${meses} m\xEAs(es) lan\xE7ado(s)) para o banco compartilhado, substituindo os registros com o mesmo m\xEAs/equipamento j\xE1 salvos no servidor.`,
        showCancelButton: true,
        confirmButtonText: "Importar",
        cancelButtonText: "Cancelar",
        buttonsStyling: false,
        customClass: {
          popup: "getic-swal-popup",
          title: "getic-swal-title",
          htmlContainer: "getic-swal-html",
          confirmButton: "getic-swal-confirm",
          cancelButton: "getic-swal-cancel",
          icon: "getic-swal-icon",
          actions: "getic-swal-actions",
          closeButton: "getic-swal-closebtn"
        }
      });
      if (!isConfirmed) return;
    }
    const btn = $("btnImportarNavegador");
    const originalLabel = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Importando\u2026";
    try {
      const res = await fetch("/api/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dump)
      });
      if (!res.ok) throw new Error(`import falhou: ${res.status}`);
      if (state.db) await loadFromDb(state.db);
      onImported();
      $("banners").innerHTML = banner("Dados deste navegador importados para o banco compartilhado com sucesso.", "ok");
    } catch (e) {
      console.error("Falha ao importar dados do navegador", e);
      $("banners").innerHTML = banner("N\xE3o foi poss\xEDvel importar os dados deste navegador agora. Tente novamente.", "err");
    } finally {
      btn.disabled = false;
      btn.textContent = originalLabel;
    }
  }
  function bindImportarNavegador(onImported) {
    $("btnImportarNavegador").addEventListener("click", () => importarDoNavegador(onImported));
  }

  // ts/ui/lancamento.ts
  var lancMonthKey = "";
  var lancRows = [];
  var overlay = () => $("overlay");
  function openLanc() {
    const { db, canWrite } = state;
    if (!db || !canWrite) return;
    const prevMonth = state.months[state.months.length - 1] || SEED_MONTH;
    const currentYear2 = (/* @__PURE__ */ new Date()).getFullYear();
    const lastYear = Number(prevMonth.split("-")[0]);
    lancMonthKey = currentYear2 > lastYear ? `${currentYear2}-01` : nextMonthKey(prevMonth);
    const prevReadings = state.readingsByMonth[prevMonth] || seedReadings();
    lancRows = state.equipList.map((e) => ({
      item: e.item,
      sigla: e.sigla,
      cod_orc: e.cod_orc,
      valor_unit: e.valor_unit,
      leitura_anterior: prevReadings[e.item] ? prevReadings[e.item].leitura_atual : e.l_atual,
      leitura_atual: null
    }));
    $("lancTitulo").textContent = "Lan\xE7amento de leituras \u2014 " + monthLabel(lancMonthKey);
    $("lancBanner").innerHTML = "";
    $("lancStatus").textContent = "";
    renderLancTable();
    overlay().classList.add("open");
  }
  function closeLanc() {
    overlay().classList.remove("open");
  }
  function calcLinha(r) {
    const atual = r.leitura_atual == null ? r.leitura_anterior : r.leitura_atual;
    const qtd = qtdCobrada(r.leitura_anterior, atual);
    return { qtd, val: qtd * r.valor_unit };
  }
  function renderLancTable() {
    $("lancBody").innerHTML = lancRows.map((r, i) => `
    <div class="lanc-cols lanc-row">
      <div class="lanc-cell name">${r.sigla}</div>
      <div class="lanc-cell name">${r.cod_orc}</div>
      <div class="lanc-cell num"><input type="number" step="0.01" min="0" data-i="${i}" class="input-anterior" readonly title="Clique para editar a leitura anterior (ex.: troca de impressora)" value="${r.leitura_anterior}"></div>
      <div class="lanc-cell num"><input type="number" step="0.01" min="0" data-i="${i}" class="input-atual" placeholder="${fmtN(r.leitura_anterior)}"></div>
      <div class="lanc-cell num" id="lanc-qtd-${i}">0</div>
      <div class="lanc-cell num" id="lanc-val-${i}">R$ 0,00</div>
    </div>
  `).join("");
    document.querySelectorAll(".input-anterior").forEach((inp) => {
      const i = Number(inp.dataset.i);
      const original = lancRows[i].leitura_anterior;
      inp.addEventListener("click", () => {
        if (!inp.readOnly) return;
        inp.readOnly = false;
        inp.select();
      });
      inp.addEventListener("input", () => {
        if (inp.value === "") return;
        lancRows[i].leitura_anterior = parseFloat(inp.value);
        inp.classList.toggle("alterada", lancRows[i].leitura_anterior !== original);
        const atual = document.querySelector(`.input-atual[data-i="${i}"]`);
        if (atual) atual.placeholder = fmtN(lancRows[i].leitura_anterior);
        updateLancRow(i);
        updateLancTotals();
      });
      inp.addEventListener("blur", () => {
        if (inp.value === "") inp.value = String(lancRows[i].leitura_anterior);
        inp.readOnly = true;
      });
    });
    document.querySelectorAll(".input-atual").forEach((inp) => {
      inp.addEventListener("input", () => {
        const i = Number(inp.dataset.i);
        lancRows[i].leitura_atual = inp.value === "" ? null : parseFloat(inp.value);
        updateLancRow(i);
        updateLancTotals();
      });
    });
    updateLancTotals();
  }
  function limparLeiturasAtuais() {
    lancRows.forEach((r) => {
      r.leitura_atual = null;
    });
    document.querySelectorAll(".input-atual").forEach((inp) => {
      inp.value = "";
      updateLancRow(Number(inp.dataset.i));
    });
    updateLancTotals();
    $("lancBanner").innerHTML = "";
  }
  function updateLancRow(i) {
    const { qtd, val } = calcLinha(lancRows[i]);
    $("lanc-qtd-" + i).textContent = fmtN(qtd);
    $("lanc-val-" + i).textContent = fmtR(val);
  }
  function updateLancTotals() {
    let totQtd = 0, totVal = 0;
    lancRows.forEach((r) => {
      const { qtd, val } = calcLinha(r);
      totQtd += qtd;
      totVal += val;
    });
    $("lancTotCopias").textContent = fmtN(totQtd);
    $("lancTotValor").textContent = fmtR(totVal);
  }
  async function salvarLancamento(onSaved) {
    const db = state.db;
    if (!db) return;
    const faltando = lancRows.filter((r) => r.leitura_atual == null);
    const invalidas = lancRows.filter((r) => r.leitura_atual != null && r.leitura_atual < r.leitura_anterior);
    if (faltando.length) {
      $("lancBanner").innerHTML = banner(`Faltam ${faltando.length} leitura(s) atual(is) para salvar o m\xEAs inteiro.`, "warn");
      return;
    }
    if (invalidas.length) {
      $("lancBanner").innerHTML = banner(`${invalidas.length} leitura(s) atual(is) menor(es) que a anterior \u2014 confira antes de salvar.`, "err");
      return;
    }
    const btnSalvar = $("btnSalvarLanc");
    btnSalvar.disabled = true;
    $("lancStatus").textContent = "Salvando\u2026";
    try {
      await Promise.all(lancRows.map((r2) => db.collection("leituras").doc(lancMonthKey + "_" + r2.item).set({
        monthKey: lancMonthKey,
        item: r2.item,
        leitura_anterior: r2.leitura_anterior,
        leitura_atual: r2.leitura_atual,
        savedAt: (/* @__PURE__ */ new Date()).toISOString()
      })));
      await db.collection("meses").doc(lancMonthKey).set({ monthKey: lancMonthKey, label: monthLabel(lancMonthKey), createdAt: (/* @__PURE__ */ new Date()).toISOString() });
      state.months.push(lancMonthKey);
      const r = {};
      lancRows.forEach((x) => {
        r[x.item] = { leitura_anterior: x.leitura_anterior, leitura_atual: x.leitura_atual };
      });
      state.readingsByMonth[lancMonthKey] = r;
      state.currentMonth = lancMonthKey;
      $("lancStatus").textContent = "Salvo!";
      setTimeout(() => {
        closeLanc();
        onSaved();
      }, 400);
    } catch (e) {
      console.error(e);
      $("lancBanner").innerHTML = banner("N\xE3o foi poss\xEDvel salvar agora. Tente novamente em instantes.", "err");
      $("lancStatus").textContent = "";
    }
    btnSalvar.disabled = false;
  }
  function bindLancamento(onSaved) {
    $("btnNovoMes").addEventListener("click", openLanc);
    $("btnFechar").addEventListener("click", closeLanc);
    $("btnCancelar").addEventListener("click", closeLanc);
    $("btnLimparLanc").addEventListener("click", limparLeiturasAtuais);
    $("btnSalvarLanc").addEventListener("click", () => salvarLancamento(onSaved));
    overlay().addEventListener("click", (e) => {
      if (e.target === overlay()) closeLanc();
    });
  }

  // ts/ui/filters.ts
  function renderFilters(onChange) {
    const grupos = ["Todos", ...Array.from(new Set(state.equipList.map((e) => e.grupo)))];
    const el = $("filters");
    el.innerHTML = grupos.map((g) => `<button class="pill" data-g="${g}">${g === "Todos" ? "Todas as unidades" : g}</button>`).join("");
    el.querySelectorAll("button").forEach((b) => {
      if (b.dataset.g === state.currentGrupo) b.classList.add("active");
      b.addEventListener("click", () => {
        state.currentGrupo = b.dataset.g;
        onChange();
      });
    });
  }

  // ts/ui/kpis.ts
  function detalheEquipamentos(rows) {
    const contagem = {};
    rows.forEach((d) => {
      const c = categoriaOf(d);
      contagem[c] = (contagem[c] || 0) + 1;
    });
    return CATEGORIAS.filter((c) => contagem[c.id]).map((c) => `<span>${contagem[c.id]} ${contagem[c.id] === 1 ? c.singular : c.plural}</span>`).join(" \xB7 ");
  }
  function renderKpis() {
    const rows = filtered();
    const geral = rows.reduce((s, d) => s + d.geral, 0);
    const impr = rows.reduce((s, d) => s + d.valor_copias, 0);
    const loc = rows.reduce((s, d) => s + d.valor_loc, 0);
    const cop = rows.reduce((s, d) => s + d.qtd_copia, 0);
    $("kpis").innerHTML = `
    <div class="kpi k-geral"><div class="lbl">Custo total do m\xEAs</div><div class="val">${fmtR(geral)}</div><div class="sub">loca\xE7\xE3o + impress\xE3o</div></div>
    <div class="kpi k-impr"><div class="lbl">Custo com impress\xE3o</div><div class="val">${fmtR(impr)}</div><div class="sub">${geral ? (impr / geral * 100).toFixed(1) : "0"}% do total</div></div>
    <div class="kpi k-loc"><div class="lbl">Custo com loca\xE7\xE3o</div><div class="val">${fmtR(loc)}</div><div class="sub">${geral ? (loc / geral * 100).toFixed(1) : "0"}% do total</div></div>
    <div class="kpi k-eq"><div class="lbl">Equipamentos ativos</div><div class="val">${rows.length}<span class="unit">${rows.length === 1 ? "unidade" : "unidades"}</span></div><div class="sub">${detalheEquipamentos(rows)}</div></div>
    <div class="kpi k-cop"><div class="lbl">C\xF3pias/impress\xF5es</div><div class="val">${fmtN(cop)}</div><div class="sub">custo m\xE9dio ${cop ? fmtR(impr / cop) : "R$ 0,00"}/c\xF3pia</div></div>
  `;
  }
  function renderContractKpis() {
    let acumImpr = 0, acumLoc = 0;
    state.months.forEach((mk) => {
      rowsForMonth(mk).forEach((d) => {
        acumImpr += d.valor_copias;
        acumLoc += d.valor_loc;
      });
    });
    const saldoImpr = CONTRATO_ANUAL.impressao - acumImpr;
    const saldoLoc = CONTRATO_ANUAL.locacao - acumLoc;
    $("contractKpis").innerHTML = `
    <div class="ckpi"><div class="lbl">Valor total (Impress\xF5es)</div><div class="val">${fmtR(CONTRATO_ANUAL.impressao)}</div><div class="sub">contrato anual</div></div>
    <div class="ckpi"><div class="lbl">Valor total (Loca\xE7\xE3o)</div><div class="val">${fmtR(CONTRATO_ANUAL.locacao)}</div><div class="sub">contrato anual</div></div>
    <div class="ckpi ${saldoImpr >= 0 ? "ok" : "warn"}"><div class="lbl">Saldo Impress\xE3o</div><div class="val">${fmtR(saldoImpr)}</div><div class="sub">${saldoImpr >= 0 ? "restante a consumir" : "j\xE1 ultrapassou em " + fmtR(Math.abs(saldoImpr))} \xB7 gasto ${fmtR(acumImpr)}</div></div>
    <div class="ckpi ${saldoLoc >= 0 ? "ok" : "warn"}"><div class="lbl">Saldo Loca\xE7\xE3o</div><div class="val">${fmtR(saldoLoc)}</div><div class="sub">${saldoLoc >= 0 ? "restante a consumir" : "j\xE1 ultrapassou em " + fmtR(Math.abs(saldoLoc))} \xB7 gasto ${fmtR(acumLoc)}</div></div>
  `;
  }

  // ts/ui/selectors.ts
  function renderYearSelect() {
    const yearSel = $("yearSelect");
    const years = Array.from(/* @__PURE__ */ new Set([
      ...state.months.map((mk) => mk.split("-")[0]),
      String((/* @__PURE__ */ new Date()).getFullYear())
    ]));
    const curYear = state.currentMonth.split("-")[0];
    if (!years.includes(curYear)) years.push(curYear);
    years.sort();
    yearSel.innerHTML = years.map((y) => `<option value="${y}"${y === curYear ? " selected" : ""}>${y}</option>`).join("");
  }
  function renderMonthSelect() {
    renderYearSelect();
    const sel = $("monthSelect");
    const year = state.currentMonth.split("-")[0];
    let opts = "";
    for (let m = 1; m <= 12; m++) {
      const mk = year + "-" + String(m).padStart(2, "0");
      const has = state.months.includes(mk);
      const sel_attr = mk === state.currentMonth ? " selected" : "";
      const label = MESES_PT[m - 1] + (has ? "" : " (sem dados)");
      opts += `<option value="${mk}"${sel_attr}>${label}</option>`;
    }
    sel.innerHTML = opts;
  }
  function bindSelectors(onChange) {
    $("yearSelect").addEventListener("change", (e) => {
      const newYear = e.target.value;
      const monthPart = state.currentMonth.split("-")[1];
      const candidate = newYear + "-" + monthPart;
      state.currentMonth = state.months.includes(candidate) ? candidate : state.months.find((mk) => mk.startsWith(newYear + "-")) || candidate;
      onChange();
    });
    $("monthSelect").addEventListener("change", (e) => {
      state.currentMonth = e.target.value;
      onChange();
    });
  }

  // ts/ui/tables.ts
  var TEXT_COLUMNS = ["sigla", "setor", "tipo_equip", "cod_orc"];
  function tagFor(d) {
    return `<span class="tag cat-${categoriaOf(d)}">${rotuloCategoria(d)}</span>`;
  }
  function valorOrdenacao(d, key) {
    return key === "tipo_equip" ? rotuloCategoria(d) : d[key];
  }
  var sortKey = "geral";
  var sortDir = -1;
  function renderTable() {
    const rows = [...filtered()];
    rows.sort((a, b) => {
      const av = valorOrdenacao(a, sortKey), bv = valorOrdenacao(b, sortKey);
      if (typeof av === "string") return sortDir * av.localeCompare(bv);
      return sortDir * (av - bv);
    });
    const maxPct = Math.max(1, ...withPct(rowsForMonth(state.currentMonth)).map((d) => d.pct));
    $("tbody").innerHTML = rows.map((d) => `
    <tr>
      <td>${d.item}</td>
      <td class="name">${d.sigla}</td>
      <td class="cc">${d.cod_orc}</td>
      <td class="name">${d.setor}</td>
      <td>${tagFor(d)}</td>
      <td class="num">${fmtR(d.valor_loc)}</td>
      <td class="num">${fmtN(d.qtd_copia)}</td>
      <td class="num">${fmtR(d.valor_copias)}</td>
      <td class="num">${fmtR(d.geral)}</td>
      <td class="num"><span class="barcell"><i style="width:${(d.pct / maxPct * 100).toFixed(0)}%"></i></span>${d.pct}%</td>
    </tr>
  `).join("");
  }
  var sortKeyHist = "monthKey";
  var sortDirHist = -1;
  function renderHistoryTable() {
    const rows = [];
    state.months.forEach((mk) => {
      rowsForMonth(mk).forEach((d) => {
        rows.push(__spreadProps(__spreadValues({}, d), { monthKey: mk, monthLabel: monthLabel(mk) }));
      });
    });
    rows.forEach((d) => {
      d.pct = 0;
    });
    rows.sort((a, b) => {
      const av = valorOrdenacao(a, sortKeyHist), bv = valorOrdenacao(b, sortKeyHist);
      if (typeof av === "string") return sortDirHist * String(av).localeCompare(String(bv));
      return sortDirHist * ((av || 0) - (bv || 0));
    });
    $("tbodyHist").innerHTML = rows.map((d) => `
    <tr>
      <td>${d.monthLabel}</td>
      <td class="name">${d.sigla}</td>
      <td class="cc">${d.cod_orc}</td>
      <td class="name">${d.setor}</td>
      <td>${tagFor(d)}</td>
      <td class="num">${fmtN(d.leitura_anterior)}</td>
      <td class="num">${fmtN(d.leitura_atual)}</td>
      <td class="num">${fmtN(d.qtd_copia)}</td>
      <td class="num">${fmtR(d.valor_copias)}</td>
      <td class="num">${fmtR(d.valor_loc)}</td>
      <td class="num">${fmtR(d.geral)}</td>
    </tr>
  `).join("");
  }
  function bindTableSorting() {
    document.querySelectorAll("#tbl thead th").forEach((th) => {
      th.addEventListener("click", () => {
        const k = th.dataset.k;
        if (sortKey === k) {
          sortDir *= -1;
        } else {
          sortKey = k;
          sortDir = TEXT_COLUMNS.includes(k) ? 1 : -1;
        }
        renderTable();
      });
    });
    document.querySelectorAll("#tblHist thead th").forEach((th) => {
      th.addEventListener("click", () => {
        const k = th.dataset.k;
        if (sortKeyHist === k) {
          sortDirHist *= -1;
        } else {
          sortKeyHist = k;
          sortDirHist = TEXT_COLUMNS.includes(k) || k === "monthKey" ? 1 : -1;
        }
        renderHistoryTable();
      });
    });
  }

  // ts/ui/render.ts
  function renderFooter(temDados) {
    const footer = $("footerNote");
    footer.classList.toggle("left", !temDados);
    footer.textContent = temDados ? `M\xEAs de refer\xEAncia: ${monthLabel(state.currentMonth)}` : "Fonte: planilha \u201CRelat\xF3rio de Impress\xE3o Sermatec 2026\u201D (controle interno GETIC, jan-ago). Leituras lan\xE7adas ficam salvas no banco compartilhado do servidor. Plotter A1 \xE9 medida em metros lineares.";
  }
  function renderAll() {
    const temDados = mesTemDados(state.currentMonth);
    $("dashboardContent").hidden = !temDados;
    $("emptyState").hidden = temDados;
    renderMonthSelect();
    renderFilters(renderAll);
    renderContractKpis();
    renderHistoryTable();
    renderFooter(temDados);
    if (temDados) {
      renderKpis();
      renderTable();
      renderCharts();
    } else {
      $("emptyTitle").textContent = monthLabelLong(state.currentMonth);
    }
  }

  // ts/main.ts
  async function initCapabilities() {
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
})();
//# sourceMappingURL=app.js.map
