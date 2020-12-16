const {rules, ticket, nearby} = require(true ? './inputs/16-input' : './16-0-test2')

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

const validTickets = tickets.filter(fields => fields.every(field => fieldRules.some(rule => isFieldValidForRange(field, rule.ranges))))
const possibleFields = Array(validTickets[0].length).fill()
  .map((_, i) => ({
    i,
    possible: fieldRules.filter(({ranges}) => validTickets.every(t => isFieldValidForRange(t[i], ranges))).map(r => r.name)
  }))
  .sort((a,b) => a.possible.length - b.possible.length)

const fields = possibleFields.reduce((done, current) => [...done, {
  i: current.i,
  field: current.possible.filter(pf => done.every(d => pf !== d.field))[0]
}], [])

const your = ticket.split(',').map(i => parseInt(i, 10))
console.log(
  fields
    .map(({field, i}) => /^departure/.test(field) ? your[i] : 1)
    .reduce((sum, c) => sum *= c, 1)
)
