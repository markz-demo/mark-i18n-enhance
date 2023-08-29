const lang = localStorage.getItem('lang') || 'en';
const result = await import(/* webpackChunkName: "i18n" */ `./${lang}/index`);
const json = result.default;

export default {
    lang,
    change: lang => {
        localStorage.setItem('lang', lang);
        window.location.reload();
    },
    get: (key) => {
        return json[key];
    }
};