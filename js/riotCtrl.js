console.log("riotCtrl.js © 2018 Gunville Software, all rights reserved");

function flasher(){
    mk = new MorseKeyer()
    flashKeyer = riot.mount('fla',{id: 'mkey'})[0]
    this.setFreq = (f)=> mk.setFreq(f);
    this.setVol = (v)=> mk.setVol(v);
    // this.resume = ()=> mk.resume();
    
    this.keyIt= (dur)=> {
        flashKeyer.paddleDown()
        setTimeout( ()=> flashKeyer.paddleUp()
            ,dur)
        mk.keyIt(dur)
    }
    this.paddleDown = ()=> {
        flashKeyer.paddleDown()
        mk.paddleDown()
    }
    this.paddleUp = ()=> {
        flashKeyer.paddleUp()
        mk.paddleUp()
    }
    this.resume = ()=>{
        flashKeyer.resume && flashKeyer.resume()
        mk.resume()
    }
}