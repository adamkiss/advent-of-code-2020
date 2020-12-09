const map = require('./inputs/03-0-input').split("\n")
const length = map[0].length

const nextPos = (pos, howMuch) => (pos+howMuch > length-1) ? (pos+howMuch - length) : pos+howMuch
const testPos = (howMuch, everySecond = false) => {
  let pos = -howMuch
  const mapToUse = everySecond ? map.filter((el,i) => i % 2 === 0) : map
  return mapToUse.filter(line => {
    pos = nextPos(pos, howMuch)
    return line[pos] === '#'
  }).length
}

console.log(testPos(1) * testPos(3) * testPos(5) * testPos(7) * testPos(1, true))