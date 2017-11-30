
const numeral = require('numeral');

exports.registraNumeral = () => {
    numeral.register('locale', 'brasil', {
      delimiters: {
          thousands: '.',
          decimal: ','
      },
      abbreviations: {
          thousand: 'mil',
          million: 'milhões',
          billion: 'b',
          trillion: 't'
      },
      ordinal: function (number) {
          return 'º';
      },
      currency: {
          symbol: 'R$'
      }
  });    
  numeral.locale("brasil");
}