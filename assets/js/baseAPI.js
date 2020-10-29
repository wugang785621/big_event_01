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

    // 登录拦截
    options.complete = function(res) {
        console.log(res.responseJSON);
        var obj = res.responseJSON
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            // 清空本地token
            localStorage.removeItem('token')

            // 页面跳转
            location.href = '/login.html'
        }
    }
})