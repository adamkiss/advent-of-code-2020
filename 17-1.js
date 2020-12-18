const input = require(true ? './inputs/17-input' : './17-0-test').split("\n")
const maxX = input[0].length - 1
const maxY = input.length - 1

const state = [[input]]

const generateAdjacent = (xo, yo, zo) => {
  const adj = [];
  [-1, 0, 1].forEach(x => {
    [-1, 0, 1].forEach(y => {
      [-1, 0, 1].forEach(z => {
        const xn = xo+x, yn = yo+y, zn = zo+z
        if (xn >= 0 && xn <= maxX && yn >= 0 && yn <= maxY)
          adj.push([xn, yn, zn])
      })
    })
  })
  return adj
}

console.log(generateAdjacent(0,0,0))