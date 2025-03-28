// TODO:

// import { expect, test } from 'vitest'
// import { prepareLeaves } from './solution-transformer'
//
// test('no pauses', () => {
//   const input: Parameters<typeof prepareLeaves> = [[0, 120]]
//   const expected: ReturnType<typeof prepareLeaves> = [
//     { animLeaf: 'move', start: 0, end: 120 },
//     { animLeaf: 'move', start: 120, end: 240 },
//   ]
//   expect(prepareLeaves(...input)).toStrictEqual(expected)
// })
//
// test('trim, no pauses', () => {
//   const input: Parameters<typeof prepareLeaves> = [[0, 100]]
//   const expected: ReturnType<typeof prepareLeaves> = [
//     { animLeaf: 'move', start: 0, end: 100 },
//     { animLeaf: 'move', start: 100, end: 220 },
//   ]
//   expect(prepareLeaves(...input)).toStrictEqual(expected)
// })
//
// test('simple pause', () => {
//   const input: Parameters<typeof prepareLeaves> = [[0, 1000]]
//   const expected: ReturnType<typeof prepareLeaves> = [
//     { animLeaf: 'move', start: 0, end: 120 },
//     { animLeaf: 'pause', start: 120, end: 1000 },
//     { animLeaf: 'move', start: 1000, end: 1120 },
//   ]
//   expect(prepareLeaves(...input)).toStrictEqual(expected)
// })
//
// test('trim and pause', () => {
//   const input: Parameters<typeof prepareLeaves> = [[0, 100, 1000]]
//   const expected: ReturnType<typeof prepareLeaves> = [
//     { animLeaf: 'move', start: 0, end: 100 },
//     { animLeaf: 'move', start: 100, end: 220 },
//     { animLeaf: 'pause', start: 220, end: 1000 },
//     { animLeaf: 'move', start: 1000, end: 1120 },
//   ]
//   expect(prepareLeaves(...input)).toStrictEqual(expected)
// })
