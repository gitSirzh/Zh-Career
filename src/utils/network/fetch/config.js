
/**
 * Created by jszh on 2019/2/14.
 */

const DEV = false;
let apiConfig = null;

if(DEV === "BD"){
    //本地
    apiConfig = {
        BaseUrl:'http://192.168.0.120:8080'
    }
}
else if(DEV){
    //开发地址c
    apiConfig = {
        BaseUrl:'http://music.163.com/api'
    }
}else {
    //生产(网易云音乐)
    apiConfig = {
        BaseUrl:'http://music.163.com/api'
    }
}
const config = {
    apiConfig
};
export  {
    apiConfig
}
export default config
