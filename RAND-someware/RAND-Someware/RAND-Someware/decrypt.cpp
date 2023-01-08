#include <iostream>
#include <fstream>
#include <windows.h>
#include <string>
#include <filesystem>
#include <algorithm>
#include <openssl/aes.h>
#include <openssl/evp.h>

const int BUFF_SIZE = 1024;

int dec(const unsigned char* key, const unsigned char* IV, std::string fname) {
    unsigned char buffer[BUFF_SIZE];
    unsigned char ciphertext[BUFF_SIZE];
    int len;

    std::ifstream f(fname, std::ios::binary);
    std::ofstream output_file(fname + ".dec", std::ios::binary);

    EVP_CIPHER_CTX* ctx = EVP_CIPHER_CTX_new();
    EVP_DecryptInit_ex(ctx, EVP_aes_256_cbc(), NULL, key, IV);

    while (f) {
        f.read((char*)buffer, BUFF_SIZE);
        int bread = f.gcount();
        EVP_DecryptUpdate(ctx, ciphertext, &len, buffer, bread);
        output_file.write((const char*)ciphertext, len);
    }

    EVP_DecryptFinal_ex(ctx, ciphertext, &len);
    output_file.write((const char*)ciphertext, len);

    EVP_CIPHER_CTX_free(ctx);
    f.close(); output_file.close();
    return 0;
}


//dec(key, IV, "C:\\Users\\Joseph\\Desktop\\Security\\CTFs\\Cyber Prevention Challenges\\Cyber-Challenge-Hour\\RAND-someware\\RAND-Someware\\RAND-Someware\\encrypt.txt");
