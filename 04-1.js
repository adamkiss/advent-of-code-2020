const input = require('./04-0-input')
const required = Object.keys({
  byr: 'Birth Year',
  iyr: 'Issue Year',
  eyr: 'Expiration Year',
  hgt: 'Height',
  hcl: 'Hair Color',
  ecl: 'Eye Color',
  pid: 'Passport ID',
  cid: 'Country ID'
}).filter(key => key !== 'cid')

const records = input.split("\n\n").map(record => {
  const rec = {}
  record.split(/[\s\n]{1,}/).forEach(kv => {
    const [key, value] = kv.split(':')
    rec[key] = value
  })
  return rec
})
const recordsMissingKeys = records.map(record => {
  const keys = Object.keys(record)
  return required.filter(key => !keys.includes(key))
})

console.log('Valid Passports', recordsMissingKeys.filter(rmk => rmk.length === 0 || (rmk.length === 1 && rmk[0] === 'cid')).length)
