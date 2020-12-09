const rules = require('./inputs/07-0-input')
const parents = {}

rules.forEach(rule => {
  const color = [...rule.matchAll(/^(.*?) bags/g)][0][1]
  const contains = [...rule.matchAll(/\d{1,2} (.*?) bags?/g)].map(r => r[1])
  contains.forEach(c => {
    parents[c] = (c in parents) ? [...parents[c], color] : [color]
  })
})

const possibleParents = []
const color = 'shiny gold'
const addParentsToPossible = c => {
  if (!(c in parents)) return

  parents[c].forEach(parent => {
    if (possibleParents.includes(parent)) return
    possibleParents.push(parent)
    addParentsToPossible(parent)
  })
}
if (!(color in parents)) { return '🤷‍♂️' }
addParentsToPossible(color)

console.log(possibleParents.length)