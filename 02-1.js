const pwdList = require('./inputs/02-0-input')
const pwdRegexp = /(\d+)-(\d+) (.): (.*)/
console.log(
  pwdList.split("\n").filter(pwd => {
    const [, min, max, char, str] = pwdRegexp.exec(pwd)
    const characters = str.split('').filter(chr => chr === char)
    return characters.length >= min && characters.length <= max
    // return RegExp(`${char}{${min},${max}}`).test(str)
  }).length
)
