const input = require('node:fs').readFileSync('input.txt', 'utf8')
const test = require('node:fs').readFileSync('test.txt', 'utf8')

const part1 = (data) => {
    let result = 0
    const banks = data.split('\n').map(bank => bank.split(''))
    for (const bank of banks) {
        const combos = new Set()
        while (bank.length > 0) {
            const start = bank.shift()
            for (const battery of bank) {
                combos.add(`${start}${battery}`)
            }
        }
        result += +([...combos].sort().pop())
    }
    console.log(result)
}

const part2 = (data) => {
    const banks = data.split('\n')
    let score = 0
    for (let bank of banks) {
        let result = ''
        let count = 12
        while (result.length < 12 && count > 0) {
            const slice = bank.slice(0, bank.length - count + 1)
            const max = Math.max(...slice)
            const index = bank.indexOf(max)
            result += max
            bank = bank.slice(index + 1)
            count--
        }
        score += +result
    }
    console.log(score)
}


part1(test)
part1(input)
part2(test)
part2(input)