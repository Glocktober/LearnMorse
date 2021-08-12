console.log("MorseSender.js © 2018 Gunville Software, all rights reserved");
//
//  MorseSender
//  - send text as morse code
//  - uses "keyer" device (argument to constor)
//      - implementing paddleUp()/paddleDown()
//  - uses morseCode converter
//      - implementing encode(c)

// morseSender.startMorse(txt,callBack,thing)
//  - convert text to morse and send.
//  - run hook "callBack(thing)"" when done.

// morseSender.stopMorse()
//  - Stop sending morse/clear things up.

// morseSender.startGlyph(glpyh,callBack,thing)
//  - Send the glyph using keyer
//  - run hook "callBack(thing)"" when done.

// int = morseSender.sendDuration(glyph)
//  - given a glyph, return time it takes to send
//    at the current speed.

// morseSender.setSpeed(farns, speed)
//  -set the speed for letters (speed in WPM) or
//   for letter and word gaps (farns in WPM)

// morseSender constructor
//
// Initialize the morseSender object
//
MorseSender = function (keyer, morseTable) {

    let currentGlyph = "";
    let sendBuffer = "73"

    let curReq = undefined;
    let requestList = []

    let keyDown = ()=> keyer.paddleDown()
    let keyUp = () => keyer.paddleUp()
  
    // Speed and delay parameters
    let speedWPM = 18   // Speed of keying
    let farnsWPM = 10   // Farnsworth factor
    let tDot            // dot duration
    let tDash           // dash duration (3xdot)
    let tGap            // time gap between keyDowns           
    let tLetterGap      // time gap between letters
    let tWordGap        // time gap between words

    // morseSender.setSpeed(farns, speed)
    //  -set the speed for letters (speed in WPM) or
    //   for letter and word gaps (farns in WPM)
    //
    this.setSpeed = function (farns = 10, speed = 18) {
        if (farns == 0) farns = speed
        if (speed == 0) return
        speedWPM = speed
        farnsWPM = farns

        tDot = 60000 / (50 * speed)
        tFarns = 60000 / (50 * farns)
        tDash = 3 * tDot
        tGap = tDot
        tLetterGap = tFarns * 3
        tWordGap = tFarns * 6
    }
    // Set default speed to 10/18 Farnsworth
    this.setSpeed(farnsWPM, speedWPM);

    this.getSpeed = function(){
        return [farnsWPM,speedWPM]
    }
    //
    // key(duration)    [internal]
    //
    // Initiate a keyDown of duration length (mSec)
    // followed by a tGap length inter glyph gap
    //
    let key = (duration) => {
        keyDown()
        setTimeout(() => {
            keyUp();
            setTimeout(() => processGlyph(), tGap);
        }, duration);
    }

    this.dih = () => key(tDot)
    this.dah = () => key(tDash)

    // space(dur)    [internal]
    // Initiate a pause between letters.
    let space = (dur) => {
        setTimeout(() => nextChar(),
            dur);
    }

    // // space between concatenated glyphs
    // let gap = () => {
    //     setTimeout(() => processGlyph(),
    //         this.tLetterGap);
    // }

    // processGlyph()   [internal]
    //
    // Take the next element of the current glyph and initiate it
    //
    let processGlyph = function () {
        let g = currentGlyph[0];
        if (g) {
            currentGlyph = currentGlyph.slice(1,
                currentGlyph.length);
            if (g == '.') {        // dot
                key(tDot);
            } else if (g == '-') { // dash
                key(tDash);
            } else if (g == " ") { // Interword gap
                space(tWordGap);
            // } else if (g == "!") { // Inter glyph gap
            //     gap();
            } else {
                console.log("Invalid morse glyph: \"" + g + "\"");
                space(tWordGap);
            }
        } else {
            // end of the glyphs for this letter
            space(tLetterGap); // Intercharacter gap
        }
    }

    // nextChar()   [internal]
    //
    // Take next char from sendBuffer, encode to glyph, and prcess
    //
    let nextChar = function () {
        let c = sendBuffer[0];
    
        if (c) {
            sendBuffer = sendBuffer.slice(1, sendBuffer.length);
            currentGlyph = morseTable.encode(c);
            processGlyph();
        } else {
            curReq.cb && setTimeout(curReq.cb)
            // Get next request
            curReq = requestList.shift()
            if (curReq) {
                sendBuffer = curReq.txt
                setTimeout(nextChar,0)
            }
        }
    }

    // // morseSender.stopMorse()
    // //  - End the send - very unclean
    // this.stopMorse = function () {
    //     sendBuffer = "";
    //     requestList=[]; //???
    //     keyer.paddleUp();
    //     setTimeout(nextChar,0)
    // }

    // morseSender.startMorse(txt)
    //  - Start sending txt as morse code
    //
    let startMorse = function (txt, cb) {
        const newReq = {txt: txt, cb: cb}

        if (curReq) {
            requestList.push(newReq)
        } else {
            // Bootstrap
            curReq = newReq;
            sendBuffer = newReq.txt;
            setTimeout(nextChar);
        }
    }

    // This one returns a promise.
    this.startMorseW = function(c){
        return new Promise(resolve => {
            startMorse(c,()=>
            resolve(c))
        })
    }
}
