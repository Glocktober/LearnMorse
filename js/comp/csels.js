console.log("csels.js Riot tag © 2018 Gunville Software, all rights reserved");
riot.tag2('csels', '<select ref="csel" id="{name}" onchange="{optChanged}"> <option ref="prompt" disabled>{prompt}</option> <option each="{chars, opt in optSets}">{opt}</option> </select>', 'csels{ margin: auto; }', '', function(opts) {

this.name = opts.name ? opts.name : 'csels'
this.prompt = opts.prompt
this.class = opts.class
this.optSets = opts.optSets

this.optChanged = function(){
   let newOptVal = this.optSets[this.refs.csel.value]
   this.trigger('selectionChanged',newOptVal)
}.bind(this)
this.optSelect = function(selOpt){
   for (opt of this.refs.csel.options){
      if (opt.value == selOpt){
         this.refs.csel.selectedIndex = opt.index
         this.optChanged()
         break
      }
   }
}.bind(this)
});