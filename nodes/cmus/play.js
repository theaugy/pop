const CMUS = require('../lib/cmus.js');
const J = JSON.stringify;
var cmus = CMUS.makeCmus();
cmus.Play();
console.log(J(cmus.PlayerStatus()));
