$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    $('#btnChooseImage').on('click', function () {
        $("#file").click();
    })
    var layer = layui.layer;
    $("#file").on('change', function (e) {
        // 获取用户选择文件
        var filelist = e.target.files;
        // console.log(filelist);
        if (filelist.length === 0) {
            return layer.msg('请选择照片！');
        }

        // 拿到用户选择得文件
        var file = e.target.files[0];
        // 将文件转换为路径
        var imgURL = URL.createObjectURL(file);
        // 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域   
            .attr('src', imgURL) // 重新设置图片路径  
            .cropper(options) // 重新初始化裁剪区域
    })

    $('#btnQueDing').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布   
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        // 把头像上传到服务器
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败！')
                }
                layer.msg('更换头像成功！')
                window.parent.getUserInfo();
            }
        })
    })

    getUserInfo();
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
                console.log(res);
                $image
                    .cropper('destroy') // 销毁旧的裁剪区域   
                    .attr('src', res.data.user_pic) // 重新设置图片路径  
                    .cropper(options) // 重新初始化裁剪区域
            }
        })
    }
})