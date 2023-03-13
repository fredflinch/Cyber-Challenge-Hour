function Get-Sysmon($opath){
    $sysmon_url = "https://download.sysinternals.com/files/Sysmon.zip"
    $sos_url = "https://github.com/SwiftOnSecurity/sysmon-config/archive/refs/heads/master.zip"
    $wc = New-Object System.Net.WebClient
    $wc.DownloadFile($sysmon_url, "$opath\Sysmon.zip")
    $wc.DownloadFile($sos_url, "$opath\master.zip")
    Expand-Archive "$opath\Sysmon.zip" -DestinationPath "$opath\Sysmon"
    Expand-Archive "$opath\master.zip" -DestinationPath "$opath\master"
    "$opath\Sysmon\sysmon64.exe -accepteula -i $opath\master\sysmon-config-master\sysmonconfig-export.xml" | Invoke-Expression
}

function Add-LowPrivUser($uname, $pass){
    $p = ConvertTo-SecureString $pass -AsPlainText -Force
    New-LocalUser $uname -Password $p -FullName "Sing MalWardean" -AccountNeverExpires -PasswordNeverExpires
    Add-LocalGroupMember -Group "Remote Desktop Users" -Member $uname
}

function Get-7Zip($opath){
    # needs to be updated for new 7-Zip as required
    $7zurl = "https://www.7-zip.org/a/7z2201-x64.exe"
    $wc = New-Object System.Net.WebClient
    $wc.DownloadFile($7zurl, "$opath\7z.exe")
    "$opath\7z.exe" | Invoke-Expression
}

function Get-Wireshark($opath){
    # needs to be updated for new wireshark as required
    $WSurl = "https://1.as.dl.wireshark.org/win64/Wireshark-win64-4.0.2.exe"
    $wc = New-Object System.Net.WebClient
    $wc.DownloadFile($WSurl, "$opath\wireshark_installer.exe")
    "$opath\wireshark_installer.exe" | Invoke-Expression
}

function Get-NodeJS($opath){
    # needs to be updated for new wireshark as required
    $WSurl = "https://nodejs.org/dist/v18.12.1/node-v18.12.1-x64.msi"
    $wc = New-Object System.Net.WebClient
    $wc.DownloadFile($WSurl, "$opath\node.msi")
    "msiexec.exe /i $opath\node.msi" | Invoke-Expression
}

function setup($ofile){
    Get-Sysmon $ofile
    Get-7Zip $ofile
    Get-Wireshark $ofile
    Get-NodeJS $ofile
}


function Export-EVTLogs($opath){
    $basepath = "C:\Windows\System32\Winevt\Logs\"
    $logs = @('Microsoft-Windows-Sysmon%4Operational.evtx', 'Microsoft-Windows-PowerShell%4Operational.evtx', 'System.evtx', 'Security.evtx')
    foreach ($log in $logs){
        Copy-Item "$basepath$log" -Destination $opath
    }
}
function Start-PCAP($ofile){
    "C:\`"Program Files`"\Wireshark\tshark.exe -w $ofile" |  Invoke-Expression
}