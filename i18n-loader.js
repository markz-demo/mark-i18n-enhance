let map = null
// 只在prod build生效
if (process.env.NODE_ENV === "production") {
    map = require('./i18n.map.json'); // 读取新旧key mapping关系
}

module.exports = function (source) {
    if (!map) return source;
    const json = typeof source === "string" ? JSON.parse(source) : source;
    const result = {}; // 替换后的json
    Object.entries(json).forEach(([k, v]) => {
        let key = map[k]; // 新key
        if (key) {
            // 取到对应的新key，替换
            result[key] = v;
        }
    });
    return JSON.stringify(result); // 最后输出新json string
};
