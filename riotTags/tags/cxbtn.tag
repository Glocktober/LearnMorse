console.log("cxb.js Riot tag © 2018 Gunville Software, all rights reserved");
<cxb>
 <div >
    <div class="t25"></div>
    <div class="t50">
        <div class="cxdisplay">
            <fla class=""></fla>
            <label class="mcode">&nbsp</label>
            <label class="mcode" onclick={showGlyph}>&nbsp;{letr}</label>
            <label class="mcode gcode">&nbsp;{glyph}</label>
            <label class="mcode">&nbsp</label>
        </div>
    </div>
<div class="buttonDiv" >
    <button each={letters} onclick={keyed} 
        ontouchdown={keyed}
        class={bright: bright, hide: hidden}
        disabled={disabled}>
        <span>{letter.toUpperCase()}</span> 
    </button>
</div>
<hr />
<style>

fla{
    pointer-events: none;
}

.mcode{
    font-weight: bolder;
    font-style: normal;
    color: black;
}
.buttonDiv button{
  width: 2.2em;
  height: 1.5em;
  border-radius: 5em;
  margin: 0.1em;
  outline: none;
}
.hide{
    display: none;
}
</style>

this.glyph = "   "
this.letr = " "
this.letters = []
this.letterIndex = {}
let indexLetters = function(letterIndex,letters,chars){
    for (let c of chars){
        let l = {letter: c, bright: false, 
                hidden: false, disabled: false,}
        letters.push(l)
        letterIndex[c] = l
    }
}
this.noGlyph = false;
indexLetters(this.letterIndex,this.letters,opts.letters)

keyed(e){
    this.trigger('keyPress',e.item.letter)
}
showGlyph(e){
    this.noGlyph = ! this.noGlyph
}
this.on('paintChar',(c)=> paintChar(c))
this.on('unpaintChar',(c)=> unpaintChar(c))

paintChar(c){
    this.letr = c.toUpperCase()
    this.shine(c,true)
    this.update()
}

unpaintChar(c){
    this.letr = " "
    this.shine(c,false)
    this.update()
}

paintGlyph(g){
    if (!this.noGlyph){
        this.glyph = g
        this.update()
    }
}

unpaintGlyph(g){
    this.glyph = " "
    this.update()
}

this.on('paintGlyph',(g)=> paintGlyph(g))

this.on('unpaintGlyph',(g)=>unpaintGlyph(g))

shine(c,fl){
    let l = this.letterIndex[c]
    if (l){
        l.bright=fl
        this.update()
    }
}

this.on('charStart',(c)=> shine(c,true))
this.on('charDone',(c)=> shine(c,false))

enableAll(){
    for (let l of this.letters) l.disabled = false
    this.update()
}

enableOnly(cset){
    for (let l of this.letters) l.disabled = true;
    for (let c of cset)
        this.letterIndex[c].disabled = false;
    this.update()
}

this.on('enableAll',()=> enableAll()) 
this.on('enableOnly',(cset)=> enableOnly(cset))

showAll(){
    for (let l of this.letters) l.hidden = false
    this.update()
}

this.on('showAll',()=> showAll())

this.on('showOnly',(cset)=> showOnly(cset))
showOnly(cset){
    for (let l of this.letters) l.hidden = true;
    for (let c of cset)
        this.letterIndex[c].hidden = false;
    this.update()
}
</cxb>