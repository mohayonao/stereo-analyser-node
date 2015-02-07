"use strict";

var StereoAnalyserImpl = require("./stereo-analyser-impl");

function StereoAnalyserNode(audioContext) {
  var impl = new StereoAnalyserImpl(audioContext);

  Object.defineProperties(impl.inlet, {
    fftSize: {
      set: function(value) {
        impl.setFFTSize(value);
      },
      get: function() {
        return impl.getFFTSize();
      },
      enumerable: true
    },
    frequencyBinCount: {
      get: function() {
        return impl.getFrequencyBinCount();
      },
      enumerable: true
    },
    minDecibels: {
      set: function(value) {
        impl.setMinDecibels(value);
      },
      get: function() {
        return impl.getMinDecibels();
      },
      enumerable: true
    },
    maxDecibels: {
      set: function(value) {
        impl.setMaxDecibels(value);
      },
      get: function() {
        return impl.getMaxDecibels();
      },
      enumerable: true
    },
    smoothingTimeConstant: {
      set: function(value) {
        impl.setSmoothingTimeConstant(value);
      },
      get: function() {
        return impl.getSmoothingTimeConstant();
      },
      enumerable: true
    },
    connect: {
      value: function(destination) {
        return impl.connect(destination);
      }
    },
    disconnect: {
      value: function() {
        return impl.disconnect();
      }
    },
    getFloatFrequencyData: {
      value: function(arrayL, arrayR) {
        return impl.getFloatFrequencyData(arrayL, arrayR);
      }
    },
    getByteFrequencyData: {
      value: function(arrayL, arrayR) {
        return impl.getByteFrequencyData(arrayL, arrayR);
      }
    },
    getFloatTimeDomainData: {
      value: function(arrayL, arrayR) {
        return impl.getFloatTimeDomainData(arrayL, arrayR);
      }
    },
    getByteTimeDomainData: {
      value: function(arrayL, arrayR) {
        return impl.getByteTimeDomainData(arrayL, arrayR);
      }
    }
  });

  return impl.inlet;
}

module.exports = StereoAnalyserNode;
