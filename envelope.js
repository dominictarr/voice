

module.exports = Envelope

//attack and decay in seconds (or beats ?)
function Envelope (atk, dcy, aGrad, dGrad) {
  this._atk = (atk || 0) * 44000
  this._dcy = (dcy || 1) * 44000
  this.aGrad = aGrad || 2
  this.dGrad = dGrad || aGrad || 2
  this._total = this._atk + this._dcy
  this.t = null
}

var e = Envelope.prototype

e.trigger = function () {
  this.t = 0
  return this
}

e.sample = function () {
  if(this.t == null) return 0
  this.t ++
  if(this.t > this._total)
    return 0
  return ( 
    this.t <= this._atk ? 
    Math.pow(this.t / this._atk, 1 / this.aGrad) : 
    Math.pow(1 - (this.t - this._atk) / this._dcy, this.dGrad)
  )
}

e.harmonic = e.pitch = e.octave = function () { return this }
