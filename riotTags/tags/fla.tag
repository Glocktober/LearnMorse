console.log("fla.js Riot tag © 2018 Gunville Software, all rights reserved");
<fla class="fla" >
<button id={myid} class={ff} >

</button>

<style>
.paddleUp{
    background-color: beige;
}
.paddleDown{
    background-color: black;
}
button {
    font-size: 1.5em;
    width: 2.5em;
    height: 0.9em;
    border-radius: 0.5em;
    outline: none;
}
</style>

this.myid = opts.id;
this.ff = "fla paddleUp"
paddleDown(){
    this.ff="fla paddleDown"
    this.update()
}

paddleUp(){
    this.ff="fla paddleUp"
    this.update()
}

this.on('paddleDown',()=> this.paddleDown())
this.on('paddleUp',()=> this.paddleUp())

</fla>