
// export const MODEL = 'dev';//模式
   export const MODEL = 'test';//模式
// export const MODEL = 'pro';//模式
// const MODEL = 'local';//本地
let HTTP = '';//协议
let HOST = '';//域名
let USERMODELURL = '';//用户模块请求地址


    switch (MODEL){
        case 'dev'://开发
            HOST = '192.168.1.66:10000';//
            HTTP =  'http://';
            break;

        case 'test'://测试
            HOST = 'api.yangyangchong.com/api/v1';
            HTTP =  'http://';
            break;
        case 'local'://本地
            HOST = '';
            HTTP =  '';
            break;
        
    }

USERMODELURL += HTTP + HOST;

export default USERMODELURL;

