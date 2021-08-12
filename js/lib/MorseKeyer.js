console.log("newKeyer.js © 2018 Gunville Software, all rights reserved");
//
// MorseKeyer.
//
// This implements a morse paddle keyer symantic using Audio oscillator
//
// MorseKeyer.paddleDown()
//      - Key down/emit tone
//
// MorseKeyer.paddleUp()
//      - Paddle Up/cease tone
//
// MorseKeyer.setFreq(int hz)
//      - Set oscillator tone (bfo) 
//      - 20 to 2000 hz, 432 hz default
//
// MorseKeyer.setVol(float volume)
//      - Set oscillator volume
//      - 0.0 to 1.0, default 0.5
//
class MorseKeyer {
    constructor(){
        // create the broser Audio output connection.
        this.ctx = new (window.AudioContext || window.webkitAudioContext)()
        // this.ctx.suspend()

        // create the gain node and oscillator connection.
        this.gainNode = this.ctx.createGain ?
                this.ctx.createGain() :
                this.createGainNode();
        this.gainNode.connect(this.ctx.destination)
        this.toneFreq = 432
        this.gain = 0.5
        this.gainNode.gain.setTargetAtTime(this.gain,this.ctx.currentTime,2)

    }
    
    // 
    // MorseKeyer.setFreq(int hz)
    // - set bfo (between 200 and 2000 hz)
    //
    setFreq(hz=443){
        //test range?
        if ((hz <= 2000) && (hz >= 200))
                this.toneFreq = hz
    }
    
    resume(){
        this.ctx.state == "suspended" ? this.ctx.resume() : true;
        
    }
    
    // 
    // MorseKeyer.setVol(float vol)
    // - set oscillator gain - float between 0.0 (0%) and 1.0 (100%)
    //
    setVol(vol=0.8){
        if ((vol<=1) && (vol>=0)){
            this.gain = vol
            this.gainNode.gain.setTargetAtTime(vol,this.ctx.currentTime,2)
        }
    }

    //
    // MorseKeyer.paddleDown()
    //  - connect oscillator/gainNode to audio out
    //
    paddleDown(){
        this.osc = this.ctx.createOscillator()
        let osc = this.osc
        osc.frequency.setValueAtTime(this.toneFreq,this.ctx.currentTime)
        osc.connect(this.gainNode)
        osc.start(this.ctx.currentTime)
    }

    // 
    // MorseKeyer.paddleUp()
    // - Disconnect oscillator/gainNode from audio out
    //
    paddleUp(){
        this.osc.stop(this.ctx.currentTime)
    }
}