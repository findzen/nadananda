import React, { Component } from 'react';

const DEFAULT_FREQUENCY = 256;
const DEFAULT_TYPE = 'sine';
const MAX_VOLUME = 0.5;
const MIN_VOLUME = 0;

class Channel extends Component {
  constructor(props) {
    super(props);

    this.tone = props.tone;

    this.toggleMute = this.toggleMute.bind(this);
    this.onFrequencyChange = this.onFrequencyChange.bind(this);

    this.state = {
      frequency: this.tone.frequency,
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
    if (!e.target.value) return;

    var val = e.target.value;

    this.setState(function (prevState, props) {
      this.tone.frequency = val;

      return { frequency: val };
    });
  }

  toggleMute() {
    this.setState(function (prevState, props) {
      this.tone.mute = !prevState.mute;

      return { mute: this.tone.mute };
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