$(function () {
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;

    // 定义美化时间过滤器
    template.defaults.imports.dataFormat = function (date) {
        var dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + "-" + m + '-' + d + " " + hh + ":" + mm + ":" + ss
    }

    // 定义补零函数
    function padZero(n) {
        return n > 9 ? n : "0" + n;
    }
    // 定义查询参数
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    initTable();
    // 获取文章数据列表
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var str = template('tpl-table', res);
                $('tbody').html(str);
                renderPage(res.total);
            }
        })
    }

    initCate();
    // 渲染文章分类的下拉选择框
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取数据失败!')
                }
                var str = template('tpl-cate', res)
                $('[name=cate_id]').html(str)
                form.render();
            }
        })
    }
    // 筛选
    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        var cate_id = $("[name=cate_id]").val();
        var state = $('[name=state]').val();

        q.cate_id = cate_id;
        q.state = state;
        initTable();
    })



    function renderPage(total) {
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: q.pagesize,  //每页显示几条数据
            curr: q.pagenum, //默认选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                if (!first) {
                    initTable()
                }
            }
        });
    }
    // 删除
    $('tbody').on('click', ".btn-delete", function () {
        var id = $(this).attr('data-id');
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg("删除文章失败!")
                    }
                    layer.msg("删除文章成功!")
                    if ($(".btn-delete").length == 1 && q.pagenum > 1) q.pagenum--;
                    initTable();
                }
            })
            layer.close(index);
        });
    })
})