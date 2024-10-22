import * as CryptoJS from 'crypto-js'


export class EncyptionDecryption{
  stringToBeHashed:string;
  EncryptedValue:any;
  tokenFromUI: string = "0123456789123456";
  encrypted: any = "";
  decrypted: string | undefined;
  request: string | undefined;
  responce: string | undefined;
    static decrypted: string;
  
  
     public static Encrypt(value: string): string {
         // let _key = CryptoJS.enc.Utf8.parse('0123456789123456');
         // let _iv = CryptoJS.enc.Utf8.parse('0123456789123456');
         let _key = CryptoJS.enc.Utf8.parse('37ZA3D89D64C115122DF9178C8R99c1x');
         let _iv = CryptoJS.enc.Utf8.parse('213A26DBB4A358C5');
         let encrypted = CryptoJS.AES.encrypt(value, _key, {
           iv: _iv,
           mode: CryptoJS.mode.CBC,
         }).toString().replace(/\//g,'s1L2a3S4h');
         return encrypted;
      
       }
      public static Decrypt(value: string): string {
        // let _key = CryptoJS.enc.Utf8.parse('0123456789123456');
        // let _iv = CryptoJS.enc.Utf8.parse('0123456789123456');
        let _key = CryptoJS.enc.Utf8.parse('37ZA3D89D64C115122DF9178C8R99c1x');
        let _iv = CryptoJS.enc.Utf8.parse('213A26DBB4A358C5');
        value=value.replace(/s1L2a3S4h/g, '/')
        let decrypt = CryptoJS.AES.decrypt(value, _key, {
          iv: _iv,
          mode: CryptoJS.mode.CBC,
        }).toString(CryptoJS.enc.Utf8);
        return decrypt;
      }
      
      //  SHAEncrypt(value:string){
      //   this.EncryptedValue = shajs('sha256').update(value).digest('hex');
      //    return this.EncryptedValue;
      //  }

      
     
}