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
const https = require('https');
const crypto = require('crypto');
const ProgressBar = require('progress');

const rootPath = process.cwd();

const sdkLink = 'https://raw.githubusercontent.com/flurry/flurry-ios-sdk/76d189f62b66c8fee4201fd70f1dfba5add3e5af/Flurry/libFlurry_9.3.1.a';
const sdkPath = path.join(rootPath, 'ios', 'ReactNativeFlurry', 'Flurry', 'libFlurry.a');
const sdkMd5 = '9ACEB8595F93E43064B2172C32DD15B3';

const msgLink = 'https://raw.githubusercontent.com/flurry/flurry-ios-sdk/76d189f62b66c8fee4201fd70f1dfba5add3e5af/FlurryMessaging/libFlurryMessaging_9.3.1.a';
const msgPath = path.join(rootPath, 'ios', 'ReactNativeFlurry', 'FlurryMessaging', 'libFlurryMessaging.a');
const msgMd5 = '5E419F17297BBF91B2D9AB9277180A9E';

const getMd5 = (file) => {
  const bufferSize = 8192;
  const fd = fs.openSync(file, 'r');
  const hash = crypto.createHash('md5');
  const buffer = Buffer.alloc(bufferSize);

  try {
    let bytesRead;
    do {
      bytesRead = fs.readSync(fd, buffer, 0, bufferSize);
      hash.update(buffer.slice(0, bytesRead));
    } while (bytesRead === bufferSize);
  } finally {
    fs.closeSync(fd);
  }

  return hash.digest('hex');
}

const downloadFile = (path, link, name, md5) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(path)) {
      console.log(`${name} exists. Checking MD5 value...`);
      const md5Val = getMd5(path);
      if (md5Val.toLowerCase() === md5.toLowerCase()) { 
        console.log(`MD5 values match.`);
        resolve();
        return;
      }
      console.log(`MD5 values don't match. Redownloading ${name}...`);
      fs.unlinkSync(path);
    }
    
    var file = fs.createWriteStream(path);
    var request = https.get(link, function(response) {
      var len = parseInt(response.headers['content-length'], 10);
      var bar = new ProgressBar(`Downloading ${name} [:bar] :rate/bps :percent :etas`, {
        complete: '=',
        incomplete: ' ',
        width: 20,
        total: len
      });
    
      response.pipe(file);
      file.on('finish', () => {
        file.close();
      });
    
      response.on('data', (chunk) => {
        bar.tick(chunk.length);
      });
    
      response.on('end', () => {
        resolve();
      });
    
      response.on('error', (err) => {
        console.error(err.message);
        console.error(`Please try manually download ${name} by executing the following command.\n\ncurl ${link} -o ${path}\n\n`);
        reject(err);
      });
    });
  });
}

const migration = () => {
  return new Promise((resolve, reject) => {
    const podfilePath = path.join(rootPath, '..', '..', 'ios', 'Podfile');
    if (!fs.existsSync(podfilePath)) {
      resolve();
      return;
    }
    const podfileContent = fs.readFileSync(podfilePath, 'utf8');
    const podPattern = new RegExp("pod 'Flurry-iOS-SDK/FlurrySDK'.*");
    const match = podfileContent.match(podPattern);
    if (match) {
      console.log(`Migration Note\n\nIf you are migrating from version<3.0.0 and your Podfile does NOT have any other dependency than Flurry, please deintegrate CocoaPods from your project. You may also need to manually remove Podfile and xcworkspace files.\n\n\
      \tcd ios\n\
      \tpod deintegrate\n\nIf you have a Podfile only for native dependencies, please remove \n\n\
      \tpod 'Flurry-iOS-SDK/FlurrySDK'\n\nfrom your Podfile, re-run 'pod install', remove react-native-flurry-sdk.podspec, and execute react-native link again.\n\n\
      \trm node_modules/react-native-flurry-sdk/react-native-flurry-sdk.podspec\n\
      \treact-native unlink react-native-flurry-sdk && react-native link react-native-flurry-sdk\n\n`);
    }
    resolve();
  });
} 

(async () => {
  await downloadFile(sdkPath, sdkLink, 'Flurry SDK', sdkMd5);
  await downloadFile(msgPath, msgLink, 'Flurry Messaging SDK', msgMd5);
  await migration();
})();
