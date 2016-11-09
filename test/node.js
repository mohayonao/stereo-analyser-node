"use strict";

require("run-with-mocha");

const assert = require("assert");
const StereoAnalyserNode = require("..");

describe("StereoAnalyserNode", () => {
  let audioContext;

  beforeEach(() => {
    audioContext = new global.AudioContext();
  });

  describe("constructor", () => {
    it("(audioContext: global.AudioContext)", () => {
      const node = new StereoAnalyserNode(audioContext);

      assert(node instanceof global.AudioNode);
    });
  });
});
