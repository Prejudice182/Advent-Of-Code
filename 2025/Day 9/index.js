const input = require('node:fs').readFileSync('input.txt', 'utf8')
const test = require('node:fs').readFileSync('test.txt', 'utf8')

const area = (c1, c2) => (Math.abs(c1[0] - c2[0]) + 1) * (Math.abs(c1[1] - c2[1]) + 1)
const inRange = (a1, a2, b1, b2) => !(a1 <= b1 && a1 <= b2 && a2 <= b1 && a2 <= b2) && !(a1 >= b1 && a1 >= b2 && a2 >= b1 && a2 >= b2)


const part1 = (data) => {
    const redCorners = data.split('\r\n').map(tile => tile.split(',').map(n => +n))
    const pairs = redCorners.flatMap((corner1, i) => redCorners.slice(i + 1).map(corner2 => [area(corner1, corner2), corner1, corner2])).toSorted((a, b) => b[0] - a[0])
    console.log(pairs[0][0])
}

const part2 = (data) => {
    const redCorners = data.split('\r\n').map(tile => tile.split(',').map(n => +n))
    const pairs = redCorners.flatMap((corner1, i) => redCorners.slice(i + 1).map(corner2 => [area(corner1, corner2), corner1, corner2])).toSorted((a, b) => b[0] - a[0])
    const lines = redCorners.map((corner, i) => [corner, redCorners[i + 1 === redCorners.length ? 0 : i + 1]])
    const intersectLines = ([[x1, y1] , [x2, y2]]) => lines.some(([[sx1, sy1], [sx2, sy2]]) => inRange(sy1, sy2, y1, y2) && inRange(sx1, sx2, x1, x2))
    console.log(pairs.find(p => !intersectLines(p.slice(1)))[0])
}

part1(test)
part1(input)

part2(test)
part2(input)