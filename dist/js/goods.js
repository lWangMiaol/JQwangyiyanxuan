define(["jquery", "jqueryCookie"], function($){
    
    function show(){
        console.log("载入成功")
    }

    function download_first(){
        $.ajax({
            type: "get",
            url: "./data/data.json",
            success: function(arr){

                // 搜索
                // 左侧动态图
                var node = `<img src="${arr[0].child[0].img}" alt="">`
                $(node).appendTo($("#Search_box_left"))

                //点击跳转到购物车
                $("#Search_box_righ").on("click", function(){
                    location.href = "shop.html";
                })
                
                // 导航栏,下拉菜单
                list(arr);

                //banner
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

    //商品详细列表
    function download(){
        $("#Search_box_right").on("click", function(){
            location.href = "shop.html"
        })
        shop_num();
        $.ajax({
            type: "get",
            url: "./data/goodsData.json",
            success: function(data){
                // console.log(data);
                //顶部商品标题
                var nodeTitle = 
                                `
                                    <h2>${data[0].title}</h2>
                                    <p>${data[0].title}</p>
                                `
                $(nodeTitle).appendTo($(".goodsBox_top"));
                //底部商品额
                for(var i = 0; i < $(data).size(); i++){
                    var node = 
                                `
                                <a class="goodsBox_bottomBox goodsBox_bottomBox${i}">
                                    <div class="goodsBox_bottom_imgBox">
                                        <img src="${data[i].img}" alt="" class="goodsBox_bottom_img">
                                    </div>
                                    <div class="goodsBox_bottom_content">
                                        <p class="spanBox spanBox${i}">
                                            
                                        </p>
                                        <h4>${data[i].goodsName}</h4>
                                        <div>
                                            <span class="price">
                                                <span>${data[i].curreny}</span>
                                                <span class="pri">${data[i].price}</span>
                                            </span>
                                            <del class="delPrice">
                                                <span>${data[i].curreny}</span>
                                                <span>${data[i].delPrice}</span>
                                            </del>
                                        </div>
                                        <button id = ${data[i].id} class="goodsShop">加入购物车</button>
                                    </div>
                                </a>
                                `
                    $(node).appendTo($(".goodsBox_bottom"));
                }

                //给商品图片添加点击跳转
                $(".goodsBox_bottom_img").on("click", function(){
                    location.href = "goods_cont.html"
                })
                
                // $(".goodsBox_bottom_imgBox").attr("href", "goods_cont.html")
                // $(".goodsBox_bottomBox0").attr("href", "goods_cont.html");
                // console.log(node);
                isSpan(data, ".spanBox");

                //加入购物车
                $(".goodsBox_bottom_content").on("click", ".goodsShop", function(){
                    //获取商品id
                    var id = $(this).attr("id");
                    // console.log(id);

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
            },
            error: function(msg){
                console.log(msg);
            }
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
            // $(".allprice").html(`￥${sum * 399}`);
            // console.log(sum * 399);
            // console.log($(".allprice").html());
        }else{
            $("#Search_box_right .yuan").html("(" + 0 + ")");
        }
    }

    
    //判断childArr对象中是否有span1(促销标题1) span2(促销标题2) span3(促销标题3);
    //childArr为数组对象,nodeName为class字符串名
    function isSpan(arr, insertName){
        // insertName 自动字符串拼接 => $(`${insertName}${i}`)
        
        //注意  insertName必须为字符串;如果是选择器则要加选择器符号(例如: "#insertName")

        //arr为数组对象,$(`${insertName}${i}`为被插入的节点名
        for(var i = 0; i < $(arr).size(); i++){
            //遍历该数组下的一个或多个含有span的对象
            if(!arr[i].span1 == false && !arr[i].span2 == false &&!arr[i].span3 == false){
                var node = 
                            `
                                <span id="span" class="span1">${arr[i].span1}</span>
                                <span id="span" class="span2">${arr[i].span2}</span>
                                <span id="span" class="span3">${arr[i].span3}</span>
                            `
                $(node).appendTo($(`${insertName}${i}`))//每遍历一组，便把span插入该组
                }else if(!arr[i].span1 == false && !arr[i].span2 == false){
                    var node = 
                                `
                                    <span id="span" class="span1">${arr[i].span1}</span>
                                    <span id="span" class="span2">${arr[i].span2}</span>
                                `
                    $(node).appendTo($(`${insertName}${i}`))
                }else if(!arr[i].span1 == false && !arr[i].span3 == false){
                    var node = 
                                `
                                    <span id="span" class="span1">${arr[i].span1}</span>
                                    <span id="span" class="span3">${arr[i].span3}</span>
                                `
                    $(node).appendTo($(`${insertName}${i}`))
                }else if(!arr[i].span2 == false &&!arr[i].span3 == false){
                    var node = 
                                `
                                    <span id="span" class="span2">${arr[i].span2}</span>
                                    <span id="span" class="span3">${arr[i].span3}</span>
                                `
                    $(node).appendTo($(`${insertName}${i}`))
                }else if(!arr[i].span1 == false){
                    var node = 
                                `
                                    <span id="span" class="span1">${arr[i].span1}</span>
                                `
                    $(node).appendTo($(`${insertName}${i}`))
                }else if(!arr[i].span2 == false){
                    var node = 
                                `
                                    <span id="span" class="span2">${arr[i].span2}</span>
                                `
                    $(node).appendTo($(`${insertName}${i}`))
                }else if(!arr[i].span3 == false){
                    var node = 
                                `
                                    <span id="span" class="span3">${arr[i].span3}</span>
                                `
                    $(node).appendTo($(`${insertName}${i}`))
                }
            }
        }



    //判断数组内的对象是否含有打折之前的价格
    function isDel(arr){
    
        for(var i = 0; i < $(arr).size(); i++){
            //遍历该数组下是否含有delPrice对象

            if(arr[i].delPrice == false){
                // 如果没有delPrice对象,则删除此节点的delPriceBox节点
                    // console.log(arr[i])
                $(`.delPriceBox${i}`).remove();
            }

        }
    }
    
    return {
        download_first: download_first, 
        download: download,
        
    }
})