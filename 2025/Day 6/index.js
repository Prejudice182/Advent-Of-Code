const input = require('node:fs').readFileSync('input.txt', 'utf8')
const test = require('node:fs').readFileSync('test.txt', 'utf8')

const part1 = (data) => {
    const lines = data.split(/\r?\n/)
    const parts = lines.map((line) => line.split(/\s/).filter(Boolean))
    const operations = parts.pop()
    let result = 0
    for (let i = 0; i < operations.length; i++) {
        const elements = []
        parts.forEach((part) => elements.push(part[i]))
        const mathString = elements.join(operations[i])
        result += eval(mathString)
    }
    console.log(result)
}

const part2 = (data) => {
    const lines = data.split(/\r?\n/)
    const operations = lines.pop().split(/([\*\+]\s+)/).filter(Boolean)
    const parts = lines.map((line) => line.split(''))
    let result = 0
    for (const operation of operations) {
        const elements = []
        for (const part of parts) {
            const extract = part.slice(0, operation.length)
            elements.push(extract)
            part.splice(0, operation.length)
        }
        const rotated = elements[0].map((val, index) => elements.map(row => row[row.length - 1 - index])).filter((row) => !row.every((ele) => ele === ' '))
        const nums = rotated.map(rotate => Number(rotate.join('')))
        const mathString = nums.join(operation)
        result += eval(mathString)
    }
    console.log(result)
}

part1(test)
part1(input)

part2(test)
part2(input)