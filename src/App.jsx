import { useState } from "react"
import "./App.css"
// import ConfigWindow from "./ConfigWindow"
import Game from "./Game"

function choicepop(arr) {
    const randIndex = Math.floor(Math.random() * arr.length)
    const randEl = arr[randIndex]
    arr.splice(randIndex, 1)
    return randEl
}

function randomize(arr) {
    // console.log("randomize")
    const randomized = []
    const initialLen = arr.length
    for (let i = 0; i < initialLen; i++) {
        randomized.push(choicepop(arr))
    }
    return randomized
}

function randInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1))
}

const cardImgs = [
    { path: "./img/memory-1.jpg" },
    { path: "./img/memory-2.jpg" },
    { path: "./img/memory-3.jpg" },
    { path: "./img/memory-4.jpg" },
    { path: "./img/memory-5.jpg" },
    { path: "./img/memory-6.jpg" },
    { path: "./img/memory-7.jpg" },
    { path: "./img/memory-8.jpg" },
    { path: "./img/memory-9.jpg" },
    { path: "./img/memory-10.jpg" },
    { path: "./img/memory-11.jpg" },
    { path: "./img/memory-12.jpg" },
    { path: "./img/memory-13.jpg" },
    { path: "./img/memory-14.jpg" },
    { path: "./img/memory-15.jpg" },
    { path: "./img/memory-16.jpg" },
    { path: "./img/memory-17.jpg" },
    { path: "./img/memory-18.jpg" },
    { path: "./img/memory-19.jpg" },
    { path: "./img/memory-20.jpg" },
    { path: "./img/memory-21.jpg" },
    { path: "./img/memory-22.jpg" },
    { path: "./img/memory-23.jpg" },
]

function App() {
    // Setting the pair count
    const minPairs = 2
    const maxPairs = cardImgs.length

    const [pairsCount, setPairsCount] = useState(null)
    const [currentPairs, setCurrentPairs] = useState(
        Math.floor(cardImgs.length / 2) >= 8
            ? Math.floor(cardImgs.length / 2)
            : cardImgs.length >= 8
            ? 8
            : cardImgs.length
    )

    function changeCurrentPairs(amount) {
        if (currentPairs > maxPairs) {
            setCurrentPairs(maxPairs)
            return
        } else if (currentPairs < minPairs) {
            setCurrentPairs(minPairs)
            return
        }

        if (amount > 0 && currentPairs < maxPairs) {
            setCurrentPairs((st) => st + amount)
        } else if (amount < 0 && currentPairs > minPairs) {
            setCurrentPairs((st) => st + amount)
        }
    }

    // Setting the player count
    const minPlayers = 2
    const maxPlayers = Math.ceil(maxPairs / 4)

    const [playerCount, setPlayerCount] = useState(null)
    const [currentPlayers, setCurrentPlayers] = useState(2)

    function changeCurrentPlayers(amount) {
        if (currentPlayers > maxPlayers) {
            setCurrentPlayers(maxPlayers)
            return
        } else if (currentPlayers < minPlayers) {
            setCurrentPlayers(minPlayers)
            return
        }

        if (amount > 0 && currentPlayers < maxPlayers) {
            setCurrentPlayers((st) => st + amount)
        } else if (amount < 0 && currentPlayers > minPlayers) {
            setCurrentPlayers((st) => st + amount)
        }
    }

    // Submitting the form
    function onSubmitForm(e) {
        e.preventDefault()
        setPairsCount(currentPairs)
        setPlayerCount(currentPlayers)
    }

    // Setting if player is allowed to play again after matching cards
    const [repeatTurnOnMatch, setRepeatTurnOnMatch] = useState(true)

    // set images
    let images
    if (pairsCount) {
        const imagesCopy = []
        for (const image of cardImgs) {
            imagesCopy.push({ ...image })
        }

        const imagesUnique = []
        for (let i = 0; i < pairsCount; i++) {
            imagesUnique.push(choicepop(imagesCopy))
        }

        const newImages = []
        for (const image of [...imagesUnique, ...imagesUnique]) {
            newImages.push({ ...image })
        }
        for (const image of newImages) {
            image.rotate = randInt(-15, 15)
            image.randomOffset = [randInt(-10, 10), randInt(-10, 10)]
        }
        // eslint-disable-next-line no-unused-vars
        images = randomize(newImages)
    }

    return (
        <div className="App">
            <h1 className="page-heading">
                <span>Memory</span>
            </h1>

            {pairsCount ? (
                <Game
                    images={images}
                    players={Array.from(Array(playerCount).keys()).map(
                        (player) => ({
                            id: player,
                            name: `Spieler ${player + 1}`,
                            score: 0,
                        })
                    )}
                    repeatTurnOnMatch={repeatTurnOnMatch}
                />
            ) : (
                <div className="game-config">
                    <div className="background"></div>
                    <div className="window">
                        <h1 className="config-heading">Einstellungen</h1>
                        <form className="config-form" onSubmit={onSubmitForm}>
                            <h2 className="setting-heading">
                                Anzahl der Paare
                            </h2>
                            <div className="config-setting config-input">
                                <button
                                    className="btn change-current-count"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        changeCurrentPairs(-1)
                                    }}
                                >
                                    <i className="fa-solid fa-minus"></i>
                                </button>
                                <input
                                    type="number"
                                    className="text-input pair-count"
                                    min={minPairs}
                                    max={maxPairs}
                                    value={currentPairs}
                                    placeholder="Anzahl der Paare"
                                    tabIndex={1}
                                    onChange={(e) =>
                                        setCurrentPairs(+e.target.value)
                                    }
                                />
                                <button
                                    className="btn change-current-count"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        changeCurrentPairs(+1)
                                    }}
                                >
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                                <button
                                    className="btn set-max-pairs"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setCurrentPairs(maxPairs)
                                    }}
                                >
                                    MAX
                                </button>
                            </div>
                            <h2 className="setting-heading">Spielerzahl</h2>
                            <div className="config-setting config-input">
                                <button
                                    className="btn change-current-count"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        changeCurrentPlayers(-1)
                                    }}
                                >
                                    <i className="fa-solid fa-minus"></i>
                                </button>
                                <input
                                    type="number"
                                    className="text-input pair-count"
                                    min={minPlayers}
                                    max={maxPlayers}
                                    value={currentPlayers}
                                    placeholder="Anzahl der Paare"
                                    tabIndex={2}
                                    onChange={(e) =>
                                        setCurrentPlayers(+e.target.value)
                                    }
                                />
                                <button
                                    className="btn change-current-count"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        changeCurrentPlayers(+1)
                                    }}
                                >
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                            </div>
                            <div className="config-setting config-checkbox">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="repeat-turn-on-match"
                                        className="input-checkbox repeat-turn-on-match"
                                        checked={repeatTurnOnMatch}
                                        onChange={() =>
                                            setRepeatTurnOnMatch((st) => !st)
                                        }
                                    />
                                    <span>
                                        Player can turn again on matching cards
                                    </span>
                                </label>
                            </div>
                            <div className="config-setting apply-config">
                                <button className="btn finish-config">
                                    Bestätigen
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
