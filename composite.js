module.exports = Composite = 

function Composite (fun, children){ 
  this.children = children
  this.sample = function () {
    return fun.apply(this, this.children)
  }
}

var c = Composite.prototype

function applyTo(name) {
  c[name] = function (p) {
    var l = this.children.length
    while(l--)
      if(this.children[l][name]) 
        this.children[l][name](p)
    return this
  }
}

applyTo('pitch')
applyTo('harmonic')
applyTo('octave')
applyTo('trigger')

//trying to figure out whether these make a performance difference
/*
c.pitch = function (p) {
  var l = this.children.length
  while(l--)
  //  if(this.children[l].pitch) 
      this.children[l].pitch(p)
  return this
}

c.harmonic = function (p) {
  var l = this.children.length
  while(l--)
//    if(this.children[l].harmonic) 
      this.children[l].harmonic(p)
  return this
}

c.octave = function (p) {
  var l = this.children.length
  while(l--)
    //if(this.children[l].octave) 
      this.children[l].octave(p)
  return this
}

c.trigger = function (p) {
  var l = this.children.length
  while(l--)
    //if(this.children[l].trigger)
      this.children[l].trigger(p)
  return this
}
*/
