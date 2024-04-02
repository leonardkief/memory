import Card from "./Card"
import { useState } from "react"
import MatchDisplay from "./MatchDisplay"
import Scoreboard from "./Scoreboard"
import GameOver from "./GameOver"

/* eslint-disable react/prop-types */
function Game({ images, players, repeatTurnOnMatch }) {
    // eslint-disable-next-line no-unused-vars
    const [allPlayers, setAllPlayers] = useState([...players])
    const [playerIdx, setPlayerIdx] = useState(
        Math.floor(Math.random() * allPlayers.length)
    )

    const [revealBlocked, setRevealBlocked] = useState(false)
    const [revealedCards, setRevealedCards] = useState([])
    const [revealedImgs, setRevealedImgs] = useState([])
    const [allRevealed, setAllRevealed] = useState([])

    const [gameOver, setGameOver] = useState(false)

    function toNextTurn() {
        if (playerIdx === allPlayers.length - 1) {
            setPlayerIdx(0)
        } else {
            setPlayerIdx((st) => st + 1)
        }
    }

    const [displayMatch, setDisplayMatch] = useState(false)
    function onClickCard(cardId) {
        const idString = cardId.join("-")
        const cardPath = cardId[0]

        if (!revealBlocked && !allRevealed.includes(cardPath)) {
            const newRevealed = [...revealedCards, idString]
            setRevealedCards(newRevealed)
            const newImgs = [...revealedImgs, cardPath]
            setRevealedImgs(newImgs)

            if (newImgs.length === 2) {
                const isMatch = newImgs[0] === newImgs[1]
                let timeout = 1000
                if (isMatch) {
                    timeout = 2000
                    const newAllRevealed = [...allRevealed, ...newImgs]

                    allPlayers[playerIdx].score += 1

                    setAllRevealed(newAllRevealed)
                    setDisplayMatch(true)

                    setTimeout(() => {
                        if (newAllRevealed.length === images.length) {
                            setGameOver(true)
                        }
                        if (!repeatTurnOnMatch) {
                            toNextTurn()
                        }
                    }, timeout + 200)
                } else {
                    console.log("Daneben")
                    setTimeout(() => {
                        toNextTurn()
                    }, timeout)
                }

                setRevealBlocked(true)
                setTimeout(() => {
                    setRevealedCards([])
                    setRevealedImgs([])
                    setDisplayMatch(false)
                    setRevealBlocked(false)
                }, timeout)
            }
        }
    }

    return (
        <div className="game-wrapper">
            <MatchDisplay show={displayMatch} />
            <Scoreboard playerIdx={playerIdx} players={allPlayers} />
            <main className={"game" + (gameOver ? " hide-game" : "")}>
                <section className="cards">
                    {images.map((img, i) => {
                        const cardId = [img.path, i]
                        const idString = cardId.join("-")
                        const isRevealed =
                            revealedCards.includes(idString) ||
                            allRevealed.includes(img.path)

                        return (
                            <Card
                                img={img}
                                isRevealed={isRevealed}
                                idString={idString}
                                revealedCards={revealedCards}
                                allRevealed={allRevealed}
                                randomOffset={img.randomOffset}
                                rotate={img.rotate}
                                onClick={() => {
                                    if (!isRevealed) onClickCard(cardId)
                                }}
                                key={i}
                            />
                        )
                    })}
                </section>
            </main>
            <GameOver display={gameOver} players={allPlayers} />
        </div>
    )
}

export default Game
