const instructions = require(true ? './inputs/12-input' : './12-0-test')
  .split("\n").map(l => ({c: l.slice(0,1),a: parseInt(l.slice(1), 10)}))

const directions = [
  {x:1, y:0}, {x:1, y:1}, {x:0, y:1}, {x: -1, y:1},
  {x:-1, y:0}, {x:-1, y:-1}, {x:0, y:-1}, {x: -1, y:-1}
]
let direction = 0
const changeDirection = change => (direction + Math.round(change / 45) + 8) % 8
const position = {x: 0, y: 0}

instructions.map(({c, a}) => {
  switch (c) {
    case 'N': position.y -= a; break;
    case 'S': position.y += a; break;
    case 'W': position.x -= a; break;
    case 'E': position.x += a; break;
    case 'F': 
      position.x += directions[direction].x * a
      position.y += directions[direction].y * a
      break
    case 'R':
      direction = changeDirection(a)
      break
    case 'L':
      direction = changeDirection(a * -1)
    default:
      break;
  }
})

console.log(Math.abs(position.x) + Math.abs(position.y))