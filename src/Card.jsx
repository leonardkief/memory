/* eslint-disable react/prop-types */
// function Card({ img, isRevealed, onClick }) {
function Card({ img, isRevealed, randomOffset, rotate, onClick }) {
    return (
        <div
            className={"card" + (isRevealed ? " revealed" : "")}
            onClick={onClick}
            style={{
                top: `${randomOffset[0]}px`,
                left: `${randomOffset[1]}px`,
                transform: `rotateZ(${rotate}deg)`,
            }}
        >
            <div className="card-side card-image-side">
                <img
                    src={img.path}
                    alt="Memory-Karte"
                    className="card-img"
                    draggable={false}
                />
            </div>
            <div className="card-side card-cover-side">
                {/* <img
                    src="./img/memory-cover.jpg"
                    alt="Memory-Karte"
                    className="card-img"
                    draggable={false}
                /> */}
            </div>
        </div>
    )
}

export default Card
