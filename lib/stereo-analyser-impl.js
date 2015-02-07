"use strict";

/**
 *  StereoAnalyserImpl
 *  +----------------------------+
 *  | ChannelSplitterNode(inlet) |
 *  +----------------------------+
 *    |                    |
 *  +-----------------+  +-----------------+
 *  | AnalyserNode(L) |  | AnalyserNode(R) |
 *  +-----------------+  +-----------------+
 *    |                    |
 *  +---------------------------+
 *  | ChannelMergerNode(outlet) |
 *  +---------------------------+
 */
function StereoAnalyserImpl(audioContext) {
  this.audioContext = audioContext;
  this.inlet = audioContext.createChannelSplitter(2);
  this.L = audioContext.createAnalyser();
  this.R = audioContext.createAnalyser();
  this.outlet = audioContext.createChannelMerger(2);

  this.inlet.connect(this.L, 0, 0);
  this.inlet.connect(this.R, 1, 0);
  this.L.connect(this.outlet, 0, 0);
  this.R.connect(this.outlet, 0, 1);
}

StereoAnalyserImpl.prototype.getFFTSize = function() {
  return this.L.fftSize;
};

StereoAnalyserImpl.prototype.setFFTSize = function(value) {
  this.L.fftSize = this.R.fftSize = value;
};

StereoAnalyserImpl.prototype.getFrequencyBinCount = function() {
  return this.L.frequencyBinCount;
};

StereoAnalyserImpl.prototype.getMinDecibels = function() {
  return this.L.minDecibels;
};

StereoAnalyserImpl.prototype.setMinDecibels = function(value) {
  this.L.minDecibels = this.R.minDecibels = value;
};

StereoAnalyserImpl.prototype.getMaxDecibels = function() {
  return this.L.maxDecibels;
};

StereoAnalyserImpl.prototype.setMaxDecibels = function(value) {
  this.L.maxDecibels = this.R.maxDecibels = value;
};

StereoAnalyserImpl.prototype.getSmoothingTimeConstant = function() {
  return this.L.smoothingTimeConstant;
};

StereoAnalyserImpl.prototype.setSmoothingTimeConstant = function(value) {
  this.L.smoothingTimeConstant = this.R.smoothingTimeConstant = value;
};

StereoAnalyserImpl.prototype.getFloatFrequencyData = function(arrayL, arrayR) {
  this.L.getFloatFrequencyData(arrayL);
  this.R.getFloatFrequencyData(arrayR);
};

StereoAnalyserImpl.prototype.getByteFrequencyData = function(arrayL, arrayR) {
  this.L.getByteFrequencyData(arrayL);
  this.R.getByteFrequencyData(arrayR);
};

StereoAnalyserImpl.prototype.getFloatTimeDomainData = function(arrayL, arrayR) {
  this.L.getFloatTimeDomainData(arrayL);
  this.R.getFloatTimeDomainData(arrayR);
};

StereoAnalyserImpl.prototype.getByteTimeDomainData = function(arrayL, arrayR) {
  this.L.getByteTimeDomainData(arrayL);
  this.R.getByteTimeDomainData(arrayR);
};

StereoAnalyserImpl.prototype.connect = function(destination) {
  global.AudioNode.prototype.connect.call(this.outlet, destination);
};

StereoAnalyserImpl.prototype.disconnect = function() {
  global.AudioNode.prototype.disconnect.call(this.outlet);
};

module.exports = StereoAnalyserImpl;
