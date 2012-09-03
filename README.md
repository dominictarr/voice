# Voice

Generate musical voices with FM synthesis.

### example

``` js

var Voice = require('../voice')
var Env   = require('../envelope')
var Comp  = require('../composite')
var ae, ce

var comp = new Comp(function (c, d, ae, ce) {
   return (
      c.harmonic(
        d.sample()    // modululate the freq of c 
                      // by the amplitude of d
        * ce.sample() // and an envelope
        * 8
      ).sample()
      * ae.sample() //modulate the output amplitude
    )
}, [
  new Voice().octave(1),    //carrier oscillator
  new Voice().octave(0.5),  //modulator oscillator
  ae = new Env(0.001, 3, 0, 1),  //amplitude envelope
  ce = new Env(1, 3, 1)          //modulation envelope
])

ae.trigger()
ce.trigger()

```

### Voice

Generate a sine wave...  
(and then modulate it's pitch with other oscillators & envelopes)

#### .pitch(p) .octave(o) .harmonic(h)

control the frequence by altering pitch (semitones) setting the octave,
or by just multiplying the frequency. (harmonic)

#### .sample()

get the amplitude for the next sample.  
do not call this twice per sample.

### Envelope (attack, decay, aSteepness, dSteepness)

An envelope is used to control the shape of a sound.
it has two parts, `attack` and `decay`

`attack` is the length of time it takes for the envelope to reach 1
`decay` is the length of time it takes for the envelope to return to 0

the attack and decay are both parabolic.  
by altering the steepness parameter, 
you can set whether the decay drops away quickly (steepness > 1)
or stays high and then drops away. (0 < steepness < 1)

#### .trigger()

call `.trigger()` to start the attack again.

#### .sample()

like for `Voice`, get the amplitude of the envlope for this sample.

#### Composite (sampleFunction, [children])

Create a new Voice from a assortment of `Voices` and `Envelopes`.
You must implement the `sample` method 
(in terms of the sample methods of the parts).
The other methods are added for you.

A `Composite` has all the methods of `Voice` and `Envelope`.
Calling these will pass the call through to the children that have that method.
(so `.trigger()` will call trigger on all the child envelopes)

See the examples folder!

## License

MIT
