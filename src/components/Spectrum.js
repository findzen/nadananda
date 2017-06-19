import React, { Component } from 'react';

class Spectrum extends Component {
  constructor(props) {
    super(props);

    this.analyzer = props.analyzer;
    this.audioContext = props.audioContext;

    this.draw = this.draw.bind(this);
  }

  componentDidMount() {
    this.canvasContext = this.canvas.getContext('2d');
    this.draw();
  }

  draw() {
    drawSpectrum(this.analyzer, this.canvasContext);
    requestAnimationFrame(this.draw);
  }

  render() {
    return (
      <canvas
        ref={(canvas) => { this.canvas = canvas; }}
        height="200"
        width="400"
      ></canvas>
    );
  }
}

function drawSpectrum(analyzer, ctx) {
  let width = ctx.canvas.width;
  let height = ctx.canvas.height;
  let freqData = new Uint8Array(analyzer.frequencyBinCount);
  let scaling = height / 256;

  analyzer.getByteFrequencyData(freqData);

  ctx.fillStyle = 'rgba(0, 20, 0, 0.1)';
  ctx.fillRect(0, 0, width, height);

  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgb(0, 200, 0)';
  ctx.beginPath();

  for (let x = 0; x < width; x++)
    ctx.lineTo(x, height - freqData[x] * scaling);

  ctx.stroke();
}

export default Spectrum;