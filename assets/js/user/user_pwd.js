$(function() {
    // 定义校验规则
    var form = layui.form

    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格!'
        ],

        // 新旧密码不能重复
        samePwd: function(value) {
            if (value === $('[name = oldPwd]').val()) {
                return '新密码与旧密码不能一致!'
            }
        },

        // 两次新密码必须相同
        rePwd: function(value) {
            if (value !== $('[name = newPwd]').val()) {
                return '再次确认密码不一致!'
            }
        }
    })

    // 修改密码
    var layer = layui.layer
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('更新密码成功!')

                $('.layui-form')[0].reset()
            }
        })
    })
})