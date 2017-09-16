const moneyLeft = (first, second, firstIsDrawAdvantage) => {
    let money = 100;
    let currentDrawAdvantage = firstIsDrawAdvantage;
    for (let i = 0; i<first.length; i++) {
        if (first[i] > second[i]) {
            money -= first[i];
        } else if (first[i] === second[i]) {
            if (currentDrawAdvantage) {
                money -= first[i];
                currentDrawAdvantage = false;
            } else {
                currentDrawAdvantage = true;
            }
        }
    }
    return money;
};

const playMove = (playerNumber, bottlePosition, playerOneBids = [], playerTwoBids = []) => {
    const myBids = playerNumber === 1 ? playerOneBids : playerTwoBids;
    const otherBids = playerNumber === 2 ? playerOneBids : playerTwoBids;
    const myMoney = moneyLeft(myBids, otherBids, playerNumber === 1);
    const otherMoney = moneyLeft(otherBids, myBids, playerNumber === 2);
    const bottleDistance = playerNumber === 1 ? bottlePosition : 10 - bottlePosition;

    const offensive = myMoney * ((3 + Math.random() * 3) * (10 - bottleDistance) / 100);
    const defensive = (5 + Math.random() * 10) / 100 * myMoney;
    const bet = Math.round(myMoney > otherMoney ? offensive : defensive);

    console.error(
        'MY', myMoney,
        'OTHER', otherMoney,
        'DISTANCE', bottleDistance,
        'OFF', Math.round(offensive),
        'DEF', Math.round(defensive),
        'BAL', myMoney - bet);

    return (bet < 1 && myMoney > 0 ? 1 : bet).toString();
};

let _input = '';

process.stdin.on('data', (chunk) => {
    _input = _input + chunk;
});

process.stdin.on('end', () => {
    const lines = _input.split('\n');
    const player = parseInt(lines[0]);
    const pos = parseInt(lines[1]);
    const fmoves = lines[2].split(' ').filter(Boolean).map(mv => parseInt(mv));
    const smoves = lines[3].split(' ').filter(Boolean).map(mv => parseInt(mv));
    const bid = playMove(player, pos, fmoves, smoves);
    process.stdout.write(bid);
});
