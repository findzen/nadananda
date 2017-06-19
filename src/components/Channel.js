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
    this.onPartialChange = this.onPartialChange.bind(this);

    this.state = {
      frequency: this.tone.frequency,
      mute: true
    };

    this.state.partials = Array(32).fill(false);
    this.state.partials[0] = true;

    console.log('this.state.partials', this.state.partials);
  }

  onFrequencyChange(e) {
    if (!e.target.value) return;

    let val = e.target.value;

    this.setState(function (prevState, props) {
      this.tone.frequency = val;

      return { frequency: val };
    });
  }

  onPartialChange(index, val, e) {
    console.log('onPartialChange', index, val);

    let partials = this.state.partials;
    partials[index] = !val;


    this.setState(() => {
      this.tone.partials = partials;
      return { partials: partials }
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
        <button onClick={this.toggleMute}>
          {this.state.mute ? 'Unmute' : 'Mute'}
        </button>

        <br/>

        <label>Frequency</label>
        <br/>

        <input
          type="number"
          min="20"
          max="7777"
          value={this.state.frequency}
          onChange={this.onFrequencyChange}
        ></input>
        <br/>
        <input
          type="range"
          min="20"
          max="7777"
          value={this.state.frequency}
          onChange={this.onFrequencyChange}
        ></input>
        <br/>

        <div>
          {this.state.partials.map(function (val, i) {
              return (
                <div key={i}>
                  <input
                    onChange={this.onPartialChange.bind(this, i, val)}
                    type="checkbox"
                    checked={val}
                  ></input>
                  <label>
                    <strong>{i}</strong> {(i + 1) * this.state.frequency}hz
                  </label>
                </div>
              )
          }.bind(this))}
        </div>


      </div>
    );
  }
}

export default Channel;