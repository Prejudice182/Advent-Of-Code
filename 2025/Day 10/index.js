const input = require('node:fs').readFileSync('input.txt', 'utf8')
const test = require('node:fs').readFileSync('test.txt', 'utf8')

const part1 = (data) => {
    const lines = data.split('\r\n')
    const lights = lines.map(line => line.match(/\[(.*)\]/)[1])
    const buttons = lines.map(line => [...line.matchAll(/\(([\d,]+)\)/g)].map(match => match[0].slice(1, -1).split(',').map(number => +number)))
    const joltage = lines.map(line => line.match(/\{(.*)\}/)[1].split(',').map((number => +number)))
    
}

part1(test)