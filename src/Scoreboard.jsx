import { useState } from "react"
import Player from "./Player"

/* eslint-disable react/prop-types */
function Scoreboard({ playerIdx, players }) {
    const [showScores, setShowScores] = useState(false)

    return (
        <section className="scoreboard">
            <h1 className="scoreboard-heading">Scoreboard</h1>
            <div className="show-scores-container">
                <button
                    className="btn show-scores"
                    onClick={() => setShowScores((st) => !st)}
                >
                    {showScores ? "Hide" : "Show"} Scores
                </button>
            </div>
            <ul className="all-players">
                {players.map((player, i) => (
                    <Player
                        key={i}
                        player={player}
                        showScore={showScores}
                        hasTurn={player.id === playerIdx}
                    />
                ))}
            </ul>
        </section>
    )
}

export default Scoreboard
