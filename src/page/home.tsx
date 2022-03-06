import React from "react";
import {Link, RouteComponentProps} from "@reach/router";
import Cookies from 'js-cookie';
import {KeyPad, score} from "../component/keypad";
import axios from "axios"
import {v4 as uuidv4} from 'uuid';
import Header from "../component/header";
import {FirstModal} from "../component/first_modal";
import {ScoresModal} from "../component/scores";


interface HomeProps {
    scores: score
    hasUpToDateScores: boolean
    user: string
    letters: letters
    isFetching: boolean
    showModal: boolean
    showScoresModal: boolean
}

interface letters {
    jumble: string[]
    target: string
}

export class Home extends React.Component<RouteComponentProps, HomeProps> {
    constructor(props: RouteComponentProps) {
        super(props);

        let cookieName = "jumbleId";
        let userId = Cookies.get(cookieName)
        if (userId == undefined) {
            let newId = uuidv4().toString();
            Cookies.set(cookieName, newId)
            userId = newId
        }

        this.state = {
            scores: JSON.parse(localStorage.getItem("scores")) as score || {} as score,
            hasUpToDateScores: false,
            user: userId,
            isFetching: true,
            letters: {
                jumble: [],
                target: null
            },
            showModal: true,
            showScoresModal: false,
        };
    }

    componentDidMount() {
        this.fetchNumbers();
        this.setState({showModal: this.state.scores.gamesPlayed == 0})
    }

    async fetchNumbers() {
        try {
            this.setState({...this.state, isFetching: true});
            // const response = await axios.get("https://numble-game.herokuapp.com/numbers");
            this.setState({letters: {jumble: ["m","e","i","g","r","a","n","t","s"], target: "emigrants"}, isFetching: false});
        } catch (e) {
            console.log(e);
            this.setState({...this.state, isFetching: false});
        }
    };

    showModal() {
        this.setState({showModal: !this.state.showModal})
    }

    showScoresModal() {
        this.setState({showScoresModal: !this.state.showScoresModal})
    }


    render() {
        return (
            <div>
                <Header showScores={() => this.showScoresModal()} showRules={() => this.showModal()}/>
                <FirstModal close={() => this.setState({showModal: false})} show={this.state.showModal}/>
                <ScoresModal scores={this.state.scores} close={() => this.setState({showScoresModal: false})}
                             show={this.state.showScoresModal}/>
                <KeyPad
                    userId={this.state.user}
                    jumble={this.state.letters.jumble}
                    target={this.state.letters.target}
                />
            </div>
        );
    }
}
