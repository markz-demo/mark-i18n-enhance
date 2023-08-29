const fg = require('fast-glob');
const fs = require('fs');

const map = {};
// 读取所有en词条文件
const files = fg.sync('./src/i18n/en/*.en.json');
for (const file of files) {
    const path = file; // 文件路径
    const name = path.split('/').at(-1).split('.').at(0); // 取文件前缀，比如a.en.json取到的是a
    const content = fs.readFileSync(file, 'utf-8'); // 读取内容
    const json = JSON.parse(content); // 转成json对象
    Object.entries(json).forEach(([k, v], i) => {
        let key = name + i;
        map[k] = key; // 把新旧key关系存到map上
    });
};
// 最后写到json文件里
fs.writeFileSync('./i18n.map.json', JSON.stringify(map, null, 2), { encoding: 'utf8' }, (err) => {
    if (err) throw err;
});
