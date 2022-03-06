import React, {useState} from "react"
import {Letter} from "./letter";
import {FinishedModal} from "./finished_modal";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import ReactGA from 'react-ga';
import {faBackspace, faRefresh,} from '@fortawesome/free-solid-svg-icons'
import Pause from "./pause";
import Play from "./plat";
import Timer from "react-compound-timerv2";

const TRACKING_ID = "UA-221463714-1"; // YOUR_OWN_TRACKING_ID

ReactGA.initialize(TRACKING_ID);

interface finished {
    finished: boolean,
    success: boolean
}

export interface score {
    gamesWon: number
    gamesPlayed: number
    averageTime: number
    bestTime: number
}

interface KeyPadProps {
    userId: string
    target: string
    jumble: string[]
}

export const KeyPad: React.FC<KeyPadProps> = (props: KeyPadProps) => {

    const {userId, target, jumble} = props

    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [typedLetters, setTypedLetters] = useState<string[]>(JSON.parse(localStorage.getItem("typedLetters")) as string[] || [])

    const [usedKeys, setUsedKeys] = useState<number[]>(JSON.parse(localStorage.getItem("usedKeys")) as number[] || [])

    const parsedElapsedTime = JSON.parse(localStorage.getItem("elapsedTime")) as number || 0
    const [elapsedTimeState, setElapsedTimeState] = useState<number>(parsedElapsedTime)

    const [finished, setIsFinished] = useState<finished>({finished: false, success: false})
    const [hasPlayedToday, setHasPlayedToday] = useState<boolean>(false)
    const [solved, setSolved] = useState(JSON.parse(localStorage.getItem("solved")) as boolean || false)

    const [hasBeenResetToday, setHasBeenResetToday] = useState<boolean>(false)

    let scores = JSON.parse(localStorage.getItem("scores")) as score
    if (scores == undefined) {
        let scoresSet = {
            averageTime: 0,
            gamesPlayed: 0,
            gamesWon: 0,
            bestTime: 0
        };
        localStorage.setItem("scores", JSON.stringify(scoresSet))
        scores = scoresSet
    }

    const [currentStreak, setCurrentStreak] = useState<number>(JSON.parse(localStorage.getItem("currentStreak")) as number || 0)
    const [maxStreak, setMaxStreak] = useState<number>(JSON.parse(localStorage.getItem("maxStreak")) as number || 0)

    let lastPlayed = localStorage.getItem("lastPlayed")
    const lastWon = parseInt(localStorage.getItem("lastWon"))
    let today = new Date().setHours(0, 0, 0, 0)
    let yesterday = today - 86400000
    const lastPlayedInt = parseInt(lastPlayed)

    const cacheTypedLetters = (letters: string[]) => {
        setTypedLetters(letters)
        localStorage.setItem("typedLetters", JSON.stringify(letters))
    }

    const cacheUsedKeys = (keys: number[]) => {
        setUsedKeys(keys)
        localStorage.setItem("usedKeys", JSON.stringify(keys))
    }

    const cacheTimeRemaining = (elapsed: number) => {
        localStorage.setItem("elapsedTime", JSON.stringify(elapsed))
    }

    const clear = () => {
        cacheTypedLetters([])
        cacheUsedKeys([])
    }

    if (lastPlayedInt < today && !hasBeenResetToday) {
        cacheTypedLetters([])
        cacheUsedKeys([])
        setSolved(false)
        localStorage.setItem("solved", "false")
        localStorage.setItem("todaysTime", "0")
        setElapsedTimeState(0)
        cacheTimeRemaining(0)
        setHasBeenResetToday(true)
    }

    let played: boolean
    if (lastPlayedInt >= today && !hasPlayedToday) {
        setHasPlayedToday(true)
        played = true
    }

    if (!hasPlayedToday && !played) {
        if (solved) {
            setSolved(false)
            localStorage.setItem("solved", "false")
            localStorage.setItem("todaysTime", "0")
        }
    }

    const gameOver = (success: boolean) => {
        ReactGA.event({
            category: 'Game',
            action: 'Won',
            value: elapsedTimeState
        })

        localStorage.setItem("todaysTime", elapsedTimeState.toString())
        saveScore(success, elapsedTimeState)
        let newStreak: number
        if (lastWon > yesterday) {
            newStreak = currentStreak + 1;
        } else {
            newStreak = 1
        }
        localStorage.setItem("lastWon", JSON.stringify(Date.now()))

        localStorage.setItem("currentStreak", newStreak.toString())
        setCurrentStreak(newStreak)

        if (newStreak > maxStreak) {
            localStorage.setItem("maxStreak", newStreak.toString())
            setMaxStreak(newStreak)
        }

        localStorage.setItem("finished", "true")

        setIsFinished({finished: true, success: true})
        setSolved(true)
        localStorage.setItem("solved", "true")

        setIsPlaying(false)
    }

    const saveScore = (success: boolean, timeTaken: number) => {
        if (success) {
            if (scores.gamesWon == 0 || scores.gamesWon == null) {
                scores.averageTime = timeTaken
            } else {
                scores.averageTime = (scores.averageTime * scores.gamesWon + timeTaken) / (scores.gamesWon + 1)
            }
            scores.gamesWon += 1
        }

        if ((timeTaken < scores.bestTime || scores.bestTime == undefined || scores.bestTime == 0) && success) {
            scores.bestTime = timeTaken
        }
        scores.gamesPlayed += 1

        localStorage.setItem("scores", JSON.stringify(scores))
        localStorage.setItem("lastPlayed", JSON.stringify(Date.now()))

        setHasPlayedToday(true)
    }

    const handleClick = (value: string, key?: number) => {
        if (solved) {
            return
        }

        if (!isPlaying) {
            return
        }

        if (value == "AC") {
            clear()
            return
        }

        if (value == "<-") {
            usedKeys.pop()
            cacheUsedKeys(usedKeys)
            typedLetters.pop()
            cacheTypedLetters(typedLetters)
            return
        }

        typedLetters.push(value)
        cacheTypedLetters(typedLetters)
        usedKeys.push(key)
        cacheUsedKeys(usedKeys)

        if (typedLetters.join("") == target) {
            gameOver(true)
        }
        return
    };

    let newLetters = typedLetters.map((letter, i) => {
        return <Letter solved={solved} solution={true} isPlaying={isPlaying}
                       onClick={() => {
                       }} value={letter}
                       used={false}/>
    })

    let letters = jumble.map((letter, i) => {
        return <Letter solved={solved} solution={false} isPlaying={isPlaying}
                onClick={() => handleClick(letter, i+1)} value={letter}
                used={usedKeys.includes(i+1)}/>
    })

    let missing = 8 - typedLetters.length

    for (let i = 0; i <= missing; i++) {
        newLetters.push(<Letter solved={solved} solution={true} isPlaying={isPlaying}
                                onClick={() => {
                                }} value={""}
                                used={false}/>)
    }

    const play = () => {
        localStorage.setItem("lastPlayed", JSON.stringify(Date.now()))
        if (solved) {
            return
        }

        setIsPlaying(!isPlaying)
    }

    let timerRef = React.createRef<HTMLDivElement>()
    const form =
        <div className={"game-wrapper h-100 d-flex flex-column justify-content-around align-items-center"}>
            <div>
                <FinishedModal currentStreak={currentStreak} maxStreak={maxStreak}
                               timerRef={timerRef} timeTaken={elapsedTimeState} score={scores}
                               clear={() => {
                               }}
                               show={finished.finished} success={finished.success}/>

                <div ref={timerRef} className={`timer-wrapper mb-3`}>
                    <Timer
                        onStart={() => play()}
                        onPause={() => play()}
                        initialTime={parsedElapsedTime * 1000} startImmediately={false}
                    >
                        {({start, pause, getTime}: any) => {
                                const elapsedTime = Math.floor(getTime() / 1000)
                                setElapsedTimeState(elapsedTime)
                                if (solved) {
                                    pause()
                                }
                                return (
                                    <React.Fragment>
                                        <div className={"d-flex flex-column"}>
                                            <div className={"stopwatch d-flex"}>
                                                <h1>{elapsedTime < 600 ? "0" : ""}<Timer.Minutes/>:</h1>
                                                <h1>{elapsedTime % 60 < 10 ? "0" : ""}<Timer.Seconds/></h1>
                                            </div>
                                            <br/>
                                            <div className={"mb-3"}>
                                                {isPlaying ? <Pause onPlayerClick={() => {
                                                    pause()
                                                    cacheTimeRemaining(elapsedTime)
                                                    setElapsedTimeState(elapsedTime)
                                                }}/> : <Play onPlayerClick={start}/>}
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            }
                        }

                    </Timer>
                </div>
            </div>


            <div className="game-board d-flex flex-column justify-content-around">
                <div className={"d-flex flex-column justify-content-around"}>
                    <div className={"d-flex justify-content-end"}>
                        {newLetters}
                    </div>
                    <div className={"d-flex justify-content-end"}>
                        {letters}
                    </div>
                </div>
            </div>

            <div className={"game-board d-flex justify-content-between"}>

                <button className={"round-clickable"} onClick={() => handleClick("<-")}><FontAwesomeIcon
                    icon={faBackspace}/></button>
                <button className={"round-clickable"} onClick={() => handleClick("AC")}><FontAwesomeIcon
                    icon={faRefresh}/></button>
            </div>
        </div>

    return form
}


