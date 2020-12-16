const {rules, nearby} = require(true ? './inputs/16-input' : './16-0-test')

const validRanges = rules.split("\n").map(rule => rule.split(': ')[1].split(' or ').map(range => range.split('-').map(i => parseInt(i, 10))))
const tickets = nearby.split("\n").map(ticket => ticket.split(',').map(i => parseInt(i, 10)))

console.log(
  tickets
    .map(ticket => ticket.filter(
      field => validRanges
        .map(([[min1, max1], [min2, max2]]) => (field >= min1 && field <= max1) || (field >= min2 && field <= max2)).filter(i => i)
        .length > 0 ? null : field
    ))
    .flat()
    .reduce((sum, val) => sum += val, 0)
)