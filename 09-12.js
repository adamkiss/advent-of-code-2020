// const input = require('./inputs/09-0-input')
// const sliceSize = 25

const input = require('./09-0-test')
const sliceSize = 5

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

if (found === false) {
  return console.log('🤷‍♂️');
}

console.log(`Unmatched: ${found}, index #${foundIndex}`)