var length = 44000 / 440
var conv = 1 / 440
var sine = new Array(length)

var l = length

while(l--) {
  sine[l] = Math.sin(2*Math.PI*l/length)
}

module.exports = Voice

//make a thing that iterates through the circle.
//for a given frequency, many steps forward per sample?
//oh, it goes around the whole circle F times per second.

function Voice () {
  this.t = 0
  this.i = 0
  this._octave = 263.6 //middle C
  this._harmonic = 1
  this._pitch = 1
}

var v = Voice.prototype

//adjust the freq by a whole ratio.
//useful for FM synthesis
v.harmonic = function (h) {
  this._harmonic = h
  return this
}

//set the current octave
v.octave = function (o) {
  this._octave = ((o || 4) / 4) * 263.6 //middle C
  return this
}
//set the pitch, 12 tone equal temper semitone.
//decimals is okay.
var semitone = Math.pow(2, 1 / 12)

v.pitch = function (p) {
  //this will pick up floating point errors,
  //and probably sound off eventually...
  this._pitch = Math.pow(semitone, p)
  return this
}

v.sample = function () {
  this.t += (this._pitch * this._octave * this._harmonic * conv)
  this.t = this.t % length  
  return /*wavetable[this.waveform]*/ sine[Math.floor(this.t)]
}

v.trigger = function () {
  return this
}
