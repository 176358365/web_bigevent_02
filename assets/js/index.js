$(function () {
    getUserInfo();


    var layer = layui.layer;
    // 退出
    $('#btnLogout').on('click', function () {
        // 框架提供的询问
        layer.confirm('是否确认退出？', { icon: 3, title: '提示' }, function (index) {
            //do something
            //清空本地存储
            localStorage.removeItem('token');
            //跳转到登录页面
            location.href = '/login.html';
            //关闭询问框
            layer.close(index);
        });
    })
})


//获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // // headers就是请求头匹配对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ""
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg("获取用户信息失败");
            }
            // console.log(res);
            //调用renderAvatar渲染用户的头像
            renderAvatar(res.data);
        }
    })
}


function renderAvatar(user) {
    var name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}