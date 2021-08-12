riot.tag2('csels', '<select id="{name}" onchange="{optChange}"> <option id="xxx" disabled selected>{prompt}</option> <option each="{chars, opt in optSets}">{opt}</option> </select>', 'csels{ margin: auto; }', '', function(opts) {

this.name = opts.name ? opts.name : 'csels'
this.prompt = opts.prompt
this.class = opts.class
this.optSets = opts.optSets

this.optChange = function(e){
   let newOptVal = this.optSets[e.target.value]
   this.trigger('newOption',newOptVal)
}.bind(this)
});