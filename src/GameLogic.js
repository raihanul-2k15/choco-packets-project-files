function randint(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let packets = []
let turn = 1
let winner = null

const min_n=3
const max_n=7
const min_height=1
const max_height=12
  
function game_over() {
    return packets.reduce((a,b) => a + b, 0) === 0
}

function XOR_Sum() {
    return packets.reduce((a, b) => a ^ b, 0)
}

function getRandomMove() {
    let nonZeroPackets = packets.map((v, i) => {return {v: v, i: i}}).filter(({v, i}) => v !== 0)
    let x = randint(0, nonZeroPackets.length - 1)
    let p = nonZeroPackets[x].i
    let n_chocos = randint(1, nonZeroPackets[x].v)
    return { packetNo: p, noOfChocos: n_chocos}
}

function make_move({ packetNo, noOfChocos }) {
    if (game_over())
        return
        
    if (packetNo < 0 || packetNo >= packets.length)
        return TypeError(`Packet number must be between 0 and ${packets.length}.`)
    
    if (noOfChocos < 1 || noOfChocos > packets[packetNo])
        return TypeError(`There are only ${packets[packetNo]} chocolates in packet ${packetNo}.`)
    
    packets[packetNo] -= noOfChocos // the actual move

    if (game_over())
        winner = turn

    turn = 3 - turn // alternate between 1 and 2
}

function new_game() {
    packets = []
    turn = 1
    winner = null
    let n = randint(min_n,max_n)
    for (let i=0; i<n; i++)
        packets.push(randint(min_height, max_height))
}

function AI_move() {
    let xorSum = XOR_Sum()
    if (xorSum !== 0) {
        for (let i=0; i<packets.length; i++) {
            let n_choco = packets[i]
            if ((n_choco ^ xorSum) < n_choco) {
                make_move({ packetNo: i, noOfChocos: n_choco - (n_choco ^ xorSum) })
                return
            }
        }
        make_move(getRandomMove())
    } else {
        make_move(getRandomMove())
    }
}

function human_move(pkt_no, n_choco) {
    make_move({ packetNo: pkt_no, noOfChocos: n_choco })
}

export { packets, turn, winner, new_game, human_move, AI_move }
