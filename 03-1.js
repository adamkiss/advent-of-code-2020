const map = require('./inputs/03-0-input').split("\n")
const length = map[0].length
let pos = -3 // first call to nextPos() = 0

const nextPos = () => { pos = (pos+3 > length-1) ? (pos+3 - length) : pos+3; return pos }
const trees = map.filter(line => {
  const pos = nextPos()
  console.log(line, pos, line[pos])
  return line[pos] === '#'
})

console.log(trees.length)