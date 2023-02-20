//gcc -static -o enc.exe .\src\encrypter.cpp -lstdc++ -static-libstdc++

#include <stdio.h>
#include <windows.h>

using namespace std;

int main(int argc, char *argv[]){
    if (argc < 2){
        printf("USAGE: enc.exe inStr\n");
        return 1;
    }
    char *inData = argv[1];
    size_t inDataSize = strlen(inData);
    char key[] = "CCH{Pr0t3ct0r_0f_t3h_Pl4int3xt}";
    size_t key_size = sizeof(key);
    char outBuff[inDataSize];
    for (int i = 0; i < (inDataSize); i++){
        outBuff[i] = key[i % key_size] ^ inData[i];
        printf("%02x ", outBuff[i]);
    }

    return 0;    
}

