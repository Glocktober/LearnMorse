console.log("unmute.js Riot tag © 2018 Gunville Software, all rights reserved");
riot.tag2('unmute', '<div ref="cover" class="cover"> <div> <svg viewbox="0 0 261.018 261.018" enable-background="new 0 0 261.018 261.018"> <g><path d="m258.408,246.662l-52.204-52.204v-36.543h8.701c13.921,0 26.102-12.181 26.102-26.102v-5.22c0-13.921-12.181-26.102-26.102-26.102h-8.701v-71.344c0-13.921-12.181-26.102-26.102-26.102-5.22, 0-10.441,1.74-15.661,5.22l-79.523,64.907-70.127-70.127c-3.48-3.48-8.701-3.48-12.181-1.77636e-15s-3.48,8.701 0,12.181l60.904,60.904h-33.062c-5.22,0-8.701,3.48-8.701,8.701v92.226c0,5.22 3.48,8.701 8.701,8.701h50.846l83.143,67.865c3.48,3.48 10.441,5.22 15.661,5.22 13.921,0 26.102-12.181 26.102-24.362v-15.661l40.023,40.023c1.74,1.74 5.22,1.74 6.96,1.74 1.74,0 5.22,0 5.22-1.74 3.481-3.48 3.481-8.7 0.001-12.181zm-43.503-128.768c5.22,0 8.701,3.48 8.701,8.701v5.22c0,5.22-3.48,8.701-8.701,8.701h-8.701v-22.621h8.701zm-41.763-97.448c5.22-3.48 13.921-1.74 13.921,6.96v147.91l-90.956-90.956 77.035-63.914zm-99.187, 147.91h-34.802v-74.825h34.802v74.825zm113.108,64.385c0,8.701-8.701, 10.441-13.921,6.96l-81.786-67.865v-67.865l95.707,95.707v33.063z"></path> </g> </svg> <p>Press to Continue</p> </div> </div>', 'unmute .cover,[data-is="unmute"] .cover{ position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 1; } unmute .cover div,[data-is="unmute"] .cover div{ width: 20%; padding: 1%; position: relative; top: 20%; left: 40%; text-align: center; font-size: 2em; } unmute .cover svg,[data-is="unmute"] .cover svg{ width: 50%; height: 50%; } unmute .cover p,[data-is="unmute"] .cover p{ margin: 0px; font-weight: bold; }', '', function(opts) {

this.unMute = opts.unMute
this.allDone = function(e){
    e.preventDefault()
    this.refs.cover.style.visibility = "hidden"
    this.unMute && this.unMute()
    this.trigger("alldone")
}.bind(this)
this.wasClicked = function(e){
    opts.mode = "click"
    this.allDone(e)
}.bind(this)
this.wasTouched = function(e){
    opts.mode = "touch"
    this.allDone(e)
}.bind(this)
this.on("mount",()=>{
    this.refs.cover.addEventListener("touchstart",
            this.wasTouched, {passive:false, once: true})
    this.refs.cover.addEventListener("click",
            this.wasClicked, {once: true})
})
});