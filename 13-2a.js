const input = require(true ? './inputs/13-input' : './13-0-test').split("\n")

const altTests = [
  '17,x,13,19',
  '67,7,59,61',
  '67,x,7,59,61',
  '67,7,x,59,61',
  '1789,37,47,1889'
]
const buses = input[1].split(',').map(b => b === 'x' ? 'x' : parseInt(b)).map((id, index) => ({id, index})).filter(b => b.id !== 'x')
const max = buses.reduce((max, bus) => bus.id > max.id ? bus : max, {id: 0})

let found = false
let multiplyer = 100000000000
let next = 0
let passes = 0

while (!found) {
  if (++passes % 100000000 === 0) {process.stdout.write('.')}
  if (passes % 2000000000 === 0) {console.log(next)}
  next = multiplyer++ * max.id - max.index
  let pass = false
  for (let i = 0; i < buses.length; i++) {
    const {id, index} = buses[i]
    pass = (next % id === 0 && index === 0) || (next % id === id - index)
    if (!pass) break
  }
  found = pass
}

console.log(`
${next} in ${passes} passes
`)