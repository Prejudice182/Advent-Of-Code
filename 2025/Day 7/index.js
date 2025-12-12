const input = require('node:fs').readFileSync('input.txt', 'utf8')
const test = require('node:fs').readFileSync('test.txt', 'utf8')

const part1 = (data) => {
    const lines = data.split('\n')
    const start = lines.shift().indexOf('S')
    const beams = new Set([start])
    const splitter = '^'
    let count = 0
    for (const line of lines) {
        for (const beam of [...beams]) {
            if (line[beam] === splitter) {
                beams.add(beam - 1)
                beams.add(beam + 1)
                beams.delete(beam)
                count++
            }
        }
    }
    console.log(count)
}



const part2 = (data) => {
    const lines = data.split('\n')
    const start = lines.shift().indexOf('S')
    const splitter = '^'
    let beams = new Map([[start, 1]])
    let splits = 0
    for (const line of lines) {
        const newBeams = new Map()
        const setBeam = (beam, ways) => newBeams.set(beam, (newBeams.get(beam) ?? 0) + ways)
        for (const [beam, ways] of beams) {
            const char = line[beam]
            if (char === splitter) {
                splits++
                setBeam(beam - 1, ways)
                setBeam(beam + 1, ways)
            } else setBeam(beam, ways)
        }
        beams = newBeams
    }
    console.log(beams.values().reduce((a, b) => a + b, 0))
}

part1(test)
part1(input)

part2(test)
part2(input)