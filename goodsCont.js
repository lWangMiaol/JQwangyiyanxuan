define(["jquery", "jqueryCookie"], function($){
    function download(){
        shop_num();
        $.ajax({
            type: "get",
            url: "data/data.json",
            success: function(arr){

                //载入购物车
                shop_num()
                //点击跳转至购物车页面
                $("#Search_box_right").on("click", function(){
                    location.href = "shop.html"
                })

                // 搜索
                // 左侧动态图
                var node = `<img src="${arr[0].child[0].img}" alt="">`
                $(node).appendTo($("#Search_box_left"))
                
                // 导航栏,下拉菜单
                list(arr);

                //banner图
                Bigbanner(arr)
                
                
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }


    
    
    // 导航栏
    // 下拉菜单
    function list(arr){
        
        var newArr0 = arr[1].child;
        
        
        for(var a = 0; a < $(newArr0).size(); a++){
            // var tiTle = newArr0[i].title;
            var nodea = $(`
                            <li id="list_li" class="list_li${a} clearfn list_l" idx="${a}">
                                <a href="#" id="list_a" class="list_a${a}">${newArr0[a].title}</a>
                            </li>
                        `) 
            nodea.appendTo($("#Nav"));

        }

        $(".list_a0").click(function(){
            return false;
        });
      
        
        for(var j = 0; j < newArr0.length - 3; j++){
            var nodebox = 
                        `
                        <div id="List_Bigbox" class="List_Bigbox${j + 1} clearfn List_B" name = "${j + 1}"></div>
                        `
            $(nodebox).appendTo($("#Nav"));
        }
        var listArr = arr[18];
        var num = 0;
        for(var x in listArr){
            // console.log(listArr[x].index);
            num++;
            for(var i = 0 ; i < listArr[x].length; i++){
                var nodei = 
                                `
                                        <a href="goods_list.html" class="clearfn">
                                            <img src="${listArr[x][i].img}" alt="">
                                            <span>${listArr[x][i].goods}</span>
                                        </a>
                                        
                                `
                $(nodei).appendTo($(`.List_Bigbox${num}`));
                // console.log(listArr[x][i])
            }
            // console.log(listArr[x]);
            // console.log(num);

        }

       
        
        $("#Nav").on("mouseenter", "#list_li", function(){
            var dex = $(this).attr("idx");
            // console.log(dex);
            var ListArr =  $("#Nav").stop(true, true).find(".List_B");
            // console.log(ListArr.length);
            if(dex < 1 || dex > 8){
                $(ListArr[i]).siblings(".List_B").stop(true, true).fadeOut();
            }

            for(var i = 0; i < ListArr.length; i++){
                // if(ListeArr[i])
                var nam = $(ListArr[i]).attr("name");
                if(dex == nam){
                    // console.log(nam);
                    $(ListArr[i]).siblings(".List_B").stop(true, true).fadeOut().siblings(`[name=${dex}]`).stop(true, true).fadeIn();
                    // console.log("dex:" + dex + "," + "nam:" + nam);
                }
                // console.log(nam);
            }
            // $(".List_B").siblings(`.List_B`).fadeOut().find(`name`,` ${dex}]`).fadeIn();
        
        }).mouseleave(function(){
            // $(".List_B").fadeOut();     
        })
        $("#Nav").mouseleave(function(){
            $(".List_B").stop(true, true).fadeOut();     
        })

        $("#Nav").on("mouseenter" ,".List_B", function(){
            var dex = $(this).attr("name");
            // console.log("进入bigBox的下标" + dex);
            $(".List_B").siblings(`[name = ${dex}]`).stop(true, true).fadeIn();
            
        })
        $("#Nav").on("mouseleave" ,".List_B", function(){
            $(".List_B").stop(true, true).fadeOut();
            
        })


 

      

        
    }   

  
    function Bigbanner(arr){
        // banner图
        var bannerArr = arr[2].child;
            
        for(var j = 0; j < $(bannerArr).size(); j++){
            // 图片
            var bannerArrNode = 
                                `
                                    <li><img src="${bannerArr[j].img}" alt=""></li>
                                `
            
            $(bannerArrNode).appendTo($("#Banner .banul"));

            // 图片对应的ol li标签个数
            var bannerArrNodeOl = 
                                `
                                    <li></li>
                                `

            $(bannerArrNodeOl).appendTo($("#Banner ol"));
        }

    }

    //放大镜
    function glass(){
        $("#small").mouseenter(function(){
            $("#mark,#big").show();
        }).mouseleave(function(){
            $("#mark,#big").hide();
        }).mousemove(function(ev){
            var l = ev.pageX - $(this).offset().left - 110;
            if(l <= 0){
                l = 0;
            }
            if(l >= 250){
                l = 250;
            }

            var t = ev.pageY - $(this).offset().top - 110;
            if(t <= 0){
                t = 0;
            }
            if(t >= 250){
                t = 250;
            }
            $("#mark").css({
                left: l,
                top: t
            })

            //让big下面的图片，反方向，对应倍数移动
            $("#big img").css({
                left: -2 * l,
                top: -2 * t
            })
        })
        
    }

    //点击加入购物车存储商品信息到cookie
    function goshopping(){
        $(".shoppingBtn").click(function(){
            var id = $(this).attr("id");
             //1、是否是第一次添加
             var first = $.cookie("goods") == null ? true : false;
             if(first){
                 var obj = [{id: id, num: 1}];
                 $.cookie("goods", JSON.stringify(obj), {
                     expires: 7
                 })
             }else{
                 var cookieStr = $.cookie("goods");
                 var cookieArr = JSON.parse(cookieStr);
                 var same = false;
                 for(var i = 0; i < cookieArr.length; i++){
                     if(id == cookieArr[i].id){
                         cookieArr[i].num++;
                         same = true;
                         break;
                     }
                 }
                 if(!same){
                     var obj = {id: id, num: 1};
                     cookieArr.push(obj);
                 }

                 $.cookie("goods", JSON.stringify(cookieArr), {
                     expires: 7
                 })

             }

             shop_num();
        }) 

    }
    //修改购物车标志的数量显示
function shop_num(){
    var cookieStr = $.cookie("goods");
    if(cookieStr){
        var cookieArr = JSON.parse(cookieStr);
        var sum = 0;
        for(var i = 0; i < cookieArr.length; i++){
            sum += cookieArr[i].num;
        }
        $("#Search_box_right .yuan").html("(" + sum + ")");
    }else{
        $("#Search_box_right .yuan").html("(" + 0 + ")");
    }
}
    return {
        download: download,
        glass: glass,
        goshop: goshopping,
    }
})