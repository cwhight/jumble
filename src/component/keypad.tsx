import React, {useEffect, useState} from "react"
import {Col, Container, Row} from "react-bootstrap";
import {Number} from "./number";
import {Action} from "./action";
import {Working} from "./working";
import calculate from "../utils/calculate";
import {FinishedModal} from "./finished_modal";
import {getRandomArbitrary} from "../utils/number";
import store from "../redux/store";

function isNumber(item: any) {
    return !!item.match(/[0-9]+/);
}

interface finished {
    finished: boolean,
    success: boolean
}

interface KeyPadProps {
    bigNums: number[]
    smallNums: number[]
    target: number
}

export const KeyPad: React.FC<KeyPadProps> = (props: KeyPadProps) => {

    const {bigNums, smallNums, target} = props
    // const data = store().getState()
    // const [input, setIsInput] = useState("");

    const [numbers, setNewNumbers] = useState<number[]>([])

    const [usedKeys, setUsedKeys] = useState<number[]>([])


    const [finished, setIsFinished] = useState<finished>({finished: false, success: false})

    // const target = getRandomArbitrary(101, 999)

    const bigs = [50,75,25,125,150,100];

    const big1 = bigNums[0]
    const big2 = bigNums[1]

    const small1 = smallNums[0]
    const small2 = smallNums[1]
    const small3 = smallNums[2]
    const small4 = smallNums[3]

    const [totals, setTotals] = useState({equals: false, total: null, next: null, operation: null});
    useEffect(() => {
        setTotals({
            equals: false,
            total: null,
            next: null,
            operation: null,
        });
    }, []);

    const clear = () => {
        setTotals({
            equals: false,
            total: null,
            next: null,
            operation: null,
        })
        setNewNumbers([])
        setUsedKeys([])
        setIsFinished({
            finished: false,
            success: false
        })
    }

    const handleClick = (value: string, key?: number) => {
        if (value == "AC") {
            clear()
        }

        if (value == "<-") {
            if (totals.next) {
                setTotals(
                    {
                        equals: false,
                        total: totals.total,
                        next: null,
                        operation: totals.operation
                    }
                )
                usedKeys.pop()
            } else if (totals.operation) {
                setTotals(
                    {
                        equals: false,
                        total: totals.total,
                        next: totals.next,
                        operation: null
                    }
                )
            }
            return
        }

        if (isNumber(value) && totals.next != null) {
            usedKeys.pop()
        }

        const newTotals = calculate(totals, value)

        setTotals(newTotals);
        if (newTotals.equals) {
            if (newTotals.total == target) {
                setIsFinished({
                    finished: true,
                    success: true
                })
                return
            }

            numbers.push(newTotals.total)
            // setNewNumbers(numbers.push(totals.total))
            setTotals({
                equals: false,
                total: null,
                next: null,
                operation: null,
            })
            if (usedKeys.length >= (6 + newNums.length)) {
                setIsFinished({
                    finished: true,
                    success: false
                })
            }
        }
        if (key != null) {
            usedKeys.push(key)
            // setUsedKeys(usedKeys)
        }
    };

    var newNums = numbers.map((num, i) => {
        return <Number onClick={() => handleClick(num.toString(), 7 + i)} value={num} used={usedKeys.includes(7 + i)}/>
    })

    // var modal = finished.finished ? <FinishedModal success={finished.success}/> : null
    const form =
        <Container className={"full-height"}>
            <FinishedModal clear={() => clear()} show={finished.finished} success={finished.success}/>
            <div>{totals.next}</div>
            <Row className={"full-height justify-content-center align-items-center"}>
                <Col sm={12} lg={6} className={"d-flex h-100 align-items-center"}>
                    <div className="p-3 calculator-container">
                        <div className={"p-3 text-center my-1 mx-2"}>
                            <h1>{target}</h1>
                        </div>
                        <Working totals={totals}/>
                        <div className={"d-flex justify-content-around"}>
                            {newNums}
                        </div>
                        <div className={"d-flex justify-content-around"}>
                            <Number onClick={() => handleClick(big1.toString(), 1)} value={big1} used={usedKeys.includes(1)}/>
                            <Number onClick={() => handleClick(big2.toString(), 2)} value={big2} used={usedKeys.includes(2)}/>
                            <Number onClick={() => handleClick(small1.toString(), 3)} value={small1} used={usedKeys.includes(3)}/>
                        </div>
                        <div className={"mb-3 d-flex justify-content-around"}>
                            <Number onClick={() => handleClick(small2.toString(), 4)} value={small2} used={usedKeys.includes(4)}/>
                            <Number onClick={() => handleClick(small3.toString(), 5)} value={small3} used={usedKeys.includes(5)}/>
                            <Number onClick={() => handleClick(small4.toString(), 6)} value={small4} used={usedKeys.includes(6)}/>
                        </div>
                        <div className={"d-flex justify-content-around"}>
                            <Action onClick={() => handleClick("x")} method={"x"}/>
                            <Action onClick={() => handleClick("÷")} method={"÷"}/>
                        </div>
                        <div className={"d-flex justify-content-around"}>
                            <Action onClick={() => handleClick("+")} method={"+"}/>
                            <Action onClick={() => handleClick("-")} method={"-"}/>
                        </div>
                        <div className={"d-flex justify-content-stretch align-items-stretch"}>
                            <Action onClick={() => handleClick("=")} method={"="}/>
                            <Action onClick={() => handleClick("AC")} method={"AC"}/>
                            <Action onClick={() => handleClick("<-")} method={"<-"}/>
                        </div>
                    </div>

                </Col>
            </Row>
        </Container>

    return form
}

