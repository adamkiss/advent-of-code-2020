# Advent of code

My solutions for the Advent of Code puzzles

---

Also participating friends: [Daniel](https://github.com/DanielRivers/advent-of-code-2020), [Bruno](https://github.com/moevbiz/aoc-2020)

---

<details>
<summary><b>01</b>: Find numbers that sum to 2020 and multiply them together</summary>

## First part

Just find first pair of `index` and `second = 2020 - input[index]` and multiply them together

## Second part

We're looking for _three_ numbers now, so the previous won't work. We need to be smart about this.

1. Get `input[first]`
2. Get `input[second]`
  - if it's larger than 2020, skip
3. Search for `input[third]`
  - if it exists, done.
</details>



<details>
<summary><b>02</b>: Find passwords matching the rules formatted as X-Y C: STR</summary>

## First part

`X` is at least, `Y` is at most; Search for passwords, which have `<X,Y>` character `C`. Get all the rules by splitting the line, and just match them. One problem was that I started with the assumption of consecutive characters, which is wrong - the characters anywhere in the string count.

Edit: I now realize I could have replaced the `/C{X,Y}/` regular expression with `/C/g` and count those, but used `split().filter()` instead

## Second part

Very easy as well; instead of Min/Max, `X` is position 1, `Y` is position 2, and the new rule says that either `X` or `Y` must match the character `C`, but not both.
</details>



<details>
<summary><b>03</b>: Count the trees on your path through the map</summary>

Yeah, 0-based indexing is always fun. read the code, I'm too lazy to describe this more.
</details>



<details>
<summary><b>04</b>: Passport Processing</summary>

## Part 1:
- input is X records of Y `key:value` sequences separated by space or newline, every record separated by blank line

1. Split input by `\n\n`
2. Map record by regexp, something like `((key):(value)[\s\n])+`
3. Validate each record my matching doing `record keys` - `required fields` - if more than cid (optional) is missing, it's invalid

## Part 2:

There was a weird error about accessing an object _that didn't make sense_ in that context, so I've used a regexp based number validation, which is just gnarly.
</details>

<details>
<summary><b>05</b>: Binary Boarding</summary>

## Part 1

Sort of binary boarding passes - which are actually just binary numbers
- `FBFBBFF` => `0101100` => 44
- `RLR` => => `101` => 5

So, `F` or `L` is `0`, `B` or `R` is `1`. The rest is pure calculation

## Part 2
Instead of any smart comparison, I sort the IDs, and filter the elements with are larger than the previous one by more than 1, i.e. there's an element missing. The missing number is thus the "filtered element - 1" (`619` for my input)
</details>

<details>
<summary><b>06</b>: Custom Customs</summary>

## Part 1
- Split into groups
- Remove everything not `[a-z]`
- create a `Set` from those character (= uniques only)
- sum

## Part 2
- Split into groups
- Split into people
- Reduce group down to intersection array
- sum
</details>

<details>
<summary><b>07</b>: Handy Haversacks</summary>

## Part 1
- Create an object `{[color]: [possible, parents, ...]}`
- start with color
  - if no possible parents, return empty array
  - else add possible parents
  - for each possible parent, exclude already added and start again (recursion!)
- count result

## Part 2
- Create an object `{[color]: [ ['contains', 'count'], ... ]}`
- start with color
  - if doesn't contain any, return 1 for self
  - if contains, return 1 + count of contains
- subtract one for self and that's the result
</details>

<details>
<summary><b>08</b>: Handheld Halting</summary>

## Part 1
- parse input
- regex data (very stable format, again)
- run all ops until
  1. end is reached
  2. once before visited line is requested again
- output result

## Part 2
We switch the code around so we preview the result of `nop`/`jmp` instructions first, and if they lead to already visited place, we switch them before we execute them. (According to input, there is precisely one where this might happen)
</details>

<details>
<summary><b>09</b>: Encoding Error</summary>

## Part 1
- parse input
- loop over the range of `(preamble..length)`
  - get preamble and number to check
  - filter preamble to unmatched numbers
    - in the case of match, there should be `preamble.length - 2` unmatched numbers
  - if all numbers are unmatched, return the number, else go to the next iteration
- output result

## Part 2
- `input2` is slice of input, the range `(0..foundPart1)`
- loop over the input2
  - starting from loop2 index
    - add next number to sum
    - if `sum` matches the `found` number, you've got your weakness
    - if the `sum` is larger than the `found` number, finish this loop
  - ~~if the `range2` is found, return `range2[0] + range2[range2.length-1]`~~
  - if the `range2` is found, sort it and return the sum of the first and last element
</details>

<details>
<summary><b>10</b>: Adapter Array</summary>

## Part 1
- parse input
- sort the input
- reduce it down to array of diff count to previous element
- return the `diff[1] * diff[3]` count

## Part 2
- parse input
- sort input
- reduce the array down to:
  - diff to previous element
    - this is always `1` or `3` in my inputs
- reduce the diff array to array of number of consecutive `1`
- each of these consecutive groups for `>2` generate `X` number of options:
  2. 2
  3. 4
  4. 7
  5. ?? (I don't have a cons. group of 5, so I skipped finding the math behind it)
- times all together, that's the result

</details>

<details>
<summary><b>14</b>: Docking Data</summary>

## Part 1
- parse input
- for each line
  - if mask, update mask for all next lines
  - if mem write, apply mask and write
- sum (reduce)


## Part 2
- parse input
- for each line
  - if mask, update mask for all next lines
  - if mem write, apply mask, generate all memory places to write and write
- sum (reduce)

</details>

<details>
<summary><b>15</b>: Rambunctious Recitation</summary>

## Part 1
- parse input, use as a starting point
- loop:
  - get last number
  - get last index of said number _discounting_ "real" last index (which is last turn)
  - if last index is -1, push 0, otherwise (turn (1 based) - index (0 based)) + base diff
- get index `2019` (turn 2020)

Mostly an excercise in keeping 0 based and 1 based indexing straight
## Part 2
- ~~the very same, just increase the stop count?~~
- the very same, but keep "last index" map so it's faster
  - to disregard last number said, we update the index _after_ comparison

</details>

<details>
<summary><b>16</b>: Rambunctious Recitation</summary>

## Part 1
- parse input
- filter tickets:
  - filter all invalid fields (exactly one or more, doesn't matter)
- flat the tickets down to all the fields
- sum the fields
## Part 2
- tbd

</details>

