console.log("voiceSyn.js © 2018 Gunville Software, all rights reserved");
//
// voice Sythesis class.
//
class voiceSyn {
    constructor(voice="Karen", message=" ") {
        this.syn = window.speechSynthesis

        this.voiceVol = 0.8
        this.selectedVoice = false
        this.selectedVoiceName = false

        // Load speaker voice when ready.
        let setKaren = (e) => {
            this.syn.onvoiceschanged = null
            this.setVoice(voice)
        }

        this.syn.onvoiceschanged = setKaren
        this.syn.getVoices()
    }

    setVoice(name="Karen") {
        if (this.selectedVoiceName == name)
            return this.selectedVoice

        const voices = this.syn.getVoices()
        if (voices.length) {
            const voiceList = voices.map((x) => x.name);
            let selectedVoice = voices.filter(function (voice) {
                return voice.name == name
            })[0]
            if (selectedVoice) {
                this.selectedVoice = selectedVoice
                this.selectedVoiceName = name
            }
        }
        return this.selectedVoice
    }

    resume(){
        if (window.speechSynthesis.paused)
            window.speechSynthesis.resume()
    }

    speak(word=" ", callBack) {

        let handleIt = (e) =>
            console.log("Speech Sythesis Error: " + e.error)

        let msg = new SpeechSynthesisUtterance(word)
        msg.onerror = handleIt
        if (callBack) 
            msg.onend = callBack
        msg.rate = 1.0
        msg.pitch = 1.0
        msg.volume = this.voiceVol

        if (this.selectedVoice) 
            msg.voice = this.selectedVoice
    
        this.syn.speak(msg)
    }

    speakW(word){
        return new Promise(resolve =>{
            // Timeout is to handle chrome bug
            // failing to call onend
            const t1 = setTimeout( ()=>{
                // Bug in chrome
                resolve(word)
            }, 5000)
            this.speak(word,()=> {
                clearTimeout(t1)
                resolve(word)
                
            })
        })
    }
}