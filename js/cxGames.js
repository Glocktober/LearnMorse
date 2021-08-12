console.log("cxGames.js © 2018 Gunville Software, all rights reserved");

allCharSets ={};
resetChars = () => {
    allCharSets.letters = "abcdefghijklmnopqrstuvwxyz";
    allCharSets.numbers = "0123456789";
    allCharSets.specials = "+-=.\/(),&?&?'!:;_\"@";
    allCharSets.euroletters = "äáéñöü";
    allCharSets.all = allCharSets.letters + 
            allCharSets.numbers + 
            allCharSets.specials 
             + allCharSets.euroletters
}
charSetList = Object.keys(allCharSets)
resetChars()
charSet = allCharSets.letters + allCharSets.numbers
// charSet = allCharSets.all

delayMS = function(ms){
    return new Promise(resolve =>{
        setTimeout(()=>
            resolve(), ms)
    })
}

randomChar = function(){
    const rand = Math.floor(Math.random() 
                    * cset.length)
    return cset[rand]
}
// CXgame() 
//
// Game framework
//
class CXgame {
    constructor(){
        this.running = false
    }
    
    run(){
        // Button pressed to start/stop game.
        this.running = ! this.running
        if (this.running) {
            this.beginGame()
            this.runGame()
        } 
    }

    beginGame(){
        if (runningGame) {
            this.running = false
            return
        }
        runningGame = this
        keyHandlers.unshift(keyIgnore);
    }   

    // Override with game logic
    runGame(){}  

    endGame(){
        keyHandlers.shift()
        runningGame = undefined
        cw.vxSay("Game over")
    }
}

class G1 extends CXgame{
    // paint both char and glyph
    // speak the character
    // wait 1sec send code
    // wait 1sec unpaint code and glyph
    async runGame(){ 
        await delayMS(1000)
        while(this.running){
            const c = randomChar()
            const g = cw.getGlyph(c)

            kbb.paintGlyph(g)
            kbb.paintChar(c)
            await cw.vxSayChar(c)
            await delayMS(500)
            await cw.cxKey(c)
            await delayMS(500)
            kbb.unpaintGlyph(g)
            kbb.unpaintChar(c)
            await delayMS(500)
        }
        this.endGame()      
    }
}

class G2 extends CXgame{
    async runGame(){ 
        await delayMS(1000)
        while(this.running){
            const c = randomChar()
            const g = cw.getGlyph(c)
            // paint both char and glyph
            // speak the character
            // wait 1sec send code
            // wait 1sec unpaint code and glyph
            kbb.paintGlyph(g)
            kbb.paintChar(c)
            await cw.vxSayChar(c)
            await delayMS(500)
            await cw.cxKey(c)
            await delayMS(500)
            kbb.unpaintGlyph(g)
            kbb.unpaintChar(c)
            await delayMS(500)
        }
        this.endGame()      
    }
}

class G3 extends CXgame{
    async runGame(){
        await delayMS(1000)
        while (this.running){
            // Select random character.
            const c = randomChar()
            const g = cw.getGlyph(c)
            // sound it
            await cw.cxKey(c)
            // show glyph
            kbb.paintGlyph(g)
            await delayMS(2000)
            // reveal it
            kbb.paintChar(c)
            await cw.vxSayChar(c)
            await delayMS(500)
            kbb.unpaintChar(c)
            kbb.unpaintGlyph(g)
        }
        this.endGame()
    }
}

class G4 extends CXgame{
    async correctAnswer(c, g, ans){
        return new Promise( async function(resolve){
            kbb.paintChar(c)
            kbb.paintGlyph(g)
            await cw.vxSayChar(ans)
            await cw.vxSayW( "is correct!")
            await delayMS(500)
            kbb.unpaintChar(c)
            kbb.unpaintGlyph(g)
            resolve(c)
        })
    }

    async incorrectAnswer(c,g,ans,fl){
        return new Promise(async function(resolve){
            await cw.vxSayW("Sorry,")
            await cw.vxSayChar(ans)
            await cw.vxSayW(" is incorrect. The letter is")
            kbb.paintChar(c)
            kbb.paintGlyph(g)
            await cw.vxSayChar(c)
            await cw.vxSayW("It keys as ")
            await cw.cxKey(c)
            await cw.vxSayChar(c)
            await cw.cxKey(c)
            await delayMS(250)
            kbb.unpaintChar(c)
            kbb.unpaintGlyph(g)
            resolve(c)
        })
    }
    async noResponse(c,g,ans){
        return new Promise(async function(resolve){
            kbb.paintChar(c)
            kbb.paintGlyph(g)
            await cw.vxSayW("That was " )
            await cw.vxSayChar(c)
            kbb.unpaintChar(c)
            kbb.unpaintGlyph(g)
            resolve(c)
        })
    }

    async runGame(){
        kb.setKBHandler()
        let noResponseCount = 0
        const introText = "Listen to the keyed morris code, and select the matching letter."
        await delayMS(500)
        await cw.vxSayW(introText)
        await delayMS(500)
        while (this.running){
            // Select random character.
            const c = randomChar()
            const g = cw.getGlyph(c)
            // sound it
            await cw.cxKey(c)
            let ans = await kb.waitForChar(4000)
            if (!this.running){}
            else if (ans == c){
                noResponseCount = 0
                await this.correctAnswer(c,g,ans)
                if (this.running)
                    await cw.vxSayW("next!")
            } else if (ans != undefined) {
                noResponseCount = 0
                await this.incorrectAnswer(c,g,ans) 
                if (this.running)
                    await cw.vxSayW("lets try another letter!") 
            } else {
                // No response (timed out)
                this.noResponseCount++
                await this.noResponse(c,g,ans)
                // no response for more than 5 times? quit
                if (++noResponseCount >= 5) {
                    this.running = false
                    await cw.vxSayW ("You're not responding...")
                } else if (this.running){
                    await cw.vxSayW( ", lets try another!")
                    await delayMS(400)
                }
            }
        }
        kb.clearKBHandler()
        this.endGame()
    }
}


class G5 extends CXgame{
    async correctAnswer(c, g, ans){
        return new Promise( async function(resolve){
            kbb.paintChar(c)
            kbb.paintGlyph(g)
            await cw.vxSayChar(ans)
            await cw.vxSayW( "is correct!")
            await delayMS(100)
            kbb.unpaintChar(c)
            kbb.unpaintGlyph(g)
            resolve(c)
        })
    }

    async incorrectAnswer(c,g,ans,fl){
        return new Promise(async function(resolve){
            kbb.paintChar(c)
            kbb.paintGlyph(g)
            await cw.vxSayW("Incorrect, the letter is")
            await cw.vxSayChar(c)
            await delayMS(150)
            kbb.unpaintChar(c)
            kbb.unpaintGlyph(g)
            resolve(c)
        })
    }
    async noResponse(c,g,ans){
        return new Promise(async function(resolve){
            kbb.paintChar(c)
            kbb.paintGlyph(g)
            await cw.vxSayW("That was " )
            await cw.vxSayChar(c)
            kbb.unpaintChar(c)
            kbb.unpaintGlyph(g)
            resolve(c)
        })
    }

    async runGame(){
        kb.setKBHandler()
        let noResponseCount = 0
        const introText = "Listen to the keyed morris code, and select the matching letter."
        await delayMS(500)
        await cw.vxSayW(introText)
        await delayMS(900)
        while (this.running){
            // Select random character.
            const c = randomChar()
            const g = cw.getGlyph(c)
            
            // sound it
            await cw.cxKey(c)
            let ans = await kb.waitForChar(4000)
            if (!this.running){} // short cut on end
            else if (ans == c){
                noResponseCount = 0
                await this.correctAnswer(c,g,ans)
            } else if (ans != undefined) {
                noResponseCount = 0
                await this.incorrectAnswer(c,g,ans) 
            } else {
                // No response (timed out)
                this.noResponseCount++
                await this.noResponse(c,g,ans)
                // no response for more than 5 times? quit
                if (++noResponseCount >= 5) {
                    this.running = false
                    await cw.vxSayW ("You're not responding...")
                }
            }
        }
        kb.clearKBHandler()
        this.endGame()
    }
}

class G6 extends CXgame{
    //
    // Key it before saying it
    //
    // 1. select randomChar
    // 2. key it
    // 3. delay
    // 4. key it again
    // 5. wait a bit 
    // 6. paint it
    // 7. say the character
    // 8. key it again
    // 9. unpaint it
    // 10. delay 1.7 Sec
    // 
    async runGame(){ 
        await delayMS(1000)
        const origFlag = kbb.noGlyph
        kbb.noGlyph = false;
        while(this.running){
            const c = randomChar()
            const g = cw.getGlyph(c)
            await cw.cxKey(c)
            await delayMS(950)
            await cw.cxKey(c)
            await delayMS(950)
            kbb.paintGlyph(g)
            kbb.paintChar(c)
            await cw.vxSayChar(c)
            await delayMS(200)
            await cw.cxKey(c)
            await delayMS(200)
            kbb.unpaintGlyph(g)
            kbb.unpaintChar(c)
            await delayMS(1700)
        }
        kbb.noGlyph = origFlag
        this.endGame()      
    }
}

class G7 extends CXgame{
    // Speed increases; 16/20/24 WPM
    // no Glyph displayed
    //
    // 1. select char
    // 2. key it at 16 WPM
    // 3. delay
    // 4. key it at 20 WPM
    // 5. delay
    // 6. paint it
    // 7. say the character
    // 8. key it at 24 WPM
    // 9. slight delay
    // 10. say it again
    // 11. key it again at 24 WPM
    // 12. unpaint it
    // 13. delay 1.7 Sec
    // 
    async runGame(){ 
        await delayMS(1400)
        const origSpeed = cw.cxGetSpeed()
        const stepSpeed1 = [10,16]
        const stepSpeed2 = [10,20]
        const stepSpeed3 = [10,24]
        kbb.noGlyph = true;
        while(this.running){
            const c = randomChar()
            const g = cw.getGlyph(c)
            cw.cxSpeed(...stepSpeed1)
            await cw.cxKey(c)
            await delayMS(950)
            cw.cxSpeed(...stepSpeed2)
            await cw.cxKey(c)
            await delayMS(950)
            kbb.paintChar(c)
            cw.cxSpeed(...stepSpeed3)
            await cw.vxSayChar(c)
            await delayMS(100)
            await cw.cxKey(c)
            await delayMS(200)
            await cw.vxSayChar(c)
            await cw.cxKey(c)
            await delayMS(200)
            kbb.unpaintChar(c)
            await delayMS(1700)
        }
        cw.cxSpeed(...origSpeed)
        this.endGame()      
    }
}