const pwdList = require('./inputs/02-0-input')
const pwdRegexp = /(\d+)-(\d+) (.): (.*)/
console.log(
  pwdList.split("\n").filter(pwd => {
    const [, first, second, char, str] = pwdRegexp.exec(pwd)
    return (str[first-1] === char || str[second-1] === char) && !(str[first-1] === char && str[second-1] ===char)
  }).length
)
