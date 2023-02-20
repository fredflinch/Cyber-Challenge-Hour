import java.io.IOException;

public class XORer {
    byte[] pt;
    byte[] key;
    public XORer(byte[] plainText, byte[] xor_key) {
        this.pt = plainText;
        this.key = xor_key;
    }

    public byte[] XORer(){
        byte[] output = new byte[pt.length];
        for (int i = 1; i < pt.length; i++){
            output[i] = (byte) (pt[i] ^ key[i % key.length]);
        }
        return output;
    }
}
