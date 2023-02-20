import sys 
keyspace = {int(((x * 3239 + 29) % 256)):chr(x) for x in range(0x00, 0x7f)}
with open(sys.argv[1], 'rb') as f: file_in = f.read()
print(''.join([keyspace[int(i)] for i in file_in[2:]]))
