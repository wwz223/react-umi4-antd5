import { request } from '@umijs/max';

export async function login(body: {
    loginType: "feishu" | "feishu2",
    extra: {
        authCode: string;
        redirectUri: string;
    }
}, options?: any) {
    return request('/auth/login', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}