var baudio = require('baudio');
var spawn = require('child_process').spawn;
var fs = require('fs')

var bd = require('./bd')
var sn = require('./snare')
var cb = require('./cow-bell')
var hh = require('./hi-hat')

var tones = 24
var tone = Math.pow(2, 1 / tones)

var Voice = require('../voice')
var Env   = require('../envelope')
var Comp  = require('../composite')

var c, d, a, b, sample

var notes = [
//  12,,12,,10,,12,,,,8,,,7,,,6,,,0,,3,,,,0
  [0,,,,3,,,,5]
, [,,0,,,,3,,,6,5]
, [0,,,,3,,,,5]
, [3,,,, 0]   
]

function overdrive (s, m) {
  return Math.min(
    Math.max(s, -1 * m)
  , m)
}

var length = Math.pow(2, Math.ceil(Math.pow(notes.length, 0.5))) * 16
var i = 0, p, b = 0
function next (i) {
  var bar = ~~(i / 16)
  var step = i - bar*16
  console.log('bar', bar, step, i)
  var b = notes[bar]
  if(b)
    return b[step]
}

function step () {
  var s = next(i++)
  if(i >= length)
    i = 0
  if(s != null) {
    comp.pitch(s).trigger()
  }
}




var hits = {
  bd: function (i) {
    return !(i % 4)
  }, //[1, , , , , , , , 9,,,,,,1,],
  sn: [,,,, 1 ,,,, ,,,, 1],
  hh: //[1,1,1,1,   , 1,1,1, 1,1,1, 1,1,,1,],
    function (i) {
      return true
      //return ! (i % 2) // && i % 4
    },
  cb: [,1, ,1, , ,9, , ,1, ,1]
}

var sounds = {
  hh: hh,
  bd: bd,
  sn: sn,
  cb: cb
}
var z = 0
function step(i) {
  for( var inst in sounds) {
    var h = hits[inst]
    if(h) {
      if('function' === typeof h && h(z) )
          sounds[inst].trigger()
      else if(h[z])
        sounds[inst].trigger()
    }
  }
  z ++
  if(z >= 16)
    z = 0
}

var tempo = 120, shuffel = 0.3
var _tempo = (60 / tempo) * 44000
var _shuffel = ((shuffel / 2) * _tempo / 2) + _tempo / 2
var n = 0, N = 0, beat = 0, onbeat = false, eight = false
var b = baudio({channels: 1},
  function (_, i) {
    /*
    if(!(i % 44000)) {
      onbeat = true
      //step()
      if(beat % 2)
        sn.trigger(), onbeat = false
      //else
        bd.trigger() 

      beat ++
    }
    if(!(i % 22000)) //step()
       hh.trigger(), (eight = !!!eight)
 
    if(!((i - 13000) % 22000)) //step()
        hh.trigger(), eight = false
    if(!((i - 13000) % 22000)) //step()
      onbeat && cb.trigger()
  */

    if(! (i % _tempo  )          ) step()
    if(!((i - _shuffel) % _tempo)) step()

  return (
    bd.sample() + sn.sample()
    + (hh.sample() + cb.sample())
    / 2)
  }
);

// to play:
var aplay = spawn('aplay',['-r','44k','-c','2','-f','S16_LE']);
b.pipe(aplay.stdin);

//b.pipe(fs.createWriteStream('raw'))

// to record:
// var sox = spawn('sox',['-r','44k','-c','2','-t','s16','-','-o','fm.ogg']);
// b.pipe(sox.stdin);

