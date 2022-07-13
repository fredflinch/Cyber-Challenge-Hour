function enc ($file) {
    if ($file -eq $null){ Write-Host "USAGE: ./enc.ps1 input_file"; }
    $fBytes = [System.IO.File]::ReadAllBytes($file);
    $oBytes = @();
    foreach ($b in $fBytes){
        $oBytes+=($b * 3239 + 29) % 256
    }
    [System.IO.File]::WriteAllBytes($file, $oBytes);
}
