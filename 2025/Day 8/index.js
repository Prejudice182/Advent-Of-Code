const input = require('node:fs').readFileSync('input.txt', 'utf8')
const test = require('node:fs').readFileSync('test.txt', 'utf8')

const euclideanDistance = (a, b) => Math.hypot(...a.map((v, i) => v - b[i]))

const bothParts = (data, c = 1000) => {
    const junctionBoxes = data.split('\n').map(line => line.split(',').map(Number))
    const distances = []
    for (const [i, box1] of junctionBoxes.entries()) 
      for (const [j, box2] of junctionBoxes.entries()) 
        if (i > j) distances.push([euclideanDistance(box1, box2), i, j])
    distances.sort((a, b) => a[0] - b[0])

    const uf = [...Array(junctionBoxes.length).keys()]
    const find = (x) => {
        if (x === uf[x]) return x
        uf[x] = find(uf[x])
        return uf[x]
    }
    const union = (x, y) => uf[find(x)] = find(y)
    let connections = 0
    for (const [total, [_, i, j]] of distances.entries()) {
        if (total === c) {
            const startAtZero = new Map([...junctionBoxes.keys()].map(k => [k, 0]))
            for (const x of junctionBoxes.keys()) startAtZero.set(find(x), (startAtZero.get(find(x) ?? 0) + 1))
            const s = [...startAtZero.values()].sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a * b, 1)
            console.log(s)
        }
        if (find(i) !== find(j)) {
            connections++
            if (connections === junctionBoxes.length - 1) console.log(junctionBoxes[i][0] * junctionBoxes[j][0])
            union(i, j)
        }
    }
}

bothParts(test, 10)
bothParts(input)