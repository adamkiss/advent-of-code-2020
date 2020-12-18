const input = require(true ? './inputs/18-input' : './18-0-test').split("\n")

const lex = line => [...line.match(/\(|\)|\+|\*|\d+/g)].map(t => ['(',')','+','*'].includes(t) ? t : parseInt(t, 10))

function calc(tokens) {
  let mIndex = tokens.indexOf('+')
  while (mIndex !== -1){
    tokens.splice(mIndex-1, 3, tokens[mIndex-1] + tokens[mIndex+1])
    mIndex = tokens.indexOf('+')
  }
  return tokens.filter(t => t !== '*').reduce((res, v) => res * v, 1)
}

function evaluate(tokens) {
  let to = tokens.indexOf(')')
  while(to !== -1) {
    const from = tokens.lastIndexOf('(', to)
    tokens.splice(from, to-from+1, calc(tokens.slice(from+1, to)))
    to = tokens.indexOf(')')
  }
  return calc(tokens)
}

console.log(input.reduce((sum, val) => sum + evaluate(lex(val)), 0))