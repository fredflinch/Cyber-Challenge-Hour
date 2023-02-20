import subprocess
import string

charList = list(string.ascii_letters + string.digits + "{" + "}" + "_")
flag = ""
loop = True
while loop:
    for x in charList:
        pt = flag + x
        output = subprocess.getoutput('.\enc.exe '+pt)
        if output[-3:-1] == "00":
            flag += x
            if x=="}": loop = False
            break
print(flag)