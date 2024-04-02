/* eslint-disable react/prop-types */
function MatchDisplay({ show }) {
    return (
        <div className={"match-display" + (show ? " show-match" : "")}>
            <h1 className="match-writing">MATCH!</h1>
        </div>
    )
}

export default MatchDisplay
