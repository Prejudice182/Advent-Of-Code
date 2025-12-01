const min = 0
const max = 99
const startPos = 50
const input = require('node:fs').readFileSync('input.txt', 'utf8')
const test = require('node:fs').readFileSync('test.txt', 'utf8')

const part1 = (data) => {
    const moves = data.split('\n').map((line) => line.split(/(L|R)/).filter(Boolean))
    let currentPos = startPos
    let count = 0
    for (const move of moves) {
        const [direction, distance] = [...move]
        if (direction === 'R') currentPos += Number(distance)
        else if (direction === 'L') currentPos -= Number(distance)
        if ((currentPos > max) || (currentPos < min)) currentPos = ((currentPos % 100) + 100) % 100
        if (currentPos === 0) count++
    }
    console.log(count)
}

const part2 = (data) => {
    const moves = data.split('\n').map((line) => line.split(/(L|R)/).filter(Boolean))
    let nextPos = startPos
    let prevPos
    let count = 0
    for (const move of moves) {
        prevPos = nextPos
        const [direction, distance] = [...move]
        const fullTurns = Math.floor(Number(distance) / 100)
        if (fullTurns > 0) count += fullTurns
        const remainder = Number(distance) % 100
        if (direction === 'R') nextPos += remainder
        else if (direction === 'L') nextPos -= remainder
        if ((nextPos > max) || (nextPos < min)) {
            nextPos = ((nextPos % 100) + 100) % 100
            if (nextPos !== 0 && prevPos !== 0) count++
        }
        if (nextPos === 0) count++
    }
    console.log(count)
}
part1(test)
part1(input)

part2(test)
part2(input)