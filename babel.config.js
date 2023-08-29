module.exports = {
    "presets": [
        "@babel/preset-env",
        [
            "@babel/preset-react", { "runtime": "automatic" }
        ]
    ],
    "plugins": [
        ["./i18n-babel-plugin.js"]
    ],
};