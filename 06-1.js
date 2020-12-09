const groups = require('./06-0-input')
const yes = groups
  .map(group => (new Set(group.replace(/[^a-z]/g, '').split(''))).size)
  .reduce((acc, val) => acc+val, 0)
console.log(yes)
