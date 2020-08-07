define(["jquery"], function($){
    
    //小banner轮播图
    function DigitalTag(){
        // console.log("载入成功")
        var iNum = 0;
        var timer = null;



        $("#DigitalChild_banner ol").find("li").eq(0).css({
            background: "#a7936e"
        })

        timer = setInterval(function(){
            // clearInterval(timer);
            
            

            iNum++;
            if(iNum > 2){
                iNum = 0;
            }
            
           
            //ul li的透明动画(达到轮播图淡入淡出效果)
            bannerMove("#DigitalChild_banner", iNum);

            

            //显示对应的ol li
            bannerOl("#DigitalChild_banner", iNum);
            
            
        }, 3000)



        //移入banner_left容器暂停
        $("#DigitalChild_banner").on("mouseenter", "ul", function(){
            clearInterval(timer);
            //显示对应的ol li
            bannerOl("#DigitalChild_banner", iNum);

        }).mouseleave(function(){
            clearInterval(timer);
            timer = setInterval(function(){
                iNum++;
                if(iNum > 2){
                    iNum = 0;
                }

                //ul li的透明动画(达到轮播图淡入淡出效果)
                bannerMove("#DigitalChild_banner", iNum);

                 //显示对应的ol li
                bannerOl("#DigitalChild_banner", iNum);

            }, 3000)


           
            // console.log("leave")
        })

        //点击右箭头下标递增
        $(".Digital_moveBtn_right").on("click", function(){
            clearInterval(timer);
            iNum++;
            if(iNum > 2){
                iNum = 0;
            }

            //ul li的透明动画(达到轮播图淡入淡出效果)
            bannerMove("#DigitalChild_banner", iNum);

            //显示对应的ol li
            bannerOl("#DigitalChild_banner", iNum);

        })

        //点击左箭头下标递减
        $(".Digital_moveBtn_left").on("click", function(){
            clearInterval(timer);
            // console.log(iNum-- + "，右箭头");
            iNum--;
            if(iNum < 0){
                iNum = 2;
            }

            //ul li的透明动画(达到轮播图淡入淡出效果)
            bannerMove("#DigitalChild_banner", iNum);

            //显示对应的ol li
            bannerOl("#DigitalChild_banner", iNum);
        })

        //移入ol li显示对应下标图片
        $("#DigitalChild_banner ol").on("mouseenter", "li", function(){
   
            clearInterval(timer);
            
            iNum = $(this).index();
      
            bannerOl("#DigitalChild_banner", iNum);

            // console.log(iNum + ",three");

            //ul li的透明动画(达到轮播图淡入淡出效果)
            bannerMove("#DigitalChild_banner", iNum);


            
        }).mouseleave(function(){

            clearInterval(timer);
            timer = setInterval(function(){
                iNum++;
                if(iNum > 2){
                    iNum = 0;
                }
                if(iNum < 0){
                    iNum = 2;
                }

                //ul li的透明动画(达到轮播图淡入淡出效果)
                bannerMove("#DigitalChild_banner", iNum);

                //显示对应的ol li
                bannerOl("#DigitalChild_banner", iNum);
            }, 3000)

            

        })




        //////////////////////
        function bannerOl(bannerVessel, inDex){
            //显示对应的ol li
            return $(`${bannerVessel} ol`).find("li").siblings().css({
                background: "white"
            }).eq(inDex).stop(true, true).css({
                background: "#a7936e"
            })
        }
        ///////////////////////


        //////////////////
        function bannerMove(bannerVessel, inDex){
            //ul li的透明动画(达到轮播图淡入淡出效果)
            return $(`${bannerVessel} ul`).find("li").stop(true, true).animate({
                opacity: 0
            }).eq(inDex).stop(true, true).animate({
                opacity: 1
            })
        }
        //////////////////
        
    }

    return {
        DigitalTag: DigitalTag,
    }
})