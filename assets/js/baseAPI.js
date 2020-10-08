// 请求环境的根目录
var userURL = 'http://ajax.frontend.itheima.net';

$.ajaxPrefilter(function (options) {
    options.url = userURL + options.url;
    //统一为有权限的接口，设置headers请求头
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ""
        }
    }

    //全局同意挂载complete 回调函数
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 强制清空token
            localStorage.removeItem('token');
            // 跳转到首页
            location.href = '/login.html';
        }
    }
})

