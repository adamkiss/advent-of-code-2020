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
const recordsValid = records.filter(record => {
  const keys = Object.keys(record)
  
  // Validate: missing more than 1 key OR 1 key other than cid
  const missingKeys = required.filter(key => !keys.includes(key))
  if (missingKeys.length > 1 || (missingKeys.length === 1 && missingKeys[0] !== 'cid')) {
    return false
  }

  // Validate: fields
  const hgtRegexp = new RegExp('(\d+)(cm|in)')
  const isValid = {
    byr: value => /^\d{4}$/.test(value) && parseInt(value, 10) >= 1920 && parseInt(value, 10) <= 2002,
    iyr: value => /^\d{4}$/.test(value) && parseInt(value, 10) >= 2010 && parseInt(value, 10) <= 2020,
    eyr: value => /^\d{4}$/.test(value) && parseInt(value, 10) >= 2020 && parseInt(value, 10) <= 2030,
    hgt: value => /^1([5-8][0-9]|9[0-3])cm$/.test(value) || /^(59|6[0-9]|7[0-6])in$/.test(value),
    hcl: value => /^#[0-9a-f]{6}$/.test(value),
    ecl: value => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value),
    pid: value => /^[0-9]{9}$/.test(value),
    cid: value => true
  }

  return keys.filter(key => !(Object.keys(isValid).includes(key) && isValid[key](record[key]))).length === 0
})

console.log('Valid Passports', recordsValid.length)
