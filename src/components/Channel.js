import React, { Component } from 'react';
import Knob from 'react-canvas-knob';

class Channel extends Component {
  constructor(props) {
    super(props);

    this.tone = props.tone;

    this.toggleMute = this.toggleMute.bind(this);
    this.onFrequencyChange = this.onFrequencyChange.bind(this);
    this.onPartialChange = this.onPartialChange.bind(this);

    let partials = Array(32).fill(false);
    partials[0] = true;

    this.state = {
      frequency: this.tone.frequency,
      mute: true,
      partials: partials
    };
  }

  onFrequencyChange(val) {
    this.setState((prevState, props) => {
      this.tone.frequency = val;

      return { frequency: val };
    });
  }

  onPartialChange(index, val, e) {
    let partials = this.state.partials;
    partials[index] = !val;


    this.setState(() => {
      this.tone.partials = partials;
      return { partials: partials }
    });
  }

  toggleMute() {
    this.setState((prevState, props) => {
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

        <Knob
          min={20}
          max={7777}
          value={this.state.frequency}
          onChange={this.onFrequencyChange}
          onChangeEnd={this.onFrequencyChange}
        />

        <div>
          {this.state.partials.map((val, i) => {
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
          })}
        </div>


      </div>
    );
  }
}

export default Channel;