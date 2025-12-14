const { start } = require('node:repl')

const input = require('node:fs').readFileSync('input.txt', 'utf8')
const test = require('node:fs').readFileSync('test.txt', 'utf8')

class DefaultDict {
  constructor(defaultInit) {
    return new Proxy({}, {
      get: (target, name) => name in target ?
        target[name] :
        (target[name] = typeof defaultInit === 'function' ?
          new defaultInit().valueOf() :
          defaultInit)
    })
  }
}

const euclideanDistance = (a, b) => Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2)

const bothParts = (data) => {
    const junctionBoxes = data.split('\n').map(line => line.split(',').map(Number))
    const distances = []
    for (const [i, box1] of junctionBoxes.entries()) {
        for (const [j, box2] of junctionBoxes.entries()) {
            const distance = euclideanDistance(box1, box2)
            if (i > j) distances.push([distance, i, j])
        }
    }
    distances.sort((a, b) => a[0] - b[0])
    const unionFind = Array(junctionBoxes.length).fill(0).map((_, i) => i)
    const find = (x) => {
        if (x === unionFind[x]) return x
        unionFind[x] = find(unionFind[x])
        return unionFind[x]
    }
    const mix = (x, y) => unionFind[find(x)] = find(y)
    let connections = 0
    for (const [total, [d, i, j]] of distances.entries()) {
        if (total === 1000) {
            const startAtZero = new Map()
            for (let k = 0; k < junctionBoxes.length; k++) startAtZero.set(k, 0)
            for (const x of junctionBoxes.keys()) startAtZero.set(find(x), (startAtZero.get(find(x) ?? 0) + 1))
            const s = [...startAtZero.values()].sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a * b, 1)
            console.log(s)
        }
        if (find(i) !== find(j)) {
            connections++
            if (connections === junctionBoxes.length - 1) console.log(junctionBoxes[i][0] * junctionBoxes[j][0])
            mix(i, j)
        }
    }
}

bothParts(test)
bothParts(input)