/*
 *  Copyright (c) 2016 pro!vision GmbH and Contributors
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

"use strict";

var path = require("path");
module.exports = {

    context: __dirname,
    clientLibRoot: path.resolve(__dirname, "test", "components-clientlibs"),

    libs: [{
            name: "info",
            outputPath: path.resolve(__dirname, "test", "components", "info", "clientlib"),
            cssProcessor: ["default:none", "min:none"], // disable minification for CSS
            jsProcessor: ["default:none", "min:gcc"], // using google closure compiler instead of YUI,
            allowProxy: true,
            longCacheKey: "${project.version}-${buildNumber}",
            assets: {
                js: [{
                        src: "test/clientlib-src/js/app.js",
                        dest: "app.js"
                    },
                    {
                        src: "test/clientlib-src/js/libs/mylib.min.js",
                        dest: "libs/mylib.min.js"
                    },
                    {
                        src: "test/clientlib-src/js/libs/mylib.min.js.map",
                        dest: "libs/mylib.min.js.map"
                    }
                ],
                css: [
                    "test/clientlib-src/css/styling.css",
                    "test/clientlib-src/css/lib.css"
                ]
            }
        },
        {
            name: "info2",
            outputPath: path.resolve(__dirname, "test", "components-clientlibs", "info2", "clientlib"),
            cssProcessor: ["default:none", "min:none"], // disable minification for CSS
            jsProcessor: ["default:none", "min:gcc"], // using google closure compiler instead of YUI,
            allowProxy: true,
            longCacheKey: "${project.version}-${buildNumber}",
            assets: {
                js: [{
                        src: "test/clientlib-src/js/app.js",
                        dest: "app.js"
                    },
                ],
                css: [
                    "test/clientlib-src/css/styling.css",
                    "test/clientlib-src/css/lib.css"
                ]
            }
        }
    ]
};
