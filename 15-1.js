const input = (true ? `2,0,6,12,1,3` : `0,3,6`).split(',').map(i => parseInt(i, 10))

let numbers = input
let turn = numbers.length
while (turn < 2021) {
  const lastTurnSaid = numbers.lastIndexOf(numbers[turn - 1], turn - 2)
  numbers.push(lastTurnSaid === -1 ? 0 : turn - (lastTurnSaid + 1))
  turn++
}
console.log(numbers, numbers[2019])