define(['jquery', "jqueryCookie"], function($){
     function show(){
         $(".go").click(function(){
              window.open("index.html", "_blank");
         })
     }
 
     // 表单验证1
     function verify(){
          
           //注册账号密码验证
         $(".ema").blur(function(){
           // alert($(this).val());
           var v = $(this).val();
           if(!v){
               if(!v){
                   $(".ema_p").html("内容不能为空")
                   
              }
           }else if(v.length < 8 && v.length >= 0){
               $(".ema_p").html("请至少输入8位字符");
               
           }else if(/^[a-zA-Z]/.test(v) == false){
                $(".ema_p").html("首位必须以字母开头");
                
           }else if(/[@]([a-zA-Z0-9]+[.][a-zA-Z]{2,3})$/.test(v) == false){
                $(".ema_p").html("格式应为:@xx.com或@xx.cn");
                
           }else{
                $(".ema_p").html("✔");
                
           }
           
       })
 
       //密码框验证
       $(".psd").blur(function(){
               var v = $(".psd").val();
               if(!v){
                   $(".psd_p").html("内容不能为空")
                   
              }else if(v.length < 8 || v.length > 16){
                    $(".psd_p").html("请输入8到16位密码");
                    
               }else{
                    $(".psd_p").html("密码格式正确");
                    
               }
           })
 
        //确认密码
        $(".repsd").blur(function(){
           var v = $(this).val();
           if(!v){
                $(".repsd_p").html("内容不能为空")
                
           }else if(v != $(".psd").val()){
                $(".repsd_p").html("与上一次输入的密码不一致")
                
           }else{
                $(".repsd_p").html("✔");
                
           }
       })
   
       //手机号验证
       $(".num").blur(function(){
           var v = $(this).val();
           if(!v){
               $(".num_p").html("内容不能为空")
               
          }else if(v.length != 11){
                $(".num_p").html("手机号至少为11位")
                
           }else if(/^[0-9]/.test(v) == false){
                $(".num_p").html("手机号首位错误")
                
           }else if(/\D/.test(v)){
                $(".num_p").html("手机号必须为数字")
                
           }else{
                $(".num_p").html("✔");
                
           }
       })
       
       $(".nBtn").on("click" ,function(){
            var ema = $(".ema").val();
            var psd = $(".psd").val();
            var num = $(".num").val();
               $.ajax({
                    type: "post",
                    url: "data/1post.php",
                    data:{
                         useremail: ema,
                         password: psd,
                         phonenum: num,
                    },
                    success: function(data){
                         alert(JSON.parse(data).message);
                    },
                    error: function(msg){
                         console.log(msg);
                    }
               })
       })
       
 
     }
 
     
 
        
 
 
     
     return { 
          show: show,
         verify:verify,
      //    btn: btn,
     }
 })