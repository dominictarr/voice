var Voice = require('../voice')
var Env   = require('../envelope')
var Comp  = require('../composite')

var hh = module.exports = 
new Comp(function (e) {
  return Math.random() * e.sample()
},[new Env(0, 0.2, 0, 4)])

if(!module.parent)
  require('../util').play(hh)

