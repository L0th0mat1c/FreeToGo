import React from 'react';
import {View} from 'react-native';

var fs = require("fs");
import renderer from 'react-test-renderer';
// const data = fs.readFileSync("{absolute path to vue file}", "utf8");
const data = fs.readFileSync("/Users/jean-christophe/Desktop/Git/C-COD-290-TLS-2-1-epicture-raphael.fournier/epicture/screens/EditScreen.vue", "utf8");

describe("Edit screen", () => {
    it("renders correctly", () => {
      const tree = renderer.create(<View />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });