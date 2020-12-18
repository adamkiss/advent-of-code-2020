const input = require(true ? './inputs/18-input' : './18-0-test').split("\n")

const lex = line => [...line.match(/\(|\)|\+|\*|\d+/g)].map(t => ['(',')','+','*'].includes(t) ? t : parseInt(t, 10))

const calc = exp => exp.reduce((stack, v) => {
  return (v === '+' || v === '*')
    ? Object.assign({}, stack, {op: v})
    : Object.assign({}, stack, {result: stack.op === '+' ? stack.result + v : stack.result * v})
}, {result: 0, op: '+'})

function evaluate(tokens) {
  let to = tokens.indexOf(')')
  while(to !== -1) {
    const from = tokens.lastIndexOf('(', to)
    tokens.splice(from, to-from+1, calc(tokens.slice(from+1, to)).result)
    to = tokens.indexOf(')')
  }
  return calc(tokens).result
}

console.log(input.reduce((sum, line) => sum += evaluate(lex(line)), 0))