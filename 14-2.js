const instructions = require(true ? './inputs/14-input' : './14-0-input2').split("\n")
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
  return [...int36].map((val, i) => ({'0': val, '1': '1', 'X': 'X'}[mask[i]])).join('')
}

const generateAddresses = maskedInt => {
  const [first, ...rest] = maskedInt.split('X')
  return rest.reduce((addr, part) => {
    const generated = []
    addr.forEach(prev => generated.push(`${prev}0${part}`, `${prev}1${part}`))
    return generated
  }, [first])
}

let mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
const memory = new Map()
instructions.forEach(i => {
  if (i.fx === 'mask')
    mask = i.val
  else
    generateAddresses(applyMask(i.mem, mask)).forEach(mem => memory.set(mem, i.val))

})

console.log(Array.from(memory.values()).reduce((sum, val) => sum += val, 0))
