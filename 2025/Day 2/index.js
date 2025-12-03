const input = require('node:fs').readFileSync('input.txt', 'utf8')
const test = require('node:fs').readFileSync('test.txt', 'utf8')

const part1 = (data) => {
    const listOfIds = data.split(',').map((element) => element.split('-').map((num) => Number(num)))
    const invalid = new Set()
    for (const range of listOfIds) {
        const [start, end] = [...range]
        for (let i = start; i <= end; i++) {
            if (invalid.has(i)) continue
            if (Math.ceil(Math.log10(i + 1)) % 2 !== 0) continue
            const stringValue = i.toString()
            const [left, right] = [stringValue.slice(0, stringValue.length / 2), stringValue.slice(stringValue.length / 2, stringValue.length)]
            if (left !== right) continue
            invalid.add(i)
        }
    }
    const result = [...invalid].reduce((acc, curr) => acc + curr, 0)
    console.log(result)
}

const part2 = (data) => {
    const listOfIds = data.split(',').map((element) => element.split('-').map((num) => Number(num)))
    const invalid = new Set()
    const factorMap = new Map()
    const factorFunc = (number) => Array.from(Array(number + 1), (_, i) => i).filter(i => number % i === 0)
    for (const range of listOfIds) {
        const [start, end] = [...range]
        checkNum: for (let i = start; i <= end; i++) {
            if (invalid.has(i)) continue checkNum
            const stringValue = i.toString()
            if (stringValue.length > 1 && stringValue.split('').every(char => char === stringValue[0])) {
                invalid.add(i)
                continue checkNum
            }
            if (stringValue.length < 4) continue checkNum
            if (!factorMap.has(stringValue.length)) {
                const listOfFactors = factorFunc(stringValue.length).filter(factor => factor !== stringValue.length && factor !== 1)
                factorMap.set(stringValue.length, listOfFactors)
            }
            const factors = factorMap.get(stringValue.length)
            if (stringValue.length % 2 !== 0 && factors.length === 2) continue checkNum
            checkFactor: for (const factor of factors) {
                const pieces = stringValue.split(new RegExp(`(.{${factor}})`)).filter(Boolean)
                if (pieces.every((value) => value === pieces[0])) {
                    invalid.add(i)
                    continue checkNum
                }
            }
        }
    }
    const result = [...invalid].reduce((acc, curr) => acc + curr, 0)
    console.log(result)
}

part1(test)
part1(input)

part2(test)
part2(input)