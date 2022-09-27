import './App.css';
import axios from 'axios';
import React, { Component } from 'react';


const CardList = (props) => (
  <div>
    {props.profiles.map((profile, index) =>
      <GithubCard {...profile} key={index} />
    )}
  </div>
);

class GithubCard extends Component {

  render() {
    const profile = this.props;

    return (
      <div className="github-profile">
        <img src={profile.avatar_url} />
        <div className='info'>
          <div className='name'> {profile.name}</div>
          <div className='company'>{profile.company}</div>
        </div>
      </div>
    );
  }
}


class Form extends Component {

  state = {
    userName: ''
  };
  //userNameInput= React.createRef(); 
  handleSubmit = async (event) => {
    event.preventDefault()
    /*const apiResponse = await fetch(`https://api.github.com/users/${this.state.userName}`, { method: 'GET' })
    apiResponse.json().then(res => {
     console.log(res);
    });*/
    const apiResponse = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmit(apiResponse.data);
    this.setState({ userName: '' });

  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <input type="text" placeholder='Github Username'
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          required
        />
        <button type='submit'>Add Card</button>
      </form>
    );
  }
}


class CardApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: []
    };
  }


  addNewProfile = (profileData) => {
    //console.log("app" , profileData);

    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData]
    }));
  };

  render() {
    return (
      <div>
        <h2>GITHUB Card App</h2>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}

export default CardApp;
