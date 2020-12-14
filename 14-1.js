const instructions = require(true ? './inputs/14-input' : './14-0-test').split("\n")
  .map(i => {
    const [instr, value] = i.split(" = ")
    if (instr === 'mask')
      return {fx: 'mask', val: value}
    else
      return {fx: 'mem', val: parseInt(value, 10), mem: parseInt(instr.replace("mem[", '').replace("]", ''), 10)}
  })

const to36Bit = int => `000000000000000000000000000000000000${int.toString(2)}`.slice(-36)
const applyMask = (int, mask) => {
  const int36 = to36Bit(int)
  return [...int36].map((val, i) => mask[i] === 'X' ? val : mask[i]).join('')
}

let mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
const memory = new Map()
instructions.forEach(i => {
  if (i.fx === 'mask')
    mask = i.val
  else 
    memory.set(i.mem, parseInt(applyMask(i.val, mask), 2))
})

console.log(Array.from(memory.values()).reduce((sum, val) => sum += val, 0))
