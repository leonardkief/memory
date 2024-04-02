/* eslint-disable react/prop-types */
function findWinners(players) {
    let winners = []
    let maxScore = -1
    for (const player of players) {
        if (player.score > maxScore) {
            maxScore = player.score
            winners = [{ ...player }]
        } else if (player.score === maxScore) {
            winners.push({ ...player })
        }
    }

    return winners
}

function GameOver({ display, players }) {
    const winners = findWinners(players)

    return (
        <div className={"game-over" + (display ? " show-game-over" : "")}>
            <div className="game-over-background"></div>
            <div className="game-over-window">
                <h1 className="game-over-title">Game Over!</h1>
                <h2 className="display-winner">
                    {winners.length === 1
                        ? "Der Gewinner ist"
                        : "Die Gewinner sind"}{" "}
                    {winners.map((pl) => pl.name).join(", ")} mit{" "}
                    {winners[0].score}{" "}
                    {winners[0].score > 1 ? "Punkten" : "Punkt"}!
                </h2>
                <ul className="display-scores">
                    {players.map((player, i) => (
                        <li
                            key={i}
                            style={
                                winners
                                    .map((pl) => JSON.stringify(pl))
                                    .includes(JSON.stringify(player))
                                    ? {
                                          boxShadow: "0 0 20px #cf9633",
                                      }
                                    : {}
                            }
                        >
                            {player.name}: {player.score}{" "}
                            {player.score > 1 ? "Punkte" : "Punkt"}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default GameOver
