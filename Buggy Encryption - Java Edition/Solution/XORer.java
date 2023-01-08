public class XORer {
  byte[] pt;
  
  byte[] key;
  
  public XORer(byte[] plainText, byte[] xor_key) {
    this.pt = plainText;
    this.key = xor_key;
  }
  
  public byte[] XORer() {
    byte[] output = new byte[this.pt.length];
    for (int i = 0; i < this.pt.length; i++)
      output[i] = (byte)(this.pt[i] ^ this.key[i % this.key.length]); 
    return output;
  }
}