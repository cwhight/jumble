import React from "react";
import {Link, RouteComponentProps} from "@reach/router";
import Cookies from 'js-cookie';
import {KeyPad} from "../component/keypad";
import axios from "axios"

interface HomeProps {
    numbers: numbers
    isFetching: boolean
}

interface numbers {
    bigNums: number[]
    smallNums: number[]
    target: number
}

export class Home extends React.Component<RouteComponentProps, HomeProps> {
    constructor(props: RouteComponentProps) {
        super(props);

        this.state = {
            isFetching: true,
            numbers: {
                bigNums: [],
                smallNums: [],
                target: null
            }
        };
    }

    componentDidMount() {
        this.fetchUsers();
    }

    async fetchUsers() {
        try {
            this.setState({...this.state, isFetching: true});
            const response = await axios.get("https://numble-game.herokuapp.com/numbers", {headers: {
                    "Access-Control-Allow-Credentials": true,
                    "Access-Control-Allow-Origin": "*"
                }});
            this.setState({numbers: response.data, isFetching: false});
            console.log(response.data)
        } catch (e) {
            console.log(e);
            this.setState({...this.state, isFetching: false});
        }
    };

    render() {
        return (
            <KeyPad bigNums={this.state.numbers.bigNums} smallNums={this.state.numbers.smallNums} target={this.state.numbers.target}/>
        );
    }
}
