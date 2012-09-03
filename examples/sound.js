var Voice = require('../voice')
var Env   = require('../envelope')
var Comp  = require('../composite')

function overdrive (s, m) {
  return Math.min(
    Math.max(s, -1 * m)
  , m)
}


var comp = new Comp(function (c, e, d, amp, crr) {
  var a = amp.sample()
   return overdrive((
      c.harmonic(
        d.sample() 
        * crr.sample() 
        * 8
      ).sample()
      * a
    ), 0.7)
}, [
  c = new Voice().octave(1),
  e = new Voice().octave(1.5),
  d = new Voice().octave(0.5),
  amp = new Env(0.001, 3, 0, 1),
  crr = new Env(1, 3, 1)
])


if(!module.parent)
  require('../util').play(comp)

