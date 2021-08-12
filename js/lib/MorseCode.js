console.log("MorseCode.js © 2018 Gunville Software, all rights reserved");
//
// morseCodeTable = {}
// - Forward table of characters to glyphs.
//
let morseCodeTable = {
    // Numbers 
    "0": "-----",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",

    // Letters
    "a": ".-",
    "b": "-...",
    "c": "-.-.",
    "d": "-..",
    "e": ".",
    "f": "..-.",
    "g": "--.",
    "h": "....",
    "i": "..",
    "j": ".---",
    "k": "-.-",
    "l": ".-..",
    "m": "--",
    "n": "-.",
    "o": "---",
    "p": ".--.",
    "q": "--.-",
    "r": ".-.",
    "s": "...",
    "t": "-",
    "u": "..-",
    "v": "...-",
    "w": ".--",
    "x": "-..-",
    "y": "-.--",
    "z": "--..",

    // Additional letters
    'ä': ".-.-", 
    'á': ".--.-", 
    'é': "..-..", 
    'ñ': "--.--",
    'ö': "---.",
    'ü': "..--",

    // operators
    "+": ".-.-.",
    "-": "-....-",
    "=": "-...-",
    ".": ".-.-.-",
    "\/": "-..-.",
    "(": "-.--.",
    ")": "-.--.-",

    // punctuation
    ",": "--..--",
    "&": ".-...",
    "?": "..--..",
    "'": ".----.",
    "!": "---.",
    ":": "---...",
    ";": "-.-.-.",
    "_": "..--.-",
    "\"": ".-..-.",
    "$": "...-..-",
    "@": ".--.-.",
    "\n": ".-.-.."
  }
//
//  MoseCode()
//  -  encode and decode standard Morse Code
//
// char = morseCode.decode(glyph)
//  - given a glpyh, return its char.
//
// int = morseCode.sendDuration(glyph)
//  - given a glyph, return time it takes to send
//    at the current speed.
//

class MorseCode{
    constructor(){
        this.letterToGlyph = morseCodeTable
        this.glyphToLetter = {}
        for (var l in this.letterToGlyph)
            this.glyphToLetter[this.letterToGlyph[l]] = l
    }

    // morseCode.encode(char)
    // 
    // return Morse Code glyphs for char
    //
    encode(c){
        let val
        c = c.toLowerCase()
        if (c == " " ){
            val = " "  // This is space
        } else if( val =  this.letterToGlyph[c]){
        } else {
            val = this.letterToGlyph['?']
        }
        return val
     }

     // morseCode.decode(glyph)
     //
     // return character for the string of glyphs
     //
    decode(g){
        var val
        if (val = this.glyphToLetter[g]){
        } else  val = '??'
        return val
     }
}
