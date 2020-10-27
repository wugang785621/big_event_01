// 开发环境服务器地址
var baseUrl = 'http://ajax.frontend.itheima.net'

// 拦截所有ajax请求: get/post/ajax
$.ajaxPrefilter(function(options) {
    // 拼接对应环境服务器地址
    options.url = baseUrl + options.url


    // 统一为有权限的接口,设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
})