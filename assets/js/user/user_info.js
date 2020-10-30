$(function() {
    // 1. 自定义验证规则
    var form = layui.form

    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '用户昵称在1~6位之间'
            }
        }
    })


    // 2.获取用户信息
    initUserInfo()
    var layer = layui.layer

    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 把用户信息渲染到表单中
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 3.重置
    $('#btnReset').on('click', function(e) {
        // 阻止浏览器默认行为
        e.preventDefault()

        // 重新渲染用户数据
        initUserInfo()
    })

    // 4.修改用户信息
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg(res.message)
                }
                layer.msg('更新用户成功!')

                // 调用父页面中的更新用户信息和头像方法
                window.parent.getUserInfo()
            }
        })
    })
})