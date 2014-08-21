var mkdirp = require("mkdirp"),
    rimraf = require("rimraf");

rimraf.sync("reports/junit");
rimraf.sync("reports/screenshots");
mkdirp.sync("reports/junit");
mkdirp.sync("reports/screenshots");

// this file MUST be referenced from the command line with a --config or -c flag
module.exports = {
    "src_folders": ["tests"],
    "output_folder": "./reports/junit",
    "custom_commands_path": "./commands",
    "selenium": {
        "start_process": true,
        "server_path": "./node_modules/selenium-server/lib/runner/selenium-server-standalone-2.38.0.jar",
        "log_path": "",
        "host": "127.0.0.1",
        "port": 5555,
        "cli_args": {
            "webdriver.chrome.driver": "./node_modules/.bin/chromedriver"
        }
    },
    "test_settings": {
        "default": {
            "launch_url": "http://www.isobar.com",
            "selenium_port": 5555,
            "selenium_host": "localhost",
            "silent": true,
            "firefox_profile": false,
            "screenshots": {
                "enabled": true,
                "path": "target/screenshots"
            },
            "desiredCapabilities": {
                "browserName": "phantomjs",
                "javascriptEnabled": true,
                "acceptSslCerts": true,
                "phantomjs.binary.path": require("phantomjs").path
            },
            "output": true,
            "exclude": ["post-pages-user", "breakpoints"]
        }
    }
};

