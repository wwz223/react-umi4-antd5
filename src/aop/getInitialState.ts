export async function getInitialState(): Promise<any> {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '') || {};

    return {
        role: userInfo?.role,
        name: userInfo?.nickname,
        avatar: userInfo?.avatar,
    };
}