require 'json'

package = JSON.parse(File.read('../package.json'))
sdkVersion = '10.2.0'

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
  s.platform     = :ios, "8.0"
  s.source       = { :git => "https://github.com/flurry/react-native-flurry-sdk.git", :tag => "master" }
  s.source_files = "ReactNativeFlurry/**/*.{h,m}"
  s.vendored_libraries = "ReactNativeFlurry/Flurry/libFlurry.a", "ReactNativeFlurry/FlurryMessaging/libFlurryMessaging.a", "ReactNativeFlurry/FlurryConfig/libFlurryConfig.a"
  s.requires_arc = true

  s.dependency 'React'

end
