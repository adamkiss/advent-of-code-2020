const {rules, nearby} = require(true ? './inputs/16-input' : './16-0-test2')

const tickets = nearby.split("\n").map(ticket => ticket.split(',').map(i => parseInt(i, 10)))
const fieldRules = rules.split("\n").map(rule => {
  const [name, ranges] = rule.split(': ')
  return {
    name,
    ranges: ranges.split(' or ').map(range => range.split('-').map(i => parseInt(i, 10))),
    possibleIndex: Array.from(tickets[0].keys())
  }
})

const isFieldValidForRange = (field, [[min1, max1], [min2, max2]]) => (field >= min1 && field <= max1) || (field >= min2 && field <= max2)
const isFieldValid = field => {
  return fieldRules
    .map(rule => isFieldValidForRange(field, rule.ranges))
    .filter(i => i)
    .length > 0
}

const validTickets = tickets.filter(ticket => ticket.filter(field => isFieldValid(field)).length === ticket.length)
validTickets
  .map(ticket => {
    const fields = ticket
    return fields.map((field, index) => {
      const impossible = fieldRules.map(r => isFieldValidForRange(field, r.ranges) ? null : r.name).filter(n => n)
      return impossible.length > 0 ? impossible.map(impossibleField => ({field: impossibleField, index})) : null
    }).filter(impossible => impossible !== null).flat()
  })
  .flat()
  .forEach(({field, index}) => {
    console.log(field, index)
    const whichRule = fieldRules.findIndex(({name}) => name === field)
    const indexInPossible = fieldRules[whichRule].possibleIndex.findIndex(i => i === index)
    if (indexInPossible === -1) return

    fieldRules[whichRule].possibleIndex.splice(indexInPossible, 1)
  })

console.log(fieldRules)

const fieldRulesWithMoreIndicesPossible = () => fieldRules.map(({possibleIndex}) => possibleIndex.length).filter(i => i > 1).length

let unsureIndexCount = fieldRulesWithMoreIndicesPossible()
while(unsureIndexCount > 0) {
  const definiteIndices = fieldRules.map(({possibleIndex}) => possibleIndex.length === 1 ? possibleIndex[0] : null).filter(i => i)
  definiteIndices.forEach(definiteIndex => {
    fieldRules.forEach((rule, ruleIndex) => {
      if (rule.possibleIndex.length === 1) return
      if (!rule.possibleIndex.includes(definiteIndex)) return
      const indexToRemove = rule.possibleIndex.findIndex(i => i === definiteIndex)
      fieldRules[ruleIndex].possibleIndex.splice(indexToRemove, 1)
    })
  });
  unsureIndexCount = fieldRulesWithMoreIndicesPossible()
  console.log(fieldRules)
}