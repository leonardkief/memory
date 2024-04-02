/* eslint-disable react/prop-types */
function Player({ player, hasTurn, showScore }) {
    return (
        <li className={"player" + (hasTurn ? " has-turn" : "")}>
            <div className="player-name">{player.name}</div>
            {showScore && <div className="player-score">{player.score}</div>}
        </li>
    )
}

export default Player
