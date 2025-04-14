export default function storeLanguage() {
    const get = () => {
        return localStorage.getItem('arco-locale') || 'zh-CN'
    }
    const set = (lang: string) => {
        return localStorage.setItem('arco-locale', lang)
    }
    return {
        get, set
    }
}
