var checkWordLib = require('check-word');
var words = checkWordLib('en');

module.exports.genLetters = (amt) => {
    // regex is scary var output = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 2);
    //console.log(`[TEXT] ${output}`);

    var output = "";
    var possible = "ABCDEFGHIKLMNOPRSTUVW";
  
    for (var i = 0; i < amt; i++)
      output += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return output.toUpperCase();
};

module.exports.checkWord = (word) => {
  return words.check(word);
};