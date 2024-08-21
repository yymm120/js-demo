/**
 * JWT包含三个部分
 * 1. header, header是一些基础信息, 例如签名算法'HS256'
 * 2. payload, payload 是要传输的数据
 * 3. signature, signature = Sha256(header.payload + 密钥)
 * 
 * JWT = `${header}.${payload}.${signature}`
 * 
 */


import crypto from 'crypto';

const KEY = '123456';

function sign(info, key) {
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(info);
    return hmac.digest('hex');
}

/**
 * 生成一个jwt的函数
 * @param info 传输的信息
 * @param key 从后端获得的密钥/或者盐
 * @returns 
 */
function jwt(info, key) {
    const header = {
        type: 'JWT',
        alg: 'HS256'
    };
    const headerStr = Buffer.from(JSON.stringify(header)).toString('base64').replace(/=/g, '');
    const payloadStr = Buffer.from(JSON.stringify(info)).toString('base64').replace(/=/g, '');
    const signStr = Buffer.from(sign(headerStr + '.' + payloadStr, key)).toString('base64').replace(/=/g, '');
    return `${headerStr}.${payloadStr}.${signStr}`;
}

const result = jwt({name: 'abc', age: '123'}, KEY);
console.log(result)