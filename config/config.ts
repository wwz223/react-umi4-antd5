import { defineConfig } from '@umijs/max';
import path from 'path';

export default defineConfig({
    openAPI: {
        requestLibPath: "import { request } from 'umi'",
        // 或者使用在线的版本
        // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json",
        schemaPath: path.join(__dirname, 'oneapi.json'),
        mock: false,
    }
})