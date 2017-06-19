import React, { Component } from 'react';
import Tone from 'tone';

const MAX_VOLUME = -10;
const MIN_VOLUME = -100;

class Channel extends Component {
  constructor(props) {
    super(props);

    // this.osc = new Tone.PolySynth(6, Tone.SimpleSynth, {
    //   oscillator: {
    //     partials: [0, 2, 3, 4]
    //   }
    // }).toMaster();

    this.osc = new Tone.Oscillator({
      frequency: 256,
      volume: MAX_VOLUME
    }).toMaster().start();

    this.osc.mute = true;

    console.log('this', this);
    console.log('this.osc', this.osc);

    this.toggleMute = this.toggleMute.bind(this);
    this.onFrequencyChange = this.onFrequencyChange.bind(this);

    this.state = {
      frequency: 256,
      mute: true
    };
  }


  componentDidMount() {
    console.log('componentDidMount');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  onFrequencyChange(e) {
    console.log('onFrequencyChange', e.target.value);
    if (!e.target.value) return;

    var val = e.target.value;

    this.setState(function (prevState, props) {
      this.osc.frequency.setValueAtTime(val);

      return { frequency: val };
    });
  }

  toggleMute() {
    console.log('toggleMute', this);

    this.setState(function (prevState, props) {
      this.osc.mute = !this.osc.mute;

      return { mute: !prevState.mute };
    });
  }

  render() {
    return (
      <div className="channel">
        <h2>{this.props.name}</h2>

        <button onClick={this.toggleMute}>
          {this.state.mute ? 'Unmute' : 'Mute'}
        </button>

        <br/>

        <label>Frequency</label>
        <br/>

        <input
          type="number"
          min='20'
          max='2000'
          value={this.state.frequency}
          onChange={this.onFrequencyChange}
        ></input>
        <br/>
        <input
          type="range"
          min='20'
          max='2000'
          value={this.state.frequency}
          onChange={this.onFrequencyChange}
        ></input>
        <br/>


      </div>
    );
  }
}

export default Channel;