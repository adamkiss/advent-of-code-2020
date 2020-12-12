const map = require(true ? './inputs/11-input' : './11-0-test')
  .split("\n").map(l => l.split(""))

const maxX = map[0].length - 1
const maxY = map.length - 1

const draw = map => map.map(line => line.join("")).join("\n")
const clone = map => [].concat(map.map(l => [].concat(l)))
const compare = (map1, map2) => map1.flat().join('') === map2.flat().join('')

const getVisible = (arr, x, y) => {
  const dirs = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]
  return dirs.map(([dx, dy]) => {
    let gx = x + dx
    let gy = y + dy
    while(gx >= 0 && gx <= maxX && gy >=0 && gy <= maxY) {
      if (['L', '#'].includes(arr[gy][gx])) {
        return arr[gy][gx]
      }
      gx += dx
      gy += dy
    }
    return false
  }).filter(seat => seat)
}
const countVisibleOccupied = (a, x, y) => getVisible(a,x,y).filter(seat => seat === '#').length
const mapAfterPass = map => {
  const newMap = clone(map)
  for (let mx = 0; mx <= maxX; mx++) {
    for (let my = 0; my <= maxY; my++) {
      if (map[my][mx] === 'L' && countVisibleOccupied(map, mx, my) === 0) {
        newMap[my][mx] = '#';
        continue;
      }

      if (map[my][mx] === '#' && countVisibleOccupied(map, mx, my) >= 5) {
        newMap[my][mx] = 'L';
        continue;
      }
    }
  }
  return newMap
}

const passes = [clone(map), mapAfterPass(map)]
let runs = 1
while (!compare(passes[runs], passes[runs-1])) {
  passes.push(mapAfterPass(passes[runs]))
  runs += 1
}

console.log(passes[runs-1].flat().filter(seat => seat === '#').length)