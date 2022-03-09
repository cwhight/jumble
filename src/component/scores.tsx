import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {score} from "./keypad";

export interface ScoresModalProps {
    show: boolean
    close: any
    scores: score
}

export const ScoresModal: React.FC<ScoresModalProps> = (props: ScoresModalProps) => {
    let {show, close, scores} = props
    const reset = () => {
        show = false
        close()
    }

    let todaysScore = JSON.parse(localStorage.getItem("todaysTime")) as number || 0
        let minutes = Math.floor(todaysScore / 60)
        let seconds = todaysScore % 60
    let timeMessage = `${minutes < 10 ? "0" + minutes : {minutes}}:${seconds < 10 ? "0" + seconds : seconds}`

    let hints = JSON.parse(localStorage.getItem("hints")) as string [] || ["","","","","","","","",""]
    let tiles: string[] = []
    for (let i=0; i<9;i++) {
        if(hints[i] == "") {
            tiles.push(`🟩`)
        } else {
            tiles.push("🟧")
        }
    }

    const streak = localStorage.getItem("currentStreak")
    const maxStreak = localStorage.getItem("maxStreak")

    const [showCopyMsg, setShowCopyMsg] = useState(false);
    const [msg, setMsg] = useState("");

    async function copyToClipboard() {

        const shareString = `🔤 ${new Date(Date.now()).toLocaleString().split(',')[0]} 🔤
${todaysScore != 0 ? `Today's Time: 🎉 ${timeMessage} 🎉` : ""}
${todaysScore != 0 ? tiles.join(""): ""}
https://www.jumble-game.co.uk`;

        setMsg("Copied to clipboard!");
        setShowCopyMsg(true);
        setTimeout(() => setShowCopyMsg(false), 2000);
        if ("clipboard" in navigator) {
            return await navigator.clipboard.writeText(shareString);
        } else {
            return document.execCommand("copy", true, shareString);
        }
    }
    const copyMessage = showCopyMsg ? <span>{msg}</span> : null

    const buttons = <div className={"w-100 mt-3 d-flex flex-column"}>
        <div className={"d-flex justify-content-around w-100"}>

            <button onClick={() => reset()} className={"mr-3 btn btn-tertiary"}>Close</button>
            <button onClick={() => copyToClipboard()} className={"btn btn-primary"}>Share</button>
        </div>
        <div>{copyMessage}</div>

    </div>

    const className = show ? "modal-cont display-block" : "modal-cont display-none"

    return <div className={className}>
        <div className={"p-3 modal-main-cont d-flex flex-column justify-content-around"}>

            <h2 className={"text-center"}>Welcome to Jumble</h2>
            <p className={"text-center"}>A daily anagram</p>
            { todaysScore != 0 ? <h4><em>Today's Time:</em> {todaysScore + " Seconds"} </h4> : null}

            <h4 className={"text-start"}><em>Games played:</em> {scores.gamesPlayed}</h4>
            <h4 className={"text-start"}><em>Games won:</em> {scores.gamesWon}</h4>
            <h4 className={"text-start"}><em>Average Time:</em> {scores.gamesWon > 0 ? Math.round(scores.averageTime) + " Seconds" : "N/A"}</h4>
            <h4 className={"text-start"}><em>Best Score:</em> {scores.gamesWon > 0 ? scores.bestTime + " Seconds": "N/A"}</h4>
            <h4 className={"text-start"}><em>Streak:</em> {streak}</h4>
            <h4 className={"text-start"}><em>Max Streak:</em> {maxStreak}</h4>
            {buttons}

            <span className={"mt-3"}>Enjoying Jumble? Why not try our sister game <a href={"https://www.numble-game.co.uk"}>Numble</a></span>
        </div>
    </div>
}
