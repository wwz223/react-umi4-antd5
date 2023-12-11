import { RequestConfig, history } from '@umijs/max';
import { TOKEN_KEY } from './const'

export function getToken() {
    if (typeof window === 'undefined') {
        return;
    }
    const token = localStorage.getItem(TOKEN_KEY) || '';
    if (!token) {
        history.push('/login')
        return false
    }
    // authTokenAtom中的值是带引号的字符串，需要去掉
    if (token.startsWith('"') && token.endsWith('"')) {
        return token.slice(1, -1);
    }
    return token;
}

const request: RequestConfig = {
    timeout: 60000,
    // other axios options you want
    baseURL: process.env.PUBLIC_API_URL,
    errorConfig: {
        errorHandler() {
        },
        errorThrower() {
        }
    },
    requestInterceptors: [
        // 直接写一个 function，作为拦截器
        (url, options) => {
            if (typeof window === 'undefined') {
                return options;
            }
            const token = getToken();
            if (!token && url !== '/auth/login') return false
            // eslint-disable-next-line no-param-reassign
            options.headers!.Authorization = `Bearer ${token}`;
            options.headers['x-locale'] = 'zh-CN';
            return { url, options }
        },
        // 一个二元组，第一个元素是 request 拦截器，第二个元素是错误处理
        [(url, options) => { return { url, options } }, (error) => { return Promise.reject(error) }],
        // 数组，省略错误处理
        [(url, options) => { return { url, options } }]
    ],
    responseInterceptors: [
        // 直接写一个 function，作为拦截器
        (response: any) => {
            // 不再需要异步处理读取返回体内容，可直接在data中读出，部分字段可在 config 中找到
            const { data = {} as any, code } = response;
            // do something
            return data
        },
        // 一个二元组，第一个元素是 request 拦截器，第二个元素是错误处理
        [(response) => { return response }, (error) => { return Promise.reject(error) }],
        // 数组，省略错误处理
        [(response) => { return response }]
    ]
};

export default request