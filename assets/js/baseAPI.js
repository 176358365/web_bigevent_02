// 请求环境的根目录
var userURL = 'http://ajax.frontend.itheima.net';

$.ajaxPrefilter(function (options) {
    options.url = userURL + options.url;
})