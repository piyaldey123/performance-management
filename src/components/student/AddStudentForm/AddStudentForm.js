import React, { Component } from "react";
import axios from "axios";

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_name: "",
      email_id: "",
      user_id:"",
      role:"",
      contact_no:"",
      password: "",
      registrationErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { user_name,email_id,user_id,role,contact_no, password } = this.state;

    axios
      .post(
        "http://localhost:9091/register",
        {
          user: {
            user_name:user_name,
            email_id: email_id,
            user_id: user_id,
            role: role,
            contact_no: contact_no,
            password: password,
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.status === "created") {
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        console.log("registration error", error);
      });
    event.preventDefault();
    console.log(user_id);
    
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <input
            type="user_name"
            name="user_name"
            placeholder="user_name"
            value={this.state.user_name}
            onChange={this.handleChange}
            required
          />
          <input
            type="email_id"
            name="email_id"
            placeholder="Email-Id"
            value={this.state.email_id}
            onChange={this.handleChange}
            required
          />
          <input
            type="user_id"
            name="user_id"
            placeholder="User-Id"
            value={this.state.user_id}
            onChange={this.handleChange}
            required
          />
          <input
            type="role"
            name="role"
            placeholder="Role"
            value={this.state.role}
            onChange={this.handleChange}
            required
          />
          <input
            type="contact_no"
            name="contact_no"
            placeholder="Contact No."
            value={this.state.contact_no}
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          

          <button type="submit">Register</button>
        </form>
        
      </div>
      
    );
    
  }
}
