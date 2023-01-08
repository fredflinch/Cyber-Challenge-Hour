import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

public class main {
    public static void main(String[] args){
        byte[] flag_enc = new byte[] {71, -42, 91, 81, 43, 40, 69, 47, -87, 127, 4, -101, 34, 106, -93, 55};

        byte[] iv = new byte[] {1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16};
        byte[] enc_secret_key = new byte[] {0x2e,0x2a,0x20,0x21,0x3c,0x37,0x3b,0x3d,0x37,0x2c,0x24,0x37,0x21,0x7e,0x60,0x6b};
        byte[] xor_key = new byte[] {0x58,0x4f,0x52};

        XORer theXORer = new XORer(enc_secret_key, xor_key);
        byte[] key = theXORer.XORer();
        try {
            String output = decrypt(iv, key, flag_enc);
//            byte[] d = encrypt(iv, key);
//            for (int i = 0; i < d.length; i++){
//                System.out.print(d[i]);
//                System.out.print(", ");
//            }
            System.out.println(output);


        } catch (Exception a) {
            System.out.println(a);
        }
    }
    private static String decrypt(byte[] iv, byte[] key, byte[] encryptedData) throws Exception{
        IvParameterSpec InitVector = new IvParameterSpec(iv);
        Cipher aesCipher = Cipher.getInstance("AES/CBC/NoPadding");
        aesCipher.init(Cipher.DECRYPT_MODE, new SecretKeySpec(key, 0, key.length, "AES"), InitVector);
        byte[] out = aesCipher.doFinal(encryptedData);
        return new String(out);
    }
    private static byte[] encrypt(byte[] iv, byte[] key) throws Exception{
        String flag = "CCH{off_by_ones}";
        IvParameterSpec InitVector = new IvParameterSpec(iv);
        Cipher aesCipher = Cipher.getInstance("AES/CBC/NoPadding");
        aesCipher.init(Cipher.ENCRYPT_MODE, new SecretKeySpec(key, 0, key.length, "AES"), InitVector);
        byte[] out = aesCipher.doFinal(flag.getBytes());
        return out;
    }
}
