import React, { Component } from 'react';

import Channel from './components/Channel';
import Scope from './components/Scope';
import Spectrum from './components/Spectrum';
import Tone from './Tone';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();

    this.analyzer = this.audioContext.createAnalyser();
    this.analyzer.fftSize = 2048;

    this.tone = new Tone({ audioContext: this.audioContext });
    this.tone.osc.connect(this.analyzer);
  }

  render() {
    return (
      <main>
        <Scope
          analyzer={this.analyzer}
          audioContext={this.audioContext}
        ></Scope>
        <Spectrum
          analyzer={this.analyzer}
          audioContext={this.audioContext}
        ></Spectrum>

        <div>
          <Channel
            tone={this.tone}
            name="Left"
          ></Channel>
        </div>
      </main>
    );
  }
}

export default App;
