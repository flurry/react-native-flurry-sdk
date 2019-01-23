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

const which = require('which').sync;
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const execSync = require('child_process').execSync;

// Modify this line to change native Flurry iOS SDK version.
const newPodLine = "pod 'Flurry-iOS-SDK/FlurrySDK', '~> 9.2.3'";

console.log('Installing Flurry iOS SDK through CocoaPods...');
if (!which('pod')) {
    console.error('CocoaPods is not installed. Please see https://cocoapods.org for details.');
    return;
}

// `react-native link` is always executed under the root directory of project.
const rootPath = process.cwd();
const iosPath = path.join(rootPath, 'ios');
if (!fs.existsSync(iosPath)) {
    console.error('\'ios\' directory does not exist in your project.');
    return;
}

const podfilePath = path.join(iosPath, 'Podfile');
if (!fs.existsSync(podfilePath)) {
    console.log('Creating Podfile...');
    execSync('pod init', {
        cwd: iosPath
    });
}

let podfileContent = fs.readFileSync(podfilePath, 'utf8');

const targetName = path.basename(rootPath);
const oldLinePattern = new RegExp("pod 'Flurry-iOS-SDK/FlurrySDK'.*");
const existingLineMatch = podfileContent.match(oldLinePattern);
if (existingLineMatch) {
    const existingLine = existingLineMatch[0];
    podfileContent = podfileContent.replace(existingLine, newPodLine);
} else {
    const targetPattern = new RegExp(`target\\s+'${targetName}'\\s+do`);
    const existingTargetMatch = podfileContent.match(targetPattern);
    if (existingTargetMatch) {
        const existingTarget = existingTargetMatch[0];
        podfileContent = podfileContent.replace(existingTarget, `${existingTarget}\n\n  ${newPodLine}`);

        // Currently `pod init` will generate an invalid Podfile. Try to remove duplicated dependencies under main target.
        const findTargetScope = (content, position) => {
            const targetKeyword = 'target ';
            const endKeyword = 'end';
    
            let counter = 1;
            let endPosition = null;
            
            let ptr = position + targetKeyword.length;
            while (ptr < podfileContent.length) {
                if (content.substring(ptr, ptr + targetKeyword.length) === targetKeyword) {
                    counter ++;
                    ptr += targetKeyword.length;
                } else if (content.substring(ptr, ptr + endKeyword.length) === endKeyword) {
                    const nextChar = content[ptr + endKeyword.length];
                    if (nextChar === '\n' || nextChar === ' ' || nextChar === undefined) {
                        counter --;
                        if (counter === 0) {
                            endPosition = ptr + endKeyword.length;
                            break;
                        }
                    }
                    ptr += endKeyword.length;
                } else {
                    ptr ++;
                }
            }
            return endPosition;
        }

        const targetStartIndex = existingTargetMatch.index;
        const targetEndIndex = findTargetScope(podfileContent, targetStartIndex);
        
        if (targetEndIndex === null) {
            console.error('Failed: Target end keyword not found. Please check your Podfile.\n');
            return;
        }

        const targetSubContent = podfileContent.substring(targetStartIndex, targetEndIndex);
        let tmpSubContent = targetSubContent;
        
        // Check whether invalid tvOS targets exist under main target. If so, remove them.
        const tvOSPattern = new RegExp(`target\\s+'${targetName}-tvOS.*\\s+do`);
        while (true) {
            const tvOSMatchResult = tmpSubContent.match(tvOSPattern);
            if (tvOSMatchResult === null) {
                break;
            }

            const startTvPosition = tvOSMatchResult.index;
            const endTvPosition = findTargetScope(tmpSubContent, startTvPosition);
            if (endTvPosition === null) {
                break;
            }

            const tvScopeStr = tmpSubContent.substring(startTvPosition, endTvPosition);
            tmpSubContent = tmpSubContent.replace(tvScopeStr, '');
        }

        podfileContent = podfileContent.replace(targetSubContent, tmpSubContent);
        
    } else {
        const podsForPattern = new RegExp(/# Pods for .*/);
        const existingPodsForMatch = podfileContent.match(podsForPattern);
        if (existingPodsForMatch) {
            const existingPodsForSection = existingPodsForMatch[0];
            podfileContent = podfileContent.replace(existingPodsForSection, `${existingPodsForSection}\n  ${newPodLine}`);
        } else {
            console.error(`Could not find a "# Pods for" section in your Podfile "${podfilePath}". Please add a "# Pods for Flurry" line in the Podfile under the "target" section, and then rerun "react-native link react-native-flurry-sdk". Flurry pods will be added below the comment line.`);
            return;
        }
    }
}

fs.writeFileSync(podfilePath, podfileContent);

console.log('Executing \'pod install\'...');
let podInstall = exec('pod install', {
    cwd: iosPath
});
podInstall.stdout.on('data', (data) => {
    console.log(data);
});
podInstall.stderr.on('data', (data) => {
    console.error(data);
});
podInstall.on('close', (code) => {
    if (code === 0) {
        console.log('Flurry iOS SDK is successfully installed.');
    } else {
        console.error('CocoaPods installation failed: please resolve the issues above and rerun \'react-native link react-native-flurry-sdk\'.\nIf you see an error like \'Unable to find a specification for FlurrySDK\', please run \'pod repo update\' and then rerun the react-native link command.');
    }
});
