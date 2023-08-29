let map = null
// 只在prod build生效
if (process.env.NODE_ENV === "production") {
    map = require('./i18n.map.json'); // 读取新旧key mapping关系
}

module.exports = function () {
    if (!map) return {};
    return {
        visitor: {
            // 解析字符串语法
            StringLiteral(path) {
                // 取到所有字符串
                const value = path.node.value;
                // 判断字符串是否是mapping里的旧key
                const key = map[value];
                if (key) {
                    // 取到对应的新key，替换
                    path.node.value = key;
                }
            }
        },
    };
}