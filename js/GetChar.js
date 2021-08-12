console.log("GetChar.js © 2018 Gunville Software, all rights reserved");

class GetChar{
    constructor(){
        // Whats to construct? a bunch of stuff to "this"?
    }

    getChar(timeOut){
        return new Promise((resolve, reject) =>{
            let timer
            const keyListener = e =>{
                    clearTimeout(timer)
                    // console.log(" hdl " + e.detail)
                    resolve(e.detail)
                }
            // setup charX handler
            document.addEventListener('charX', 
                        keyListener, {once: true})
            // set timeout
            timer = setTimeout( ()=>{
                // timed out - remove event handler and reject
                document.removeEventListener('charX', 
                            keyListener, {once: true})
                reject("Input Time Out")
            }, timeOut)
        })
    }

    waitForChar(timeOut){
        return new Promise( async (resolve, reject) => {
            let c
            try {
                c = await this.getChar(timeOut)
            } catch (err) {
                // console.log(err)
                if (err != 'Input Time Out')
                    throw(err)
            }      
            resolve(c)
        })
    }
    
    myKeyHandler(c){
        let ev = new CustomEvent('charX', {detail: c})
        document.dispatchEvent(ev)
    }

    setKBHandler(){
        keyHandlers.unshift(this.myKeyHandler)
    }

    clearKBHandler(){
        keyHandlers.shift()
    }   
}



