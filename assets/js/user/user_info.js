$(function () {
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1 ~ 6个字符之间';
            }
        }
    });


    initUserInfo();
    var layer = layui.layer;
    // var form = layui.form;
    // 初始化用户基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败');
                }
                // console.log(res);
                form.val('formUserInfo', res.data);
            }
        })
    }


    // 重置
    $('#btnReset').on('click', function (e) {
        // 阻止表单的默认重置行为
        e.preventDefault();
        initUserInfo();
    })


    // 监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        // 阻止表单默认提交
        e.preventDefault();
        // 发送ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            // 获取表单数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                // 调用父界面中渲染用户头像和用户信息的方法
                window.parent.getUserInfo()
            }
        })
    })
})