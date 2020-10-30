$(function() {

    initArtCateList()

    var layer = layui.layer

    // 1.获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    // 2.显示添加文章分类列表
    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '260px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })

    // 3.添加文章分类(事件委托的方式)
    var indexAdd = null
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg('文章分类添加失败!')
                }
                layer.msg('文章分类添加成功!')

                initArtCateList()

                layer.close(indexAdd)
            }
        })
    })

    //4.修改文章分类
    var form = layui.form
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function() {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '260px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });
        // 获取Id,发送ajax获取数据,渲染到页面
        var Id = $(this).attr('data-id')

        // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + Id,
            success: function(res) {
                form.val('form-edit', res.data)
            }
        })
    })

    // 5.修改文章分类(事件委托)
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                // 更新成功后重新渲染页面数据
                initArtCateList();
                layer.msg('文章类别更新成功!')
                layer.close(indexEdit)
            }
        })
    })

    // 6.删除文章分类(事件委托)
    $('tbody').on('click', '.btn-delete', function() {
        var Id = $(this).attr('data-id')

        layer.confirm('是否确认删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + Id,
                success: function(res) {
                    if (res.status == 0) {
                        return layer.msg(res.message)
                    }
                    initArtCateList();
                    layer.msg('文章分类删除成功!')
                    layer.close(index);
                }
            })
        });
    })

})