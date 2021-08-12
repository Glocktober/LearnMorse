console.log("keyHandler.js © 2018 Gunville Software, all rights reserved");

var getJunkKeyCodes = function(){
    let c
    let keyJunk={}
    let ignoreKeyCodes = [' ', '\\', 'Shift', 'Enter', 
        'ArrowRight','ArrowLeft','ArrowUp','ArrowDown',
        'AltRight', 'MetaRight', 'Alt', 'Meta', 'Control',
        'Escape', 
        'Backspace', 'CapsLock', 'Tab', '%', '<', '>',
        '`', '~','^','[',']', '{', '}','|','$','#', '*',
        'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 
        'F9', 'F10', 'F11', 'F12']

    while(c = ignoreKeyCodes.shift())
        keyJunk[c] = true

    return keyJunk;
}
keyJunk = getJunkKeyCodes()

let keyIgnore = function(){}
var keyHandlers = [keyIgnore]

let keyStillDown = false

keyHandler = (e)=>{
    let k = e.key

    k = (k=="Enter") ? "\n" : k 

    if (!keyJunk[k] && keyHandlers.length){
        e.preventDefault()
        keyHandlers[0](k.toLowerCase())
    }
}

keyUpHandler = e => keyStillDown = false

document.addEventListener("keydown",keyHandler)
document.addEventListener("keyup",keyUpHandler)
