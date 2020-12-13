const input = require(true ? './inputs/13-input' : './13-0-test').split("\n")

const now = parseInt(input[0], 10)
const buses = input[1]
  .split(',').filter(b => b !== 'x').map(b => parseInt(b))
  .map(b => ({
    nr: b,
    time: Math.ceil(now / b) * b,
    wait: Math.ceil(now / b) * b - now
  }))
  .sort((b1, b2) => b1.wait - b2.wait)

console.log(buses[0].nr * buses[0].wait)
