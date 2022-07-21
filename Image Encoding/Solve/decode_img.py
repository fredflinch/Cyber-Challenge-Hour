import numpy as np
from PIL import Image 

IMG_WIDTH = 1068 
IMG_LEN   = 1817

def decode(fname, ofname):
    img = Image.open(fname)
    dat = np.asarray(img) 
  
    dat = dat.flatten(order='C').tobytes()
    img.close()
    with open(ofname, 'wb') as f:
        f.write(dat)

a = decode('image.png', './decode.zip')




