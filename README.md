# StereoAnalyserNode
[![Build Status](http://img.shields.io/travis/mohayonao/stereo-analyser-node.svg?style=flat-square)](https://travis-ci.org/mohayonao/stereo-analyser-node)
[![NPM Version](http://img.shields.io/npm/v/stereo-analyser-node.svg?style=flat-square)](https://www.npmjs.org/package/node-pico)
[![Bower](http://img.shields.io/bower/v/stereo-analyser-node.svg?style=flat-square)](http://bower.io/search/?q=stereo-analyser-node)
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

- [stereo-analyser-node.js](https://raw.githubusercontent.com/mohayonao/stereo-analyser-node/master/build/stereo-analyser-node.js)
- [stereo-analyser-node.min.js](https://raw.githubusercontent.com/mohayonao/stereo-analyser-node/master/build/stereo-analyser-node.min.js)

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
  - `connect(destination: AudioNode|AudioParam): void`
  - `disconnect(): void`
  - `getFloatFrequencyData(arrayL: Float32Array, arrayR: Float32Array): void`
  - `getByteFrequencyData(arrayL: Uint8Array, arrayR: Uint8Array): void`
  - `getFloatTimeDomainData(arrayL: Float32Array, arrayR: Float32Array): void`
  - `getByteTimeDomainData(arrayL: Uint8Array, arrayR: Uint8Array): void`

## Example
http://mohayonao.github.io/stereo-analyser-node/

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
