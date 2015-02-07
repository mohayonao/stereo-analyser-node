"use strict";

var assert = require("power-assert");
var StereoAnalyserNode = require("../lib/stereo-analyser-node");

describe("StereoAnalyserNode", function() {
  var audioContext;

  beforeEach(function() {
    audioContext = new global.AudioContext();
  });

  describe("constructor", function() {
    it("(audioContext: AudioContext)", function() {
      var node = new StereoAnalyserNode(audioContext);

      assert(node instanceof global.AudioNode);
    });
  });
  describe("#fftSize", function() {
    it("get/set: number", function() {
      var node = new StereoAnalyserNode(audioContext);

      assert(typeof node.fftSize === "number");

      node.fftSize = 1024;
      assert(node.fftSize === 1024);

      node.fftSize = 512;
      assert(node.fftSize === 512);
    });
  });
  describe("#frequencyBinCount", function() {
    it("get: number", function() {
      var node = new StereoAnalyserNode(audioContext);

      assert(typeof node.frequencyBinCount === "number");

      node.fftSize = 1024;
      assert(node.frequencyBinCount === 512);

      node.fftSize = 512;
      assert(node.frequencyBinCount === 256);
    });
  });
  describe("#minDecibels", function() {
    it("get/set: number", function() {
      var node = new StereoAnalyserNode(audioContext);

      assert(typeof node.minDecibels === "number");

      node.minDecibels = -50;
      assert(node.minDecibels === -50);

      node.minDecibels = -25;
      assert(node.minDecibels === -25);
    });
  });
  describe("#maxDecibels", function() {
    it("get/set: number", function() {
      var node = new StereoAnalyserNode(audioContext);

      assert(typeof node.maxDecibels === "number");

      node.maxDecibels = -15;
      assert(node.maxDecibels === -15);

      node.maxDecibels = -7.5;
      assert(node.maxDecibels === -7.5);
    });
  });
  describe("#smoothingTimeConstant", function() {
    it("get/set: number", function() {
      var node = new StereoAnalyserNode(audioContext);

      node.smoothingTimeConstant = 0.4;
      assert(node.smoothingTimeConstant === 0.4);

      node.smoothingTimeConstant = 0.2;
      assert(node.smoothingTimeConstant === 0.2);
    });
  });
  describe("#getFloatFrequencyData", function() {
    it("(arrayL: Float32Array, arrayR: Float32Array): void", function() {
      var node = new StereoAnalyserNode(audioContext);
      var arrayL = new Float32Array(node.frequencyBinCount);
      var arrayR = new Float32Array(node.frequencyBinCount);

      node.getFloatFrequencyData(arrayL, arrayR);
    });
  });
  describe("#getByteFrequencyData", function() {
    it("(arrayL: Uint8Array, arrayR: Uint8Array): void", function() {
      var node = new StereoAnalyserNode(audioContext);
      var arrayL = new Uint8Array(node.frequencyBinCount);
      var arrayR = new Uint8Array(node.frequencyBinCount);

      node.getByteFrequencyData(arrayL, arrayR);
    });
  });
  describe.skip("#getFloatTimeDomainData", function() {
    it("(arrayL: Float32Array, arrayR: Float32Array): void", function() {
      var node = new StereoAnalyserNode(audioContext);
      var arrayL = new Float32Array(node.fftSize);
      var arrayR = new Float32Array(node.fftSize);

      node.getFloatTimeDomainData(arrayL, arrayR);
    });
  });
  describe("#getByteTimeDomainData", function() {
    it("(arrayL: Uint8Array, arrayR: Uint8Array): void", function() {
      var node = new StereoAnalyserNode(audioContext);
      var arrayL = new Uint8Array(node.fftSize);
      var arrayR = new Uint8Array(node.fftSize);

      node.getByteTimeDomainData(arrayL, arrayR);
    });
  });
  describe("#connect", function() {
    it("(destination: AudioNode): void", function() {
      var node = new StereoAnalyserNode(audioContext);
      var sine = audioContext.createOscillator();

      sine.connect(node);
      node.connect(audioContext.destination);

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
                    inputs: [ sine.toJSON() ]
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
                    inputs: [ sine.toJSON() ]
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
      var node = new StereoAnalyserNode(audioContext);
      var sine = audioContext.createOscillator();

      sine.connect(node);
      node.connect(audioContext.destination);
      node.disconnect();

      assert.deepEqual(audioContext.toJSON(), {
        name: "AudioDestinationNode",
        inputs: []
      });
    });
  });
});
