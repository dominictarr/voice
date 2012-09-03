var Voice = require('../voice')
var Env   = require('../envelope')
var Comp  = require('../composite')

//!!! MORE COW-BELL !!!

var cb = module.exports = new Comp(function (c, m, e) {
  return (
    c.pitch(
      m.sample() * 48
    ).sample()
    * e.sample()
    * 0.5
  )
}, [
  new Voice().octave(4)
, new Voice().octave(4).harmonic(3)
, new Env(0, 0.3, 0, 4)
])


if(!module.parent)
  require('../util').play(cb)

