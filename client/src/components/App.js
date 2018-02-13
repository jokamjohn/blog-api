import React, {Component} from 'react';

class App extends Component {

  state = {
    response: []
  };

  componentDidMount() {
    this.callApi()
        .then(res => this.setState({response: res}))
        .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/v1/posts');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            {this.state.response.map(post => <div>{post.title} : {post.body}</div>)}
          </p>
        </div>
    );
  }
}

export default App;
