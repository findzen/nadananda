const DEFAULT_FREQUENCY = 256;
const DEFAULT_TYPE = 'sine';
const MAX_VOLUME = 0.5;
const MIN_VOLUME = 0;

class Tone {
  constructor(props = {}) {
    this.audioContext = props.audioContext || new AudioContext();

    this.gain = this.audioContext.createGain();
    this.gain.connect(this.audioContext.destination);
    this.gain.gain.value = MIN_VOLUME;

    this.osc = this.audioContext.createOscillator();
    this.osc.frequency.value = DEFAULT_FREQUENCY;
    this.osc.type = DEFAULT_TYPE;
    this.osc.connect(this.gain);
    this.osc.start();


  }

  set frequency(val) {
    this.osc.frequency.value = val;
  }

  get frequency() {
    return this.osc.frequency.value;
  }

  set mute(val) {
    this.gain.gain.value = val ? MIN_VOLUME : MAX_VOLUME;
  }

  get mute() {
    return this.gain.gain.value === MIN_VOLUME;
  }

  set partials(val) {
    let coefs = this.getRealImaginary(val);
    console.log(coefs);
    let periodicWave = this.audioContext.createPeriodicWave(coefs[0], coefs[1]);

    this.osc.setPeriodicWave(periodicWave);
  }

  set type(type) {
    this.osc.type = type;
  }

  getRealImaginary(partials = [], phase = 0) {
    let fftSize = 4096;
    let periodicWaveSize = fftSize / 2;

    let real = new Float32Array(periodicWaveSize);
    let imag = new Float32Array(periodicWaveSize);

    // let partials = [true, true, false, true, false, true, false, false, true];
    let partialCount = partials.length;

    for (let n = 1; n < periodicWaveSize; ++n) {
      let piFactor = 2 / (n * Math.PI);
      let b = n <= partialCount && partials[n - 1] ? 1 : 0;

      if (b !== 0) {
        real[n] = -b * Math.sin(phase * n);
        imag[n] = b * Math.cos(phase * n);
      } else {
        real[n] = 0;
        imag[n] = 0;
      }
    }
    return [real, imag];
  };
}

export default Tone;