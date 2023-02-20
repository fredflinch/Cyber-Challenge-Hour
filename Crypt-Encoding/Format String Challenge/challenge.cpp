#include <iostream>
#include <string.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <stdlib.h>

int do_pwd(char* flag){
    char password [256];
    printf("Welcome\nPlease enter your password: ");
    scanf("%255s", password);
    char smsg[] = "Incorrect - ";
    strcat(smsg, password);
    printf(smsg); 
    printf(" is not correct\n");
    return 0;
}

void do_work(int sock){
    char* msg = "test";
    char buffer[256] = { 0 };
    int data = read(sock, buffer, 256);
    send(sock, msg, strlen(msg), 0);
    printf("send data and listen work!\n");
    close(sock);
    
}

int main(int argc, char *argv[]){
    struct sockaddr_in address;
    char flag[] = "CCH{FormatString}";
    printf("starting up...\n");
    int s = socket(AF_INET, SOCK_STREAM, 0);
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(1234);
    bind(s, (struct sockaddr*)&address, sizeof(address));
    listen(s, 16);
    int worker_socket = accept(s, (struct sockaddr*)&address, (socklen_t*)sizeof(address));
    
    do_work(worker_socket);
    
    printf("got to end!\n");
    shutdown(s, SHUT_RDWR);
}

