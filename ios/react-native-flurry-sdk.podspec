require 'json'

package = JSON.parse(File.read('../package.json'))
sdkVersion = '11.4.0'

Pod::Spec.new do |s|
  s.name         = package['name']
  s.version      = package['version']
  s.summary      = package['description']
  s.homepage     = "http://www.flurry.com"
  s.license      = {  :type => 'Apache License, Version 2.0',
                      :text => <<-LICENSE
                        Copyright 2018, Oath Inc.
              
                        Licensed under the Apache License, Version 2.0 (the "License");
                        you may not use this file except in compliance with the License.
                        You may obtain a copy of the License at
                        
                          http://www.apache.org/licenses/LICENSE-2.0
                        
                        Unless required by applicable law or agreed to in writing, software
                        distributed under the License is distributed on an "AS IS" BASIS,
                        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                        See the License for the specific language governing permissions and
                        limitations under the License.
                      LICENSE
                    }
  s.author       = { "Flurry SDK" => "flurrysdk@gmail.com" }
  s.source       = { :git => "https://github.com/flurry/react-native-flurry-sdk.git", :tag => "master" }
  s.requires_arc = true
  s.default_subspec = 'FlurrySDK'

  s.subspec 'FlurrySDK' do |ss|
    ss.ios.deployment_target = '8.0'
    ss.ios.source_files = [
      'ReactNativeFlurry/ReactNativeFlurry.{h,m}',
      'ReactNativeFlurry/ReactNativeFlurryConfigListener.{h,m}',
      'ReactNativeFlurry/ReactNativeFlurryEvent.{h,m}',
      
    ]
    ss.ios.dependency 'Flurry-iOS-SDK/FlurrySDK', "~> #{sdkVersion}"
    ss.ios.dependency 'Flurry-iOS-SDK/FlurryConfig', "~> #{sdkVersion}"

    ss.tvos.deployment_target = '9.0'
    ss.tvos.source_files = [
      'ReactNativeFlurry/ReactNativeFlurry.{h,m}'
    ]
    ss.tvos.dependency 'Flurry-iOS-SDK/FlurrySDK', "~> #{sdkVersion}"
    
    ss.dependency 'React'
  end

  s.subspec 'FlurrySDK-Push' do |ss|
    ss.source_files = 'ReactNativeFlurry/**/*.{h,m}'
    ss.platform = :ios, '9.0'
    ss.pod_target_xcconfig = { 'GCC_PREPROCESSOR_DEFINITIONS' => 'HAS_MESSAGING=1' }
    ss.dependency 'React'
    ss.dependency 'Flurry-iOS-SDK/FlurrySDK', "~> #{sdkVersion}"
    ss.dependency 'Flurry-iOS-SDK/FlurryConfig', "~> #{sdkVersion}"
    ss.dependency 'Flurry-iOS-SDK/FlurryMessaging', "~> #{sdkVersion}"
  end

end
