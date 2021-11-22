import React, { Component } from 'react'
import axios from 'axios'
const baseURL='https://localhost:9091/';
export default class Axios extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             users:[]
        }
    }
    componentDidMount(){
        const user=axios.get(`${baseURL}users`);
        this.setState({
            users:user
        })
        console.log(user);
        let userDetails={
            method:'Post',
            url:`${baseURL}register`,
            data:{

            }
        }
    }
    render() {
        console.log(this.state.users)
        return (
            <div>
                
            </div>
        )
    }
}
