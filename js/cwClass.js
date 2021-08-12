console.log("cwSetup.js © 2018 Gunville Software, all rights reserved");
// cw control class
//
// coordinates voice and code
//

cwClass = function(keyerClass){
    // text to morse conversion:
    var codeTable = new MorseCode();

    this.getGlyph = c => codeTable.encode(c);

    // Code keyer
    var keyer = new keyerClass();
    this.keyer = keyer 
    this.cxFreq = hz => keyer.setFreq(hz)
    this.cxVol = vol => keyer.setVol(vol)
    
    // Keyer defaults
    this.cxFreq(500)
    this.cxVol(0.7)

    // Sender - cx
    var cx = new MorseSender(keyer, codeTable)
    this.cx = cx
    this.cxSpeed = (farn, spd) => cx.setSpeed(farn, spd)
    this.cxGetSpeed = ()=> cx.getSpeed()
    this.cxStartMorse = (txt, cb) => cx.startMorse(txt, cb)
    this.cxKey = txt => cx.startMorseW(txt)

    // Sender defaults
    this.cxSpeed(10,18)

    // Voice Synthisis - vx
    var vx = new synClass();
    this.vx = vx
    this.vxVol = vol => vx.setVoiceVol(vol)
    this.vxSay = (word, cb) => vx.speakWord(word, cb)
    this.vxVoice = voice => vx.setVoice(voice)
    this.vxSayChar = c => vx.speakLetterW(c)
    this.vxSayW = txt => vx.speakW(txt)

    // Voice defaults
    this.vxVol(0.7)
    this.vxVoice()

    this.resume = () => {
        vx.resume()
        keyer.resume()
    }
}