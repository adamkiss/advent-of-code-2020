const data = {t1: './10-0-test2', t2: './10-0-test', r: './inputs/10-input'}
const adapters = require(data.r)
  .split("\n").map(i => parseInt(i, 10)).sort((a,b) => a - b)
const outlet = 0
const device = adapters[adapters.length-1] + 3

const diffs = [outlet, ...adapters, device]
  .reduce((r, v, i, a) => (i === 0) ? [0] : [...r, v - a[i-1]], [])

const diffCounts = diffs.reduce((r, v) => {
  r[v] += 1
  return r
}, [0,0,0,0])

console.log(diffCounts[1]*diffCounts[3]);