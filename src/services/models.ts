import { request } from '@umijs/max';

export async function queryModelList(params: any, data: any): Promise<any> {
    return request('/models/page', {
        method: 'POST',
        params,
        data
    });
}

export async function detailModel(id: string): Promise<any> {
    return request(`/models/one/${id}`, {
        method: 'GET',
    });
}

export async function updateModel(data: any): Promise<any> {
    return request('/models/update', {
        method: 'POST',
        data
    });
}

export async function addModel(data: any): Promise<any> {
    return request('/models/add', {
        method: 'POST',
        data
    })
}

/** 模型标签 */

export async function queryModelTags(): Promise<any> {
    return request(`/models/tags/list`, {
        method: 'GET',
    })
}

export async function addModelTag(data: any): Promise<any> {
    return request('/models/tags', {
        method: 'POST',
        data
    })
}
export async function updateModelTag(data: any): Promise<any> {
    return request('/models/tags', {
        method: 'PUT',
        data
    })
}

export async function deleteModelTag(data: any): Promise<any> {
    return request('/models/tags', {
        method: 'DELETE',
        data
    })
}

/** 模型分类 */
export async function queryModelCategories(): Promise<any> {
    return request(`/models/category/list`, {
        method: 'GET',
    })
}

export async function addModelCategory(data: any): Promise<any> {
    return request('/models/category', {
        method: 'POST',
        data
    })
}

export async function updateModelCategory(data: any): Promise<any> {
    return request('/models/category', {
        method: 'PUT',
        data
    })
}

export async function deleteModelCategory(data: any): Promise<any> {
    return request('/models/category', {
        method: 'DELETE',
        data
    })
}