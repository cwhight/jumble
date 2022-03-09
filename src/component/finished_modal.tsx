import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {score} from "./keypad";
import {exportComponentAsJPEG} from "react-component-export-image";

export interface FinishedModalProps {
    timeTaken: number
    score: score
    clear: any
    success: boolean
    show: boolean
    timerRef: any
    currentStreak: number
    maxStreak: number
    hints: string[]
}

export const FinishedModal: React.FC<FinishedModalProps> = (props: FinishedModalProps) => {
    const {success, clear, score, timeTaken, timerRef, currentStreak, maxStreak, hints} = props
    let show = props.show
    const reset = () => {
        clear()
        show = false
    }

    let tiles: string[] = []
    for (let i=0; i<9;i++) {
        if(hints[i] == "") {
            tiles.push(`🟩`)
        } else {
            tiles.push("🟧")
        }
    }

    const [showCopyMsg, setShowCopyMsg] = useState(false);
    const [msg, setMsg] = useState("");
    let minutes = Math.floor(timeTaken / 60)
    let seconds = timeTaken % 60
    let timeMessage = `${minutes < 10 ? "0" + minutes : {minutes}}:${seconds < 10 ? "0" + seconds : seconds}`


    async function copyToClipboard() {

        const shareString = `🔤 ${new Date(Date.now()).toLocaleString().split(',')[0]} 🔤
${success ? `Today's Time: 🎉 ${timeMessage} 🎉` : ""}
${tiles.join("")}
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

    const message = success ? `Great Work - you solved it in ${timeTaken} seconds` : "Unlucky this time"

    const copyMessage = showCopyMsg ? <span>{msg}</span> : null

    const buttons = success ?
        <div className={"mt-3"}>
            <Button onClick={() => copyToClipboard()} className={"w-100 btn"}>Share</Button>
            <div>{copyMessage}</div>
        </div>
        : <div className={"mt-3"}>
            <Button onClick={reset} className={"btn"}>Try Again</Button>
        </div>

    const className = show ? "modal-cont display-block" : "modal-cont display-none"

    return <div className={className} >
        <div className={"p-3 modal-main-cont d-flex flex-column justify-content-around"}>

            <h2 className={"text-center"}>{message}</h2>
            <h4><em>Games played:</em> {score.gamesPlayed}</h4>
            <h4><em>Games won:</em> {score.gamesWon}</h4>
            <h4><em>Average Time:</em> {score.gamesWon > 0 ? Math.round(score.averageTime) + " Seconds" : "N/A"}</h4>
            <h4><em>Best Score:</em> {score.gamesWon > 0 ? score.bestTime + " Seconds" : "N/A"}</h4>
            <h4><em>Streak:</em> {currentStreak}</h4>
            <h4><em>Max Streak:</em> {maxStreak}</h4>
            {buttons}

            <span className={"mt-3"}>Enjoying Jumble? Why not try our sister game <a href={"https://www.numble-game.co.uk"}>Numble</a></span>
        </div>
    </div>
}
