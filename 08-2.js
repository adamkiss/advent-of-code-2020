const instructions = require('./inputs/08-0-input').map(line => {
  const [,instruction,symbol,value] = /(.*?) ([+-])(\d+)/.exec(line)
  return {instruction, positive: symbol==='+', value: parseInt(value, 10)}
})
/**
 * FIX & TURN BACK PART, LINE BY LINE
 */
let fixed = false
const switchInstruction = line => {
  if (line < 0 || line >= instructions.length) return
  instructions[line].instruction = instructions[line].instruction === 'jmp' ? 'nop' : 'jmp'
}
let fixLast = -1
const fixNext = () => {
  let fixNext = fixLast + 1
  while (instructions[fixNext].instruction === 'acc') {
    fixNext += 1
    if (fixNext === instructions.length) {
      fixLast = fixNext
      return
    }
  }
  switchInstruction(fixLast)
  switchInstruction(fixNext)
  fixLast = fixNext
}

while (!fixed && fixLast < instructions.length) {
  /**
   * SINGLE LOOP
   */
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

  /**
   * CHECK FOR CORRECTNESS FOR THIS FIX
   */
  if (line === instructions.length) {
    fixed = true
    console.log(`Result: ${accumulator}, Fixed: line #${fixLast}`)
  } else {
    fixNext()
  }
}

if (!fixed) console.log('🤷‍♂️')