var baudio = require('baudio');
var spawn = require('child_process').spawn;


exports.play = function (c) {
  var aplay = spawn('aplay',['-r','44k','-c','2','-f','S16_LE']);

  baudio(function (t, i) {
    if('function' === typeof c)
      return c(t, i)
    else if(c.sample)
      return c.sample()
  }).pipe(aplay.stdin);

  if(c.trigger)
    c.trigger()
}
