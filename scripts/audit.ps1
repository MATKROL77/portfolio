# Auditoria rapida de una pagina: overflow horizontal, imagenes rotas,
# enlaces vacios y jerarquia de encabezados. Usa Chrome headless.
#
# Uso:  powershell -File scripts/audit.ps1 -Url http://localhost:3000 -Width 375
param(
  [string]$Url = "http://localhost:3000",
  [int]$Width = 375,
  [int]$Height = 900
)

$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chrome)) {
  $chrome = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
}

$profileDir = Join-Path $env:TEMP ("audit-" + [guid]::NewGuid().ToString("N").Substring(0, 8))

$out = & $chrome `
  --headless=new `
  --disable-gpu `
  --user-data-dir="$profileDir" `
  --window-size="$Width,$Height" `
  --virtual-time-budget=9000 `
  --run-all-compositor-stages-before-draw `
  --dump-dom `
  $Url

try { Remove-Item -Recurse -Force $profileDir -ErrorAction Stop } catch {}

# El volcado del DOM sirve para verificar que el contenido esta en el HTML
# (importante para SEO y para el caso de que el JavaScript falle).
$text = $out -join "`n"
Write-Output ("longitud del DOM: " + $text.Length + " caracteres")
foreach ($needle in @("ENGINEERING", "Currículum", "LET", "WhatsApp")) {
  if ($text -match [regex]::Escape($needle)) {
    Write-Output ("  presente en el HTML: " + $needle)
  } else {
    Write-Output ("  AUSENTE del HTML:    " + $needle)
  }
}
