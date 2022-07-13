
function dec($file, $oFile){
    if ($file -eq $null){ Write-Host "USAGE: ./enc.ps1 input_file"; }
    $fBytes = [System.IO.File]::ReadAllBytes($file);
    $oBytes = @();
    foreach ($b in $fBytes){
        for ($i = 0; $i -lt 256; $i++){
            if (($i * 3239 + 29) % 256 -eq $b){
                $oBytes += $i;
                break; 
            }
        }
    }
    [System.IO.File]::WriteAllBytes($oFile, $oBytes);
}

