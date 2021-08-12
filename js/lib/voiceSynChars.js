console.log("voiceSynChars.js © 2018 Gunville Software, all rights reserved");
//
// voice sythesize characters
//
class voiceSynChars extends voiceSyn {
    constructor(speaker,message) {
        super(speaker,message)
        
        const genTable = function () {
            const alphabet = "äáéñöüabcdefghijklmnopqrstuvwxyz0123456789+-=./(),&?'!:;_\"$@#";
            var x = {};
            const alpha = alphabet.split("");
            let letter
            while (letter = alpha.shift()) { x[letter] = letter; }
            // These are characters that require a vocal description 
            // but are either blank (ignored) or not to our purpose
            x['@'] = 'at sign';
            x['+'] = 'plus';
            x['='] = 'equals';
            x['*'] = 'asterisk';
            x['-'] = 'minus';
            x['.'] = 'period';
            x[','] = 'comma';
            x[':'] = 'colon';
            x[';'] = 'semicolon';
            x['?'] = 'question mark';
            x["'"] = 'single quote';
            x['"'] = 'quote';
            x['!'] = 'bang';
            x['\\'] = 'backslash';
            x['/'] = 'slash';
            x['#'] = 'hash';
            x['_'] = 'underscore';
            x['`'] = 'backslash';
            x['~'] = 'tilda';
            x['('] = 'left paren';
            x[')'] = 'right paren';
            x['['] = 'left bracket';
            x[']'] = 'right bracket';
            x['{'] = 'left brace';
            x['}'] = 'right brace';
            return x;
        }
        const charTable = genTable();

        this.speakLetter = (l, cbk)=>
            this.speak(charTable[l.toLowerCase()], cbk);

        this.speakWord = this.speak
    }

    setVoiceVol(vol){
        this.voiceVol = vol;
    }

    speakLetterW(c){
        return new Promise(resolve =>{
            const t1 = setTimeout( ()=>{
                // Bug in chrome onend
                console.log("timeout resolve",c)
                    resolve(c)
                }, 2000)
            this.speakLetter(c, ()=> {
                clearTimeout(t1)
                resolve(c)
            })
        })
    }
    
}
// Legacy compatibile name
class synClass extends voiceSynChars{}
