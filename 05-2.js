const input = require('./05-0-input')
const ids = input.map(pass => {
  const row = pass.slice(0,7).replace(/F/g, '0').replace(/B/g, '1')
  const col = pass.slice(7  ).replace(/L/g, '0').replace(/R/g, '1')
  return parseInt(row, 2) * 8 + parseInt(col, 2)
}).sort((a,b) => a - b)

console.log(ids.filter((el, index) => el - ids[index-1] > 1))