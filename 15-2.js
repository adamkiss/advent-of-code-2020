const input = (true ? `2,0,6,12,1,3` : `0,3,6`).split(',').map(i => parseInt(i, 10))

let numbers = input
let turn = numbers.length
let lastIndex = new Map()
numbers.slice(0,-1).forEach((number, index) => {lastIndex.set(number, index)})
while (turn < 30000001) {
  const nr = numbers[turn-1]
  numbers.push(lastIndex.has(nr) ? turn - (lastIndex.get(nr) + 1) : 0)
  lastIndex.set(nr, turn-1)
  turn++
  if (turn % 1000000 === 0) {process.stdout.write('.')}
}
console.log()
console.log(numbers[29999999])