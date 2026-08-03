# Captura de pantalla para QA visual, usando el Chrome ya instalado.
# Uso:  powershell -File scripts/shot.ps1 -Url http://localhost:3000 -Out shot.png -Width 1440 -Height 900
param(
  [string]$Url = "http://localhost:3000",
  [string]$Out = "shot.png",
  [int]$Width = 1440,
  [int]$Height = 900,
  [int]$Delay = 2500
)

$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chrome)) {
  $chrome = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
}

$profileDir = Join-Path $env:TEMP ("shot-profile-" + [guid]::NewGuid().ToString("N").Substring(0,8))

& $chrome `
  --headless=new `
  --disable-gpu `
  --hide-scrollbars `
  --force-color-profile=srgb `
  --user-data-dir="$profileDir" `
  --virtual-time-budget=$Delay `
  --window-size="$Width,$Height" `
  --screenshot="$Out" `
  $Url | Out-Null

Start-Sleep -Milliseconds 300
try { Remove-Item -Recurse -Force $profileDir -ErrorAction Stop } catch {}

if (Test-Path $Out) {
  $size = (Get-Item $Out).Length
  Write-Output "ok $Out ($size bytes)"
} else {
  Write-Output "FALLO: no se generó $Out"
}
