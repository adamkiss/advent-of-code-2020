const map = require(false ? './inputs/11-input' : './11-0-test')
  .split("\n").map(l => l.split(""))

const maxX = map[0].length - 1
const maxY = map.length - 1

const draw = map => map.map(line => line.join("")).join("\n")
const clone = map => [].concat(map.map(l => [].concat(l)))
const compare = (map1, map2) => map1.flat().join('') === map2.flat().join('')

const getAdjacent = (arr, x, y) => {
  const a = []
  for (let ix = Math.max(0, x - 1); ix <= Math.min(x + 1, maxX); ix++){
    for (let iy = Math.max(0, y - 1); iy <= Math.min(y + 1, maxY); iy++){
      if (!(x === ix && y === iy)) {
        a.push(arr[iy][ix]);
      }
    }
  }
  return a;
}
const countAdjacentOccupied = (a, x, y) => {
  return getAdjacent(a, x, y).filter(seat => seat === '#').length
}

const mapAfterPass = map => {
  const newMap = clone(map)
  for (let mx = 0; mx <= maxX; mx++) {
    for (let my = 0; my <= maxY; my++) {
      if (map[my][mx] === 'L' && countAdjacentOccupied(map, mx, my) === 0) {
        newMap[my][mx] = '#';
        continue;
      }

      if (map[my][mx] === '#' && countAdjacentOccupied(map, mx, my) >= 4) {
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