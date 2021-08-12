console.log("splash.js Riot tag © 2018 Gunville Software, all rights reserved");
<splash>
<div ref="splash" id="splashScreen" class="splash" >
    <div ref="mesg" class="splashMsg">
        <h1></h1>
        <center><h2>{this.opts.title}</h2></center>
        <center><h3>{this.opts.copyright}</h3></center>
        <center><h2>Tap to continue</h2></center>
        <h1></h1>
    </div>
</div>
<style>
.splash{
    position:fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: aliceblue;
    opacity: 0.8;
    z-index:99999;
}
.splashMsg{
    width: 50%;
    position: relative;
    left: 25%;
    top: 15%;
    border-radius: 1em;
    padding: 0.5em;
    background: skyblue;
}
</style>
if (! this.opts.title) this.opts.title = document.title
if (! this.opts.copyright)  this.opts.copyright = "© 2018 Gunville Software"
retireSplash(){
    this.trigger("splashRetired")
    this.opts.onretire && this.opts.onretire()
    this.refs.splash.style.display = "none"
}
this.on("mount",()=>{
    this.refs.splash.addEventListener("click", this.retireSplash)
    this.refs.splash.addEventListener("touchend", this.retireSplash)
})
</splash>