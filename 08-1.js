const instructions = require('./08-0-input').map(line => {
  const [,instruction,symbol,value] = /(.*?) ([+-])(\d+)/.exec(line)
  return {instruction, positive: symbol==='+', value: parseInt(value, 10)}
})

let line = 0
const visited = []
let accumulator = 0

while (line < instructions.length && !visited.includes(line)) {
  const instr = instructions[line]
  visited.push(line)

  switch (instr.instruction) {
    case 'acc':
      accumulator = instr.positive ? accumulator + instr.value : accumulator - instr.value
      line += 1
      break;
    case 'jmp':
      line = instr.positive ? line + instr.value : line - instr.value
      break;
    default:
      line += 1
      break;
  }
}

console.log(accumulator)