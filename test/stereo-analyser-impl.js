"use strict";

var assert = require("power-assert");
var sinon = require("sinon");
var StereoAnalyserImpl = require("../lib/stereo-analyser-impl");

describe("StereoAnalyserImpl", function() {
  var audioContext;

  beforeEach(function() {
    audioContext = new global.AudioContext();
  });

  describe("constructor", function() {
    it("(audioContext: AudioContext)", function() {
      var impl = new StereoAnalyserImpl(audioContext);

      assert(impl instanceof StereoAnalyserImpl);
      assert(impl.inlet instanceof global.ChannelSplitterNode);
      assert(impl.L instanceof global.AnalyserNode);
      assert(impl.R instanceof global.AnalyserNode);
      assert(impl.outlet instanceof global.ChannelMergerNode);
    });
  });
  describe("#getFFTSize", function() {
    it("(): number", function() {
      var impl = new StereoAnalyserImpl(audioContext);

      assert(typeof impl.getFFTSize() === "number");
    });
  });
  describe("#setFFTSize", function() {
    it("(value: number): void", function() {
      var impl = new StereoAnalyserImpl(audioContext);

      impl.setFFTSize(1024);
      assert(impl.getFFTSize() === 1024);
      assert(impl.L.fftSize === 1024);
      assert(impl.R.fftSize === 1024);

      impl.setFFTSize(512);
      assert(impl.getFFTSize() === 512);
      assert(impl.L.fftSize === 512);
      assert(impl.R.fftSize === 512);
    });
  });
  describe("#getFrequencyBinCount", function() {
    it("(): number", function() {
      var impl = new StereoAnalyserImpl(audioContext);

      assert(typeof impl.getFrequencyBinCount() === "number");

      impl.setFFTSize(1024);
      assert(impl.getFrequencyBinCount() === 512);
      assert(impl.L.frequencyBinCount === 512);
      assert(impl.R.frequencyBinCount === 512);

      impl.setFFTSize(512);
      assert(impl.getFrequencyBinCount() === 256);
      assert(impl.L.frequencyBinCount === 256);
      assert(impl.R.frequencyBinCount === 256);
    });
  });
  describe("#getMinDecibels", function() {
    it("(): number", function() {
      var impl = new StereoAnalyserImpl(audioContext);

      assert(typeof impl.getMinDecibels() === "number");
    });
  });
  describe("#setMinDecibels", function() {
    it("(value: number): void", function() {
      var impl = new StereoAnalyserImpl(audioContext);

      impl.setMinDecibels(-50);
      assert(impl.getMinDecibels() === -50);
      assert(impl.L.minDecibels === -50);
      assert(impl.R.minDecibels === -50);

      impl.setMinDecibels(-25);
      assert(impl.getMinDecibels() === -25);
      assert(impl.L.minDecibels === -25);
      assert(impl.R.minDecibels === -25);
    });
  });
  describe("#getMaxDecibels", function() {
    it("(): number", function() {
      var impl = new StereoAnalyserImpl(audioContext);

      assert(typeof impl.getMaxDecibels() === "number");
    });
  });
  describe("#setMaxDecibels", function() {
    it("(value: number): void", function() {
      var impl = new StereoAnalyserImpl(audioContext);

      impl.setMaxDecibels(-15);
      assert(impl.getMaxDecibels() === -15);
      assert(impl.L.maxDecibels === -15);
      assert(impl.R.maxDecibels === -15);

      impl.setMaxDecibels(-7.5);
      assert(impl.getMaxDecibels() === -7.5);
      assert(impl.L.maxDecibels === -7.5);
      assert(impl.R.maxDecibels === -7.5);
    });
  });
  describe("#getSmoothingTimeConstant", function() {
    it("(): number", function() {
      var impl = new StereoAnalyserImpl(audioContext);

      assert(typeof impl.getSmoothingTimeConstant() === "number");
    });
  });
  describe("#setSmoothingTimeConstant", function() {
    it("(value: number): void", function() {
      var impl = new StereoAnalyserImpl(audioContext);

      impl.setSmoothingTimeConstant(0.4);
      assert(impl.getSmoothingTimeConstant() === 0.4);
      assert(impl.L.smoothingTimeConstant === 0.4);
      assert(impl.R.smoothingTimeConstant === 0.4);

      impl.setSmoothingTimeConstant(0.2);
      assert(impl.getSmoothingTimeConstant() === 0.2);
      assert(impl.L.smoothingTimeConstant === 0.2);
      assert(impl.R.smoothingTimeConstant === 0.2);
    });
  });
  describe("#getFloatFrequencyData", function() {
    it("(arrayL: Float32Array, arrayR: Float32Array): void", function() {
      var impl = new StereoAnalyserImpl(audioContext);
      var spyL = sinon.spy(impl.L, "getFloatFrequencyData");
      var spyR = sinon.spy(impl.R, "getFloatFrequencyData");
      var arrayL = new Float32Array(impl.getFrequencyBinCount());
      var arrayR = new Float32Array(impl.getFrequencyBinCount());

      impl.getFloatFrequencyData(arrayL, arrayR);

      assert(spyL.callCount === 1);
      assert(spyL.calledWith(arrayL));
      assert(spyR.callCount === 1);
      assert(spyR.calledWith(arrayR));
    });
  });
  describe("#getByteFrequencyData", function() {
    it("(arrayL: Uint8Array, arrayR: Uint8Array): void", function() {
      var impl = new StereoAnalyserImpl(audioContext);
      var spyL = sinon.spy(impl.L, "getByteFrequencyData");
      var spyR = sinon.spy(impl.R, "getByteFrequencyData");
      var arrayL = new Uint8Array(impl.getFrequencyBinCount());
      var arrayR = new Uint8Array(impl.getFrequencyBinCount());

      impl.getByteFrequencyData(arrayL, arrayR);

      assert(spyL.callCount === 1);
      assert(spyL.calledWith(arrayL));
      assert(spyR.callCount === 1);
      assert(spyR.calledWith(arrayR));
    });
  });
  describe.skip("#getFloatTimeDomainData", function() {
    it("(arrayL: Float32Array, arrayR: Float32Array): void", function() {
      var impl = new StereoAnalyserImpl(audioContext);
      var spyL = sinon.spy(impl.L, "getFloatTimeDomainData");
      var spyR = sinon.spy(impl.R, "getFloatTimeDomainData");
      var arrayL = new Float32Array(impl.getFFTSize());
      var arrayR = new Float32Array(impl.getFFTSize());

      impl.getFloatTimeDomainData(arrayL, arrayR);

      assert(spyL.callCount === 1);
      assert(spyL.calledWith(arrayL));
      assert(spyR.callCount === 1);
      assert(spyR.calledWith(arrayR));
    });
  });
  describe("#getByteTimeDomainData", function() {
    it("(arrayL: Uint8Array, arrayR: Uint8Array): void", function() {
      var impl = new StereoAnalyserImpl(audioContext);
      var spyL = sinon.spy(impl.L, "getByteTimeDomainData");
      var spyR = sinon.spy(impl.R, "getByteTimeDomainData");
      var arrayL = new Uint8Array(impl.getFFTSize());
      var arrayR = new Uint8Array(impl.getFFTSize());

      impl.getByteTimeDomainData(arrayL, arrayR);

      assert(spyL.callCount === 1);
      assert(spyL.calledWith(arrayL));
      assert(spyR.callCount === 1);
      assert(spyR.calledWith(arrayR));
    });
  });
  describe("#connect", function() {
    it("(destination: AudioNode): void", function() {
      var impl = new StereoAnalyserImpl(audioContext);

      impl.connect(audioContext.destination);

      assert.deepEqual(audioContext.toJSON(), {
        name: "AudioDestinationNode",
        inputs: [
          {
            name: "ChannelMergerNode",
            inputs: [
              {
                name: "AnalyserNode",
                fftSize: 2048,
                minDecibels: -100,
                maxDecibels: 30,
                smoothingTimeConstant: 0.8,
                inputs: [
                  {
                    name: "ChannelSplitterNode",
                    inputs: []
                  }
                ]
              },
              {
                name: "AnalyserNode",
                fftSize: 2048,
                minDecibels: -100,
                maxDecibels: 30,
                smoothingTimeConstant: 0.8,
                inputs: [
                  {
                    name: "ChannelSplitterNode",
                    inputs: []
                  }
                ]
              }
            ]
          }
        ]
      });
    });
  });
  describe("#disconnect", function() {
    it("(): void", function() {
      var impl = new StereoAnalyserImpl(audioContext);

      impl.connect(audioContext.destination);
      impl.disconnect();

      assert.deepEqual(audioContext.toJSON(), {
        name: "AudioDestinationNode",
        inputs: []
      });
    });
  });
});
