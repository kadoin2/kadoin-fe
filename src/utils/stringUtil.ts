export const randomString = (length: number) => {
   var result = '';
   var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
const formatter = new Intl.NumberFormat('en-US', {
   style: 'currency',
   currency: 'IDR',

   // These options are needed to round to whole numbers if that's what you want.
   //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
   //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export const currencyNumber = (value: number) => {

   return formatter.format(value);
}
