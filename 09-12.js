const input = require('./inputs/09-0-input')
const sliceSize = 25

// const input = require('./09-0-test')
// const sliceSize = 5

let found = false
let foundIndex = 0

for (let checkIndex = sliceSize; checkIndex < input.length; checkIndex++) {
  const checking = input[checkIndex]
  const checkInput = input.slice(checkIndex - sliceSize, checkIndex)

  const checkNotMatched = checkInput.filter((first, firstI) => {
    return checkInput.filter((second, secondI) => firstI !== secondI && checking === first+second).length === 0
  })

  if (checkNotMatched.length === checkInput.length) {
    found = checking
    foundIndex = checkIndex
    break;
  }
}

if (found === false) return console.log('🤷‍♂️')
console.log(`Unmatched: ${found}, index #${foundIndex}`)

const input2 = input.slice(0, foundIndex)
for (let range2b = 0; range2b < input2.length; range2b++) {
  let sum = input2[range2b]
  let range2e = range2b + 1
  for (; range2e < input2.length; range2e++) {
    sum += input2[range2e]
    if (sum >= found) break;
  }

  if (sum === found) {
    const range2 = input2.slice(range2b, range2e+1).sort((a,b) => a-b)
    console.log(`Range: ${range2b}..${range2e}`)
    console.log(range2)
    console.log(`Sum: ${range2[0]} + ${range2[range2.length-1]} = ${range2[0] + range2[range2.length-1]}`)
  }
}