const data = {t1: './10-0-test2', t2: './10-0-test', r: './inputs/10-input'}
const adapters = require(data.r)
  .split("\n").map(i => parseInt(i, 10)).sort((a,b) => a - b)
const outlet = 0
const device = adapters[adapters.length-1] + 3

const diffs = [outlet, ...adapters, device]
  .reduce((r, v, i, a) => (i === 0) ? [0] : [...r, v - a[i-1]], [])

const oneGroups = diffs.map(i => (i === 3 || i === 0) ? false : true).reduce((r, v, i, a) => {
  if (!v && r[r.length-1] === 0){
    return r
  } else {
    if (!v) {
      return [...r, 0]
    }

    r[r.length-1] += 1
    return r
  }
}, []).slice(0, -1) // remove last element = guaranteed 0

const options = oneGroups.reduce((r, v) => r * [1, 1, 2, 4, 7][v], 1)

console.log(options);