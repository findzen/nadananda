import React, { Component } from 'react';
import Tone from 'tone';
import Channel from './components/Channel';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);


  }


  render() {
    return (
      <main>
        <div>
          <Channel
            name="Left"
          ></Channel>

        </div>

      </main>
    );
  }
}

export default App;
