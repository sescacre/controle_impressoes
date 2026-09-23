// Libera a porta do dev server antes de subir o esbuild. Necessário porque
// interromper `npm run dev` sem Ctrl+C (ex.: fechando a janela do terminal)
// deixa o esbuild.exe órfão segurando a porta no Windows, e o próximo
// `npm run dev` falha com "Only one usage of each socket address...".
const { execSync } = require('child_process');

const port = process.argv[2] || '8080';

try {
  const output = execSync(
    `powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort ${port} -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess"`,
    { encoding: 'utf8' },
  ).trim();

  const pids = [...new Set(output.split(/\s+/).filter(Boolean))];
  for (const pid of pids) {
    try {
      execSync(`powershell -NoProfile -Command "Stop-Process -Id ${pid} -Force"`);
      console.log(`[free-port] porta ${port} liberada (encerrado PID ${pid})`);
    } catch {
      // processo pode já ter encerrado entre a consulta e o Stop-Process
    }
  }
} catch {
  // sem PowerShell disponível (ex.: CI/outro SO) ou porta já livre: segue sem travar o dev
}
