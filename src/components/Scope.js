import React, { Component } from 'react';

class Scope extends Component {
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
    drawScope(this.analyzer, this.canvasContext);
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

function drawScope(analyzer, ctx) {
  let width = ctx.canvas.width;
  let height = ctx.canvas.height;
  let timeData = new Uint8Array(analyzer.frequencyBinCount);
  let scaling = height / 256;
  let risingEdge = 0;
  let edgeThreshold = 5;

  analyzer.getByteTimeDomainData(timeData);

  ctx.fillStyle = 'rgba(0, 20, 0, 0.1)';
  ctx.fillRect(0, 0, width, height);

  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgb(0, 200, 0)';
  ctx.beginPath();

  // No buffer overrun protection
  while (timeData[risingEdge++] - 128 > 0 && risingEdge <= width);
  if (risingEdge >= width) risingEdge = 0;

  while (timeData[risingEdge++] - 128 < edgeThreshold && risingEdge <= width);
  if (risingEdge >= width) risingEdge = 0;

  for (let x = risingEdge; x < timeData.length && x - risingEdge < width; x++)
    ctx.lineTo(x - risingEdge, height - timeData[x] * scaling);

  ctx.stroke();
}

export default Scope;