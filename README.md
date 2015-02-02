# StereoAnalyserNode
[![Build Status](http://img.shields.io/travis/mohayonao/stereo-analyser-node.svg?style=flat-square)](https://travis-ci.org/mohayonao/stereo-analyser-node)
[![NPM Version](http://img.shields.io/npm/v/stereo-analyser-node.svg?style=flat-square)](https://www.npmjs.org/package/node-pico)
[![Bower](https://img.shields.io/bower/v/stereo-analyser-node.svg?style=flat-square)](https://github.com/mohayonao/stereo-analyser-node)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://mohayonao.mit-license.org/)

## Installation

npm:

```
npm install stereo-analyser-node
```

bower:

```
bower install stereo-analyser-node
```

downloads:

- [stereo-analyser-node.js](https://raw.githubusercontent.com/mohayonao/stereo-analyser-node/master/lib/stereo-analyser-node.js)

## API
### StereoAnalyserNode
  - `constructor(audioContext: AudioContext)`

#### Instance Attributes
  - `fftSize: number`
  - `frequencyBinCount: number` _readonly_
  - `minDecibels: number`
  - `maxDecibels: number`
  - `smoothingTimeConstant: number`

#### Instance Methods
  - `connect(destination: AudioNode | AudioParam) : void`
  - `disconnect() : void`
  - `getFloatFrequencyData(array: Float32Array, array: Float32Array): void`
  - `getByteFrequencyData(array: Uint8Array, array: Uint8Array): void`
  - `getFloatTimeDomainData(array: Float32Array, array: Float32Array): void`
  - `getByteTimeDomainData(array: Uint8Array, array: Uint8Array): void`

## Example

## AudioGraph
```
+----------------------------+
| ChannelSplitterNode(inlet) |
+----------------------------+
  |                    |
+-----------------+  +-----------------+
| AnalyserNode(L) |  | AnalyserNode(R) |
+-----------------+  +-----------------+
  |                    |
+---------------------------+
| ChannelMergerNode(outlet) |
+---------------------------+
```

## License
MIT
