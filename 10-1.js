const input = require(true ? './inputs/10-input' : './10-0-test')
  .split("\n").map(i => parseInt(i, 10)).sort((a,b) => a - b)

const diffs = [0, ...input, input[input.length-1] + 3]
  .reduce((acc, val, i, arr) => {
    if (i === 0) return acc
    acc[arr[i] - arr[i - 1]] += 1
    return acc
  }, [0,0,0,0])
console.log(diffs[1]*diffs[3]);