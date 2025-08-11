//     1
//    2 3
//   4 5 6
//  7 8 9 10
// 11 12 13 14 15

type GameState = {
  [key: number]: boolean
}

const PATHS: Record<number, Array<Array<number>>> = {
  1: [
    [1, 2, 4],
    [1, 3, 6],
  ],
  2: [
    [2, 4, 7],
    [2, 5, 9],
  ],
  3: [
    [3, 6, 10],
    [3, 5, 8],
  ],
  4: [
    [4, 7, 11],
    [4, 2, 1],
    [4, 5, 6],
    [4, 8, 13],
  ],
  5: [
    [5, 8, 12],
    [5, 9, 14],
  ],
  6: [
    [6, 5, 4],
    [6, 10, 15],
    [6, 3, 1],
    [6, 9, 13],
  ],
  7: [
    [7, 4, 2],
    [7, 8, 9],
  ],
  8: [
    [8, 9, 10],
    [8, 5, 3],
  ],
  9: [
    [9, 8, 7],
    [9, 5, 2],
  ],
  10: [
    [10, 9, 8],
    [10, 6, 3],
  ],
  11: [
    [11, 12, 13],
    [11, 7, 4],
  ],
  12: [
    [12, 13, 14],
    [12, 8, 5],
  ],
  13: [
    [13, 12, 11],
    [13, 14, 15],
    [13, 8, 4],
    [13, 9, 6],
  ],
  14: [
    [14, 13, 12],
    [14, 9, 5],
  ],
  15: [
    [15, 14, 13],
    [15, 10, 6],
  ],
}

const findPossibleMoves = (gameState: GameState) => {
  const possibleMoves: Array<Array<number>> = []
  for (let i = 1; i <= 15; i++) {
    // If there isn't a tee to move, skip
    if (!gameState[i]) continue

    const paths = PATHS[i]
    for (const path of paths) {
      const [a, b, c] = path
      if (gameState[a] && gameState[b] && !gameState[c]) {
        possibleMoves.push([a, b, c])
      }
    }
  }
  return possibleMoves
}

const isSolved = (gameState: GameState) => Object.values(gameState).filter(Boolean).length === 1

const getSoluttions = (
  gameState: GameState,
  movesSoFar: Array<Array<number>>,
): Array<Array<Array<number>>> => {
  if (isSolved(gameState)) return [movesSoFar]

  // Given the current game state, find all the next possible moves
  const possibleMoves = findPossibleMoves(gameState)

  const solutions: Array<Array<Array<number>>> = []
  // For each possible move, execute the move on the game state, and recurse
  for (const move of possibleMoves) {
    const newGameState = { ...gameState }
    newGameState[move[0]] = false
    newGameState[move[1]] = false
    newGameState[move[2]] = true
    const solution = getSoluttions(newGameState, [...movesSoFar, move])
    if (solution.length > 0) solutions.push(...solution)
  }
  return solutions
}

const findAllSolutions = () => {
  const gameState: GameState = {
    1: false,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
    10: true,
    11: true,
    12: true,
    13: true,
    14: true,
    15: true,
  }
  const solutions = getSoluttions(gameState, [])
  console.log(countUniqueSolutions(solutions))
}

const countUniqueSolutions = (solutions: Array<Array<Array<number>>>) => {
  const uniqueSolutions = new Set()
  for (const solution of solutions) {
    uniqueSolutions.add(solutionToString(solution))
  }
  return uniqueSolutions.size
}

const solutionToString = (solution: Array<Array<number>>) => {
  return solution.map((move) => move.join(' ')).join('\n')
}

findAllSolutions()
