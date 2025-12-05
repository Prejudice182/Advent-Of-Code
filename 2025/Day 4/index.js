const input = require('node:fs').readFileSync('input.txt', 'utf8')
const test = require('node:fs').readFileSync('test.txt', 'utf8')

const isInBounds = (grid, x, y) => x >= 0 && x < grid[0].length && y >= 0 && y < grid.length

const part1 = (data) => {
    const map = data.split('\n').map(line => line.split(''))
    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]]
    let count = 0
    for (let y = 0; y < map.length; y++) {
        nextChar: for (let x = 0; x < map[0].length; x++) {
            if (map[y][x] === '.') continue
            let visible = 0
            for (const [dx, dy] of dirs) {
                let nx = x + dx
                let ny = y + dy
                if (isInBounds(map, nx, ny) && map[ny][nx] === '@') visible++
                if (visible === 4) continue nextChar
            }
            count++
        }
    }
    console.log(count)
}

const part2 = (data) => {
    let map = data.split('\n').map(line => line.split(''))
    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]]
    let removed = 0
    while (true) {
        let currentCount = 0
        let newMap = JSON.parse(JSON.stringify(map))
        for (let y = 0; y < map.length; y++) {
            nextChar: for (let x = 0; x < map[0].length; x++) {
                if (map[y][x] === '.') continue
                let visible = 0
                for (const [dx, dy] of dirs) {
                    let nx = x + dx
                    let ny = y + dy
                    if (isInBounds(map, nx, ny) && map[ny][nx] === '@') visible++
                    if (visible === 4) continue nextChar
                }
                newMap[y][x] = '.'
                removed++
                currentCount++
            }
        }
        map = newMap
        if (currentCount === 0) break
    }
    console.log(removed)
}

part1(test)
part1(input)

part2(test)
part2(input)