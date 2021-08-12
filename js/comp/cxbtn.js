console.log("cxb.js Riot tag © 2018 Gunville Software, all rights reserved");
riot.tag2('cxb', '<div> <div class="t25"></div> <div class="t50"> <div class="cxdisplay"> <fla class=""></fla> <label class="mcode">&nbsp</label> <label class="mcode" onclick="{showGlyph}">&nbsp;{letr}</label> <label class="mcode gcode">&nbsp;{glyph}</label> <label class="mcode">&nbsp</label> </div> </div> <div class="buttonDiv"> <button each="{letters}" onclick="{keyed}" ontouchdown="{keyed}" class="{bright: bright, hide: hidden}" disabled="{disabled}"> {letter.toUpperCase()} </button> </div> <hr>', 'cxb fla,[data-is="cxb"] fla{ pointer-events: none; } cxb .mcode,[data-is="cxb"] .mcode{ font-weight: bolder; font-style: normal; color: black; } cxb .buttonDiv button,[data-is="cxb"] .buttonDiv button{ width: 3em; height: 2em; border-radius: 5em; margin-right: 0.4em; margin-top: 0.4em; outline: none; } cxb .hide,[data-is="cxb"] .hide{ display: none; }', '', function(opts) {


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

this.keyed = function(e){
    this.trigger('keyPress',e.item.letter)
}.bind(this)
this.showGlyph = function(e){
    this.noGlyph = ! this.noGlyph
}.bind(this)
this.on('paintChar',(c)=> paintChar(c))
this.on('unpaintChar',(c)=> unpaintChar(c))

this.paintChar = function(c){
    this.letr = c.toUpperCase()
    this.shine(c,true)
    this.update()
}.bind(this)

this.unpaintChar = function(c){
    this.letr = " "
    this.shine(c,false)
    this.update()
}.bind(this)

this.paintGlyph = function(g){
    if (!this.noGlyph){
        this.glyph = g
        this.update()
    }
}.bind(this)

this.unpaintGlyph = function(g){
    this.glyph = " "
    this.update()
}.bind(this)

this.on('paintGlyph',(g)=> paintGlyph(g))

this.on('unpaintGlyph',(g)=>unpaintGlyph(g))

this.shine = function(c,fl){
    let l = this.letterIndex[c]
    if (l){
        l.bright=fl
        this.update()
    }
}.bind(this)

this.on('charStart',(c)=> shine(c,true))
this.on('charDone',(c)=> shine(c,false))

this.enableAll = function(){
    for (let l of this.letters) l.disabled = false
    this.update()
}.bind(this)

this.enableOnly = function(cset){
    for (let l of this.letters) l.disabled = true;
    for (let c of cset)
        this.letterIndex[c].disabled = false;
    this.update()
}.bind(this)

this.on('enableAll',()=> enableAll())
this.on('enableOnly',(cset)=> enableOnly(cset))

this.showAll = function(){
    for (let l of this.letters) l.hidden = false
    this.update()
}.bind(this)

this.on('showAll',()=> showAll())

this.on('showOnly',(cset)=> showOnly(cset))
this.showOnly = function(cset){
    for (let l of this.letters) l.hidden = true;
    for (let c of cset)
        this.letterIndex[c].hidden = false;
    this.update()
}.bind(this)
});