"use strict";

function StereoAnalyserNode(audioContext) {
  var splitter = audioContext.createChannelSplitter(2);
  var analyserL = audioContext.createAnalyser();
  var analyserR = audioContext.createAnalyser();
  var merger = audioContext.createChannelMerger(2);

  splitter.channelCount = 2;
  splitter.channelCountMode = "explicit";

  analyserL.channelCount = 1;
  analyserL.channelCountMode = "explicit";

  analyserR.channelCount = 1;
  analyserR.channelCountMode = "explicit";

  merger.channelCount = 1;
  merger.channelCountMode = "explicit";

  splitter.connect(analyserL, 0, 0);
  splitter.connect(analyserR, 1, 0);

  if (typeof analyserL.getFloatTimeDomainData !== "function") {
    analyserL.getFloatTimeDomainData = getFloatTimeDomainData;
    analyserR.getFloatTimeDomainData = getFloatTimeDomainData;
  }

  Object.defineProperties(splitter, {
    fftSize: {
      set: function(value) {
        analyserL.fftSize = value;
        analyserR.fftSize = value;
      },
      get: function() {
        return analyserL.fftSize;
      },
      enumerable: true
    },
    frequencyBinCount: {
      get: function() {
        return analyserL.frequencyBinCount;
      },
      enumerable: true
    },
    minDecibels: {
      set: function(value) {
        analyserL.minDecibels = value;
        analyserR.minDecibels = value;
      },
      get: function() {
        return analyserL.minDecibels;
      },
      enumerable: true
    },
    maxDecibels: {
      set: function(value) {
        analyserL.maxDecibels = value;
        analyserR.maxDecibels = value;
      },
      get: function() {
        return analyserL.maxDecibels;
      },
      enumerable: true
    },
    smoothingTimeConstant: {
      set: function(value) {
        analyserL.smoothingTimeConstant = value;
        analyserR.smoothingTimeConstant = value;
      },
      get: function() {
        return analyserL.smoothingTimeConstant;
      },
      enumerable: true
    },
    connect: {
      value: function() {
        analyserL.connect(merger, 0, 0);
        analyserR.connect(merger, 0, 1);
        merger.connect.apply(merger, arguments);
      }
    },
    disconnect: {
      value: function() {
        if (arguments.length !== 0) {
          global.console.warn(
            "StereoAnalyserNode does not support selective disconnection. This operation may not works to analyse fine."
          );
        }
        analyserL.disconnect();
        analyserR.disconnect();
        merger.disconnect.apply(merger, arguments);
      }
    },
    getFloatFrequencyData: {
      value: function(arrayL, arrayR) {
        analyserL.getFloatFrequencyData(arrayL);
        analyserR.getFloatFrequencyData(arrayR);
      }
    },
    getByteFrequencyData: {
      value: function(arrayL, arrayR) {
        analyserL.getByteFrequencyData(arrayL);
        analyserR.getByteFrequencyData(arrayR);
      }
    },
    getFloatTimeDomainData: {
      value: function(arrayL, arrayR) {
        analyserL.getFloatTimeDomainData(arrayL);
        analyserR.getFloatTimeDomainData(arrayR);
      }
    },
    getByteTimeDomainData: {
      value: function(arrayL, arrayR) {
        analyserL.getByteTimeDomainData(arrayL);
        analyserR.getByteTimeDomainData(arrayR);
      }
    },
  });

  return splitter;
}

function getFloatTimeDomainData(array) {
  var uint8 = new global.Uint8Array(array.length);

  this.getByteTimeDomainData(uint8);

  for (var i = 0, imax = array.length; i < imax; i++) {
    array[i] = ((uint8 - 128) / 128);
  }
}

module.exports = StereoAnalyserNode;
