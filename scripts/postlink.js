/*
 * Copyright 2018, Oath Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const fs = require('fs');
const path = require('path');
const xcode = require('xcode');
const inquirer = require('inquirer');

const rootPath = process.cwd();
const iosPath = path.join(rootPath, 'ios');
let xcodeProjPath;
for (let file of fs.readdirSync(iosPath)) {
  if (path.extname(file) === '.xcodeproj') {
    xcodeProjPath = path.join(iosPath, file);
    break;
  }
}

if (!xcodeProjPath) {
  console.error(`Error: Could not find any xcodeproj file under ${iosPath}. Please manually link the static libraries.`);
  process.exit(0);
}

const pbProjPath = path.join(xcodeProjPath, 'project.pbxproj');
if (!fs.existsSync(pbProjPath)) {
  console.error(`Error: pbxproj file does not exist. Please check your project file at ${xcodeProjPath}`);
  process.exit(0);
}

let parsedXcodeProj;
try {
  let proj = xcode.project(pbProjPath);
  parsedXcodeProj = proj.parseSync();
} catch (e) {
  console.error('Failed to parse pbxproj file.');
  process.exit(0);
}

inquirer.prompt([{
  type: 'confirm',
  name: 'needPush',
  message: 'Do you need to integrate Flurry Push?',
  default: true
}]).then( ans => {
  let libs = ['libReactNativeFlurry.a', 'libReactNativeFlurryWithMessaging.a'];
  let libToRemove = libs[0];
  if (!ans.needPush) {
    libToRemove = libs[1];
  }
  parsedXcodeProj.removeFramework(libToRemove);
  fs.writeFileSync(pbProjPath, parsedXcodeProj.writeSync());
  console.log(`Flurry: ${libs[ans.needPush ? 1 : 0]} is successfully linked to project.`)
});
