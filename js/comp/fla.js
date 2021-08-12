console.log("fla.js Riot tag © 2018 Gunville Software, all rights reserved");
riot.tag2('fla', '<button id="{myid}" class="{ff}"> </button>', 'fla .paddleUp,[data-is="fla"] .paddleUp{ background-color: beige; } fla .paddleDown,[data-is="fla"] .paddleDown{ background-color: black; } fla button,[data-is="fla"] button{ font-size: 1.5em; width: 2.5em; height: 0.9em; border-radius: 0.5em; outline: none; }', 'class="fla"', function(opts) {


this.myid = opts.id;
this.ff = "fla paddleUp"
this.paddleDown = function(){
    this.ff="fla paddleDown"
    this.update()
}.bind(this)

this.paddleUp = function(){
    this.ff="fla paddleUp"
    this.update()
}.bind(this)

this.on('paddleDown',()=> this.paddleDown())
this.on('paddleUp',()=> this.paddleUp())

});