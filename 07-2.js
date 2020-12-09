const rules = require('./07-0-input')
const parents = {}

rules.forEach(rule => {
  const color = [...rule.matchAll(/^(.*?) bags/g)][0][1]
  const contains = [...rule.matchAll(/(\d{1,2}) (.*?) bags?/g)].map(r => [r[2], parseInt(r[1], 10)])
  parents[color] = contains
})

function countBags(color) {
  console.log(color, parents[color])
  const add = (color in parents && parents[color].length)
    ? parents[color].reduce((total, [color, count]) => total + countBags(color) * count, 1)
    : 1
  console.log(add)
  return add
}
console.log(countBags('shiny gold')-1) // SHINY GOLD DOESN'T COUNT