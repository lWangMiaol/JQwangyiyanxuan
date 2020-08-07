

define(["jquery", "jqueryCookie"], function($){
   
        //加载右侧购物车的数据
        function sc_msg(){
            shop_num() 
            // $(".sc_right ul").html("");
            // $(".sc_right ul").empty(); //删除该节点下所有的子节点
            $.ajax({
                type: "get",
                url: "./data/goodsData.json",
                success: function(arr){
                    var cookieStr = $.cookie("goods");
                    if(cookieStr){
                        var cookieArr = JSON.parse(cookieStr);
                        var newArr = [];
                        for(var i = 0; i < arr.length; i++){
                            for(var j = 0; j < cookieArr.length; j++){
                                if(arr[i].id == cookieArr[j].id){
                                    arr[i].num = cookieArr[j].num;
                                    newArr.push(arr[i]);
                                }
                            }
                        }

                        // console.log(newArr);
                        for(var i = 0; i < newArr.length; i++){
                            var node = $(`<div class="shop shop${newArr[i].id} clearfn">
                            <input type="checkbox" class="goods goods${newArr[i].id}" name="${newArr[i].id}">
                            <div class="shop_goods clearfn">
                                <img src="${newArr[i].img}" alt="">
                                <h2>${newArr[i].span1}</h2>
                            </div>
                            <div class="shop_goods_num clearfn">
                                <button id="${newArr[i].id}" class="sub">-</button>
                                <input type="text" value="${newArr[i].num}" class="nb nb${newArr[i].id}"></input type="text">
                                <button id="${newArr[i].id}" class="add">+</button>
                            </div>
                            <div class="shop_goods_yuan">
                                <i>￥</i>
                                <span class="pr pr${newArr[i].id}">${newArr[i].num * 399}</span>
                            </div>
                            <button id = "${newArr[i].id}" class="delgoods">删除</button>
                        </div>`);
                            node.appendTo($("#shopbox"));
                        }
                    }

                    //给删除按钮添加点击事件(单独删除该商品)
                    $(".shop").on("click", ".delgoods", function(){
                        shop_num();
                        //2、删除节点
                        $(this).parent().remove();

                        // var id = $(this).closest("li").remove().attr("id");
                        var id = $(this).attr("id");
                        // console.log(id);
                        
                        //1、删除cookie
                        var cookieArr = JSON.parse($.cookie("goods"));
                        for(var i = 0; i < cookieArr.length; i++){
                            if(cookieArr[i].id == id){
                                cookieArr.splice(i, 1);
                                break;
                            }
                        }
                        // //3、判断是否是空数组
                        if(!cookieArr.length){
                            $.cookie("goods", null);
                        }else{
                            $.cookie("goods", JSON.stringify(cookieArr), {
                                expires: 7
                            })
                        }
        
                        shop_num();
                        // priCe();
                        
                    })


                    //清空购物车
                    $(".del_delAll").click(function(){
                        //1、清空cookie
                        $.cookie("goods", null);
                        $("#shopbox").empty();
                        shop_num();
                    })


                    


                    //添加数量加减功能
                    //加
                    $(".shop").on("click", ".add", function(){
                       var id = $(this).attr("id");
                       var v = $(`.nb${id}`).val();
                       $(`.pr${id}`).html(`${v * 399}`);
                       var Cookie = JSON.parse($.cookie("goods"));
                    //    console.log(Cookie);
                        for(var i = 0; i < Cookie.length; i++){
                            if(id == Cookie[i].id){
                                // console.log(Cookie[i]);
                                // console.log(Cookie[i].num);
                                Cookie[i].num++;
                                var sum = Cookie[i].num;
                                // console.log(sum);
                                var obj = {id: Cookie[i].id, num: sum};
                                // console.log(obj);
                                Cookie.splice(i, 1, obj);
                                $.cookie("goods", JSON.stringify(Cookie));
                                // console.log($.cookie("goods"));
                                //设置inpu内的val值;(加商品数量,并存入cookie);
                                $(`.nb${obj.id}`).val(`${obj.num}`);
                                //获取当前id的商品价格
                                var price = parseInt($(`.pr${obj.id}`).html());
                                $(`.pr${obj.id}`).html(`${obj.num * 399}`);
                            }
                        }
                        shop_num();
                    })
                    //减
                    $(".shop").on("click", ".sub", function(){
                       var id = $(this).attr("id");
                       var v = $(`.nb${id}`).val();
                       $(`.pr${id}`).html(`${v * 399}`);
                       var Cookie = JSON.parse($.cookie("goods"));
                    //    console.log(Cookie);
                        for(var i = 0; i < Cookie.length; i++){
                            if(id == Cookie[i].id){
                                // console.log(Cookie[i]);
                                // console.log(Cookie[i].num);
                                Cookie[i].num--;
                                if(Cookie[i].num < 1){
                                    break;
                                }
                                var sum = Cookie[i].num;
                                // console.log(sum);
                                var obj = {id: Cookie[i].id, num: sum};
                                // console.log(obj);
                                Cookie.splice(i, 1, obj);
                                $.cookie("goods", JSON.stringify(Cookie));
                                // console.log($.cookie("goods"));
                                //设置inpu内的val值;(加商品数量,并存入cookie);
                                $(`.nb${obj.id}`).val(`${obj.num}`);
                                //获取当前id的商品价格
                                var price = parseInt($(`.pr${obj.id}`).html());
                                $(`.pr${obj.id}`).html(`${obj.num * 399}`);
                            }
                        }
                        shop_num();
                    })
                    
                    //自定义输入数量
                    /*  */
                    $(".nb").keyup(function(){
                        
                        var o = $(this).val();
                        // console.log(typeof(o));
                    })

                    //商品全选
                    $(".allCheck").click(function(){
                        var isYes = $(this).prop("checked");
                        // console.log(isYes);
                        if(isYes){
                            $("#shopbox").find("input").prop("checked", true);
                        }else{
                            $("#shopbox").find("input").prop("checked", false);
                        }
                    })

                    // 商品单选
                    $(".shop").on("click", ".goods", function(){
                        // console.log("选中了" + $(this).parent().attr("class"));
                        //该节点被选中
                        $(this).prop("checked");
                        // console.log($(this).prop("checked"));
                    })
                    //批量删除
                    $(".del_choseDel").click(function(){
                        shop_num();
                        //获取.shop下的.goods个数;
                        var gLen = $(".shop").find(".goods");
                        // console.log(gLen.length)

                        //获取cookie数组
                        var cookie = JSON.parse($.cookie("goods"));
                        // console.log(cookie.length);
                        for(var i = 0; i < gLen.length; i++){
                            //遍历.goods找出其中中被选中的
                            var ck = $(gLen[i]).prop("checked");
                            if(ck == true){
                                //这是在cookie中要删除的对象
                                var rmobj = parseInt($(gLen[i]).attr("name"));
                                // console.log(rmobj);
                                for(var j = 0; j < cookie.length; j++){
                                    // console.log(cookie[j]);
                                    //遍历cookie,找到cookie[j].id == rmobj;的那个，然后删除，再重新存入cookie;
                                    if(cookie[j].id == rmobj){
                                        cookie.splice(j, 1);
                                    }
                                }
                                $.cookie("goods", JSON.stringify(cookie));

                                //找到该chekbox的父节点,然后移出父节点;从而达到删除此节点的目的;
                                $(gLen[i]).parent().remove();
                            }
                        }
                        // console.log($.cookie("goods"));
                        shop_num();
                    })

                  
                },
                error: function(msg){
                    console.log(msg);
                }
            })
        }


        //读取cookie里的商品数量及id
        function shop_num(){
            var cookieStr = $.cookie("goods");
            // console.log(cookieStr);
            if(cookieStr){
                var cookieArr = JSON.parse(cookieStr);
                // console.log(cookieArr);
                var sum = 0;
                for(var i = 0; i < cookieArr.length; i++){
                    sum += cookieArr[i].num;
                }
                $("#Search_box_right .yuan").html("(" + sum + ")");
                // console.log(sum);
                $(".allprice").html(`￥${sum * 399}`);
            }else{
                $("#Search_box_right .yuan").html("(" + 0 + ")");
                $(".allprice").html(`￥0`);
            }

        } 

        


    // 导航栏 
    // 下拉菜单
    function list(){
        $.ajax({
            type: "get",
            url: "data/data.json",
            success: function(arr){
                var newArr0 = arr[1].child;
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
        
        for(var a = 0; a < $(newArr0).size(); a++){
            // var tiTle = newArr0[i].title;
            var nodea = $(`
                            <li id="list_li" class="list_li${a} clearfn list_l" idx="${a}">
                                <a href="#" id="list_a" class="list_a${a}">${newArr0[a].title}</a>
                            </li>
                        `) 
            nodea.appendTo($("#Nav"));

        }

        $(".list_a0").attr("href", "index.html");
      
        
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
    },
    error: function(msg){
        console.log(msg);
    }
})


 

      

        
    }   
    return {
       getCookie: sc_msg,
       list: list
    }
})