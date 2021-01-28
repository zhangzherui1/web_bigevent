$(function () {
    // 点击去注册账号的链接
    $('#link_reg').on('click', function () {
        $('.reg-box').show().siblings('.login-box').hide()
        $('.login-box').hide()
    })

    // 点击去登录的链接
    $('#link_login').on('click', function () {
        $('.login-box').show().siblings('.reg-box').hide()
        // $('.reg-box').hide()
    })

    // 从 layui 中获取 form 对象
    let form = layui.form
    let layer = layui.layer
    // 通过 form.verify（）函数自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 检验两次密码是否一致的校验规则
        reowd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可

            // 选择类名为reg-box元素 包裹的name属性为password 属于后代选择器
            let pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        let data = $(this).serialize()
        // console.log(data);
        // 发起ajax的post请求
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('#link_login').click()
            }
        })
    })

    // 监听登录表单的提交信息
    $('#form_login').submit(function (e) {
        e.preventDefault()
        let data = $(this).serialize()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data,
            success(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                // 将页面登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href ='../../index.html'
            }
        })
    })
})