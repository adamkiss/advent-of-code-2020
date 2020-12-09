const groups = require('./inputs/06-0-input')
const all = 'abcdefghijklmnopqrstuvwxyz'.split('')
const yes = groups
  .map(group => {
    const people = group.split("\n").map(person => Array.from(new Set(person.replace(/[^a-z]/g, '').split(''))))
    const intersection = people.length === 1
      ? people[0]
      : people.reduce((acc, val) => acc.filter(el => val.includes(el)), all)
    return intersection.length
  })
  .reduce((acc, val) => acc+val, 0)
console.log(yes)
