var Voice = require('../voice')
var Env   = require('../envelope')
var Comp  = require('../composite')

var sn = module.exports = 
new Comp(function (t, e) {
  var m = e.sample()
  return (
    t.harmonic(0.3 + m).sample() * m
    + Math.random() * m
  )
}, [ 
  new Voice().octave(2),
  new Env(0, 0.7, 0 , 4)
])

if(!module.parent)
  require('../util').play(sn)

