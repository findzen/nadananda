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

    this.tones = [];

    // for (let i in [0, 1]) {
    for (let i in [0]) {
      this.tones.push(this.createTone());
    }

    window.addEventListener('touchstart', () => {
      // create empty buffer
      let buffer = this.audioContext.createBuffer(1, 1, 22050);
      let source = this.audioContext.createBufferSource();

      source.buffer = buffer;
      source.connect(this.audioContext.destination);
      source.noteOn(0);
    }, false);
  }

  createTone() {
    let tone = new Tone({ audioContext: this.audioContext });
    tone.osc.connect(this.analyzer);

    return tone;
  }

  render() {
    return (
      <main>
        <Scope
          analyzer={this.analyzer}
          audioContext={this.audioContext}
        ></Scope>
        <br/>
        <Spectrum
          analyzer={this.analyzer}
          audioContext={this.audioContext}
        ></Spectrum>

        {this.tones.map((tone, i) => <Channel key={i} tone={tone}></Channel>)}
      </main>
    );
  }
}

export default App;
