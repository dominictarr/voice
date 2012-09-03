var Voice = require('../voice')
var Env   = require('../envelope')
var Comp  = require('../composite')

var db = module.exports = 
new Comp(function (t, e) {
  return t.harmonic(e.sample()).sample()
}, [
  new Voice().octave(1)
, new Env(0, 0.5, 0, 2)
])

if(!module.parent)
  require('../util').play(db)

