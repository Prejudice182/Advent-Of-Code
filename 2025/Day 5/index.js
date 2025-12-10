const input = require('node:fs').readFileSync('input.txt', 'utf8')
const test = require('node:fs').readFileSync('test.txt', 'utf8')

const part1 = (data) => {
    const [freshRanges, ingredients] = data.split('\n\n').map(section => section.split('\n'))
    const freshSet = new Set()
    for (const ingredient of ingredients) {
        if (freshSet.has(ingredient)) continue
        if (freshRanges.some((range) => {
            const [min, max] = range.split('-').map(Number)
            if (Number(ingredient) >= min && Number(ingredient) <= max) return true
            else return false
        })) freshSet.add(ingredient)
    }
    console.log(freshSet.size)
}

const part2 = (data) => {
    const freshRanges = data.split('\n\n')[0].split('\n').map((range) => range.split('-').map(Number)).sort((a, b) => a[0] - b[0])
    let count = 0
    let [rangeStart, rangeEnd] = freshRanges.shift()
    for (const [start, end] of freshRanges) {
        if (end > rangeEnd) {
            if (start <= rangeEnd) rangeEnd = end
            else {
                count += rangeEnd - rangeStart + 1
                rangeStart = start
                rangeEnd = end
            }
        }
    }
    count += rangeEnd - rangeStart + 1
    console.log(count)
}

part1(test)
part1(input)

part2(test)
part2(input)