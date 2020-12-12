const instructions = require(true ? './inputs/12-input' : './12-0-test')
  .split("\n").map(l => ({c: l.slice(0,1),a: parseInt(l.slice(1), 10)}))

const position = {x: 0, y: 0}
let waypoint = {x: 10, y: -1}
const waypointRotate = (waypoint, rotation) => {
  switch ((Math.round(rotation / 90) + 4) % 4) {
    case 0: return Object.assign({}, waypoint)
    case 1: return Object.assign({}, {x: waypoint.y * -1, y: waypoint.x})
    case 2: return Object.assign({}, {x: waypoint.x * -1, y: waypoint.y * -1})
    case 3: return Object.assign({}, {x: waypoint.y, y: -1 * waypoint.x})
  }
}

instructions.map(({c, a}) => {
  switch (c) {
    case 'N': waypoint.y -= a; break;
    case 'S': waypoint.y += a; break;
    case 'W': waypoint.x -= a; break;
    case 'E': waypoint.x += a; break;
    case 'F': 
      position.x += waypoint.x * a
      position.y += waypoint.y * a
      break
    case 'R':
      waypoint = waypointRotate(waypoint, a)
      break
    case 'L':
      waypoint = waypointRotate(waypoint, a * -1)
    default:
      break;
  }
})

console.log(position, Math.abs(position.x) + Math.abs(position.y))