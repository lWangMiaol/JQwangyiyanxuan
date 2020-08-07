define(["jquery"], function($){
    function show(){
        $(".go").click(function(){
            window.open("index.html", "_blank");
       })
    }
    
    //账号密码格式验证
    function ver(){
        $(".ema").blur(function(){
            var v = $(".ema").val();
            if(v.length < 6){
                $(".ema_p").html("账号长度不小于6位");
            }else if(!/^[A-Za-z]/.test(v)){
                $(".ema_p").html("账号必须要以字母开头");
            }else if(!/[@][a-zA-Z]+[.][a-zA-Z]{2,3}/.test(v)){
                $(".ema_p").html("账号格式必须为xxx@xx.xxx或xxx@xx.xx");
            }
            else{
                $(".ema_p").html("");
            }
        })

        $(".psd").blur(function(){
            var v = $(this).val();
            if(v.length < 8 || v.length > 16){
                $(".psd_p").html("密码长度不对");
            }else{
                $(".psd_p").html("");
            }
        })

        $(".nBtn").click(function(){
            
            var ema = $(".ema").val();
            var psd = $(".psd").val();
            $.ajax({
                type: "post",
                url: "data/2post.php",
                data: {
                    useremail: ema,
                    password: psd,
                },
                success: function(result){
                    var res = JSON.parse(result);
                    if(res.code == 1){
                        $(".ema_p").html("邮箱账号不能为空").css({
                            color: "red",
                        });
                        $(".psd_p").html("");
                    }
                    if(res.code == 2){
                        $(".ema_p").html("");
                        $(".psd_p").html("密码不能为空").css({
                            color: "red",
                        });
                    }
                    if(res.code == 3){
                        $(".ema_p").html("");
                        $(".psd_p").html("服务器连接失败").css({
                            color: "red",
                        });
                    }
                    if(res.code == 4){
                        $(".ema_p").html("");
                        $(".psd_p").html("账号或密码错误~~").css({
                            color: "red",
                        });
                    }
                    if(res.code == 5){
                        $(".ema_p").html("");
                        $(".psd_p").html("登陆成功✔").css({
                            color: "green",
                        });
                    }
                    if(res.code == 6){
                        $(".ema_p").html("邮箱账号不能为空").css({
                            color: "red",
                        });
                        $(".psd_p").html("密码不能为空").css({
                            color: "red",
                        });
                    }
                },
                error: function(msg){
                    console.log(msg);
                }
            })
        })
    }
    return {
        show: show,
        ver: ver,
    }
})