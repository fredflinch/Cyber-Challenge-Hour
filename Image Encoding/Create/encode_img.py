import numpy as np
from PIL import Image 

# hardcoded parameters for file.zip, found with online factors calculator
IMG_WIDTH = 1068 
IMG_LEN   = 1817

def f2ca(fname):
    with open(fname, 'rb') as f:
        ba = f.read()
    iarr = [x for x in ba]
    return iarr

def encode(fname, ofile):
    a = f2ca(fname)
    d = np.array(a).reshape((IMG_WIDTH, IMG_LEN)).astype(np.uint8)
    print(d[0:10, 0:10])
    img = Image.fromarray(d, mode='L')
    img.save(ofile)
    

# save as PNG as it not lossy
encode('./file.zip', './image.png')

