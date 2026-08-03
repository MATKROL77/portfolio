# Genera public/cv/matias-colimodio-cv.pdf a partir de la ruta /cv del sitio.
# Requiere el servidor de desarrollo levantado (npm run dev).
#
# Uso:  npm run cv:pdf
param(
  [string]$Url = "http://localhost:3000/cv",
  [string]$Out = "public/cv/matias-colimodio-cv.pdf"
)

$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chrome)) {
  $chrome = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
}
if (-not (Test-Path $chrome)) {
  Write-Output "No se encontro Chrome ni Edge para generar el PDF."
  exit 1
}

# Chrome exige una ruta absoluta para --print-to-pdf
$root = Split-Path -Parent $PSScriptRoot
$Out = Join-Path $root $Out
$dir = Split-Path -Parent $Out
if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }

$profileDir = Join-Path $env:TEMP ("cvpdf-" + [guid]::NewGuid().ToString("N").Substring(0, 8))

& $chrome `
  --headless=new `
  --disable-gpu `
  --no-pdf-header-footer `
  --user-data-dir="$profileDir" `
  --virtual-time-budget=8000 `
  --print-to-pdf="$Out" `
  $Url | Out-Null

Start-Sleep -Milliseconds 300
try { Remove-Item -Recurse -Force $profileDir -ErrorAction Stop } catch {}

if (Test-Path $Out) {
  Write-Output ("ok " + $Out + " (" + (Get-Item $Out).Length + " bytes)")
} else {
  Write-Output "FALLO: no se genero el PDF. Verifica que el servidor este corriendo."
  exit 1
}
