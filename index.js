define(["jquery", "jquery-cookie"], function($){
    
    
    function download(){
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

                //banner
                Bigbanner(arr)
                
                // 11·11再续狂欢
                bannerBottom(arr)

                // 品牌制造商
                brand(arr)

                //新品首发
                brand2(arr)

                //人气推荐
                recommend(arr)

                //福利社
                welfare(arr)

                //居家生活
                homelife(arr)

                //服饰鞋包
                costume(arr);

                //饮食酒水
                food(arr);

                //个护清洁
                clean(arr);

                //母婴亲子
                fransnana(arr);

                //运动旅行
                sportsTravel(arr);

                //数码家电
                Digital(arr);

                //全球特色
                feature(arr);

                //甄选家
                sift(arr);

                //大家都在说
                comment(arr);

                shop_num()
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
            console.log(dex);
            var ListArr =  $("#Nav").stop(true, true).find(".List_B");
            // console.log(ListArr.length);
            if(dex == 0 || dex > 7){
                $("#List_Bigbox").stop(true, true).fadeOut();
            }
            
            if(dex > 0 && dex < 8){
                // $(ListArr[i]).siblings(".List_B").stop(true, true).fadeOut();
                for(var i = 0; i < ListArr.length; i++){
                    // if(ListeArr[i])
                    var nam = $(ListArr[i]).attr("name");
                    if(dex == nam){
                        
                        $(ListArr[i]).siblings(".List_B").stop(true, true).fadeOut().siblings(`[name=${dex}]`).stop(true, true).fadeIn();
                        // console.log("dex:" + dex + "," + "nam:" + nam);
                    }
                    // console.log(nam);
                }
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
    // 11·11再续狂欢
    function bannerBottom(arr){
        var newArr = arr[3].child;
        // console.log(arr[2].child);
        for(var i = 0; i < $(newArr).size(); i++){
            var newArrI = newArr[i];
            var node = `
                            <a href="#">
                                <div class="cont cont${i}">
                                    <div class="title">
                                        <h3>${newArrI.title}</h3>
                                        <p>${newArrI.describe}</p>
                                    </div>
                                </div>
                            </a>
                        `
            $(node).appendTo($("#banBotbottom"));
            if(!newArrI.img){
                $(`.cont${i}`).css({
                    backgroundImage: `url(${newArrI.bgimg})`,
                });
            }else{
                var img = 
                        `
                            <img src="${newArrI.img}" alt="">
                        `
                $(img).appendTo($(`.cont${i}`));
                $(`.cont${i}`).css({
                    backgroundImage: `url(${newArrI.bgimg})`,
                });
            }
        }
    }

    // 品牌制造商
    function brand(arr){
        var newArr = arr[4];
        // console.log(newArr);
        var node1 = `
                    <div id="brandChild_top">
                        <h2>${newArr.title}</h2>
                        <span>${newArr.describe}</span>
                        <a href="#">${newArr.right}</a>
                    </div>
                    `
        $(node1).appendTo($("#brandBox"))
        // console.log(node1);

        var node2 = `
                        <div id="brandChild_bottom"></div>
                    `
        $(node2).appendTo($("#brandBox"))

       
        var childArr = newArr.child;
        // console.log(childArr);
        for(var i = 0; i < $(childArr).size(); i++){
            var node2_child = 
                                `
                                <a href="">
                                    <span>${childArr[i].title}</span>
                                    <div id="brand_price">${childArr[i].price}</div>
                                    <img src="${childArr[i].img}" alt="">
                                </a>
                                `
            $(node2_child).appendTo($("#brandChild_bottom"))
            // console.log(node2_child);
        }
    }
    
    //新品首发
    function brand2(arr){
        var newArr = arr[5];
        // console.log(newArr);
        var node1 = `
                    <div id="brand2Child_top">
                        <h2>${newArr.title}</h2>
                        <span>${newArr.describe}</span>
                        <a href="#">${newArr.right}</a>
                    </div>
                    `
        $(node1).appendTo($("#brandBox2"))


        var node2 = `
                        <div id="brand2Child_bottom"></div>
                    `
        $(node2).appendTo($("#brandBox2"))


        var childArr = newArr.child;
    
        for(var i = 0; i < $(childArr).size(); i++){
            var node2_child = 
                                `
                                <a href="">
                                    <p id="brand2Child_bottom_top" class="brand2Child_bottom_top${i}">
                                        
                                    </p>
                                    <span id="brand2Child_bottom_title">${childArr[i].title}</span>
                                    <div id="brand2_price">${childArr[i].price}<del id="brand2_delPrice">${childArr[i].delPrice}</del></div>
                                    <img src="${childArr[i].img1}" alt="">
                                </a>
                                `
            $(node2_child).appendTo($("#brand2Child_bottom"));
            
        }
        // console.log(childArr);
        isSpan(childArr, `.brand2Child_bottom_top`);

    }
    
    //人气推荐
    function recommend(arr){
        var newArr = arr[6];
        // console.log(newArr);

        
        
        var node1 = `
                    <div id="recommendChild_top">
                        <h2>${newArr.title}</h2>
                        <ul id="recommendChild_top_title_box">
                            
                             
                        </ul>
                        <a href="#">${newArr.right}</a>
                    </div>
                    `
        $(node1).appendTo($("#recommendBox"))

        for(var j = 0; j < $(newArr.child).size(); j++){
            // console.log(j);
            var bottomNode = 
                            `
                            <li id="recommendChild_top_title" class="recommendChild_top_title${j}">
                                <a href="javascript:;" id="recommendChild_top_title_a" class="recommendChild_top_title_a${j}">${newArr.child[j].title}</a>
                            </li>
                            `
            $(bottomNode).appendTo($("#recommendChild_top_title_box"))
            
            var node2 = `
                            <div id="recommendChild_bottom_box" class="recommendChild_bottom_box${j}">
                                <div id="recommendChild_bottom" class="recommendChild_bottom${j}"></div>
                            </div>
                        `
            $(node2).appendTo($("#recommendBox"))
            
            var childArr = newArr.child[j].child;
            // console.log($(childArr).size()); 7, 7
            for(var i = 0; i < $(childArr).size(); i++){
                var node2_child = 
                                    `
                                    <a href="">
                                        <p id="recommendChild_bottom_top" class="recommendChild_bottom_top${j}_child${i} recommendChild_bottom_top${i}">
                                            
                                        </p>
                                        <span id="recommendChild_bottom_title">${childArr[i].title}</span>
                                        <div id="recommend_price">${childArr[i].price}<del id="recommend_delPrice">${childArr[i].delPrice}</del></div>
                                        <img src="${childArr[i].img}" alt="">
                                    </a>
                                    `
                $(node2_child).appendTo($(`.recommendChild_bottom${j}`));
            }
            
            isSpan(childArr, `.recommendChild_bottom_top${j}_child`)
        }
        //添加span1(促销标题1) span2(促销标题2) span3(促销标题3);
        var spanArr1 = arr[6].child[0].child;//编辑推荐内的span
        var spanArr2 = arr[6].child[1].child;//热销总榜内的span
        /* console.log(spanArr1);
        console.log(spanArr2);
        console.log(childArr); */
        /* isSpan(spanArr1, `.recommendChild_bottom_top${0}_child${0}`);
        isSpan(spanArr2, `.recommendChild_bottom_top${1}_child${1}`); */
        
        //默认:编辑推荐有class名active
        $(".recommendChild_top_title0").addClass("active");
        
        // 编辑推荐/热销总榜 切换事件
        $("#recommendChild_top_title_box").on("click", "li", function(){
            var inDex = $(this).index();
            $("#recommendChild_top_title_box li").removeClass("active").eq(inDex).addClass("active");
            
            //编辑推荐和热销总榜下的内容
            /* $(".recommendChild_bottom_bigBox").css("display", "none") */
            if(inDex == 0){
                $(`.recommendChild_bottom_box1`).css({
                    display: "none"
                })
                $(`.recommendChild_bottom_box0`).css({
                    display: "block"
                })
            }

            if(inDex == 1){
                $(`.recommendChild_bottom_box0`).css({
                    display: "none"
                })
                $(`.recommendChild_bottom_box1`).css({
                    display: "block"
                })
            }

            /* console.log($(this).index());//index得到的下标是在父元素下排队排出来的
            console.log($(this).eq());//eq是在整个文档下大排队 */
        })
        
        /* console.log($("#recommendChild_top_title_box").children().size()); */

    }

    //福利社
    function welfare(arr){
        var newArr = arr[7];
        // console.log(newArr);

        
        //居家生活_顶部容器h2标题和右边a链接
        var node1 = `
                            <h2>${newArr.title}</h2>
                            <a href="#">${newArr.right}</a>
                    `
        $(node1).appendTo($("#welfareChild_top"))


        //居家生活_底部容器
         //居家生活_底部容器_左边banner图
         var bannerArr = newArr.child[0].child;
        //  console.log($(bannerArr).size());
        //  console.log($(bannerArr).size());
        for(var i = 0; i < $(bannerArr).size(); i++){
            // 图片
            var bannerArrNode = 
                                `
                                    <li class="welfareChild_bottom_left_img welfareChild_bottom_left_img${i}"><img src="${bannerArr[i].img}" alt=""></li>
                                `
            // console.log(bannerArr);
            $(bannerArrNode).appendTo($(".welfareChild_bottom_left ul"))
        }

         //居家生活_底部容器_中间部分
         var center_bottom_Arr = newArr.child[1];
          //居家生活_底部容器_中间部分_顶部 标题 和 更多》
          var centerArrNode =   
                            `
                            <!-- 顶部_标题  -->
                            <h3 class="welfareChild_center_title">${center_bottom_Arr.title}</h3>
                             <!-- 顶部_更多  -->
                            <a href="" class="welfareChild_center_right">${center_bottom_Arr.right}></a>
                            `
        $(centerArrNode).appendTo($(".welfareChild_center_top"))

        //居家生活_底部容器_中间部分_底部货物
        var center_bottom_Arr_child = center_bottom_Arr.child;
    //    console.log($(center_bottom_Arr_child).size())
       for(var j = 0; j < $(center_bottom_Arr_child).size(); j++){
           var node1 = 
                        `
                        <div class="welfareChild_center_bottom_goods welfareChild_center_bottom_goods${j}">

                            <!-- 货物图片 -->
                            <img src="${center_bottom_Arr_child[j].img}" alt="" class="welfareChild_center_bottom_goods_img welfareChild_center_bottom_goods_img${j}">

                            <!-- 货物右边容器 -->
                            <div class="welfareChild_center_bottom_goods_right">

                                <!-- 货物名 -->
                                <a href="" class="welfareChild_center_bottom_goods_right_a">${center_bottom_Arr_child[j].title}</a>
                                
                                <!-- 货物价格 -->
                                <div class="welfareChild_center_bottom_goods_right_price">
                                    <span class="inform">限时购</span>
                                    <span class="yuan">${center_bottom_Arr_child[j].currency}</span>
                                    <span class="numb">${center_bottom_Arr_child[j].price}</span>
                                </div>

                                <!-- 折扣之前价格 -->
                                <del class="welfareChild_center_bottom_goods_right_delprice">
                                    <span class="del_yuan">${center_bottom_Arr_child[j].currency}</span>
                                    <span class="del_numb">${center_bottom_Arr_child[j].delPrice}</span>
                                </del>

                                <!-- 立即抢购 -->
                                <div class="goshopping">
                                    <a href="" id = goshopping_a_${i} class="goshopping_a">立即抢购</a>
                                </div>
                            </div>
                        </div>
                        `
        // console.log(node1);
        $(node1).appendTo($(".welfareChild_center_bottom"))
       }

       //居家生活_底部容器_右边部分_上
       var rightArr = newArr.child[2]

       //居家生活_底部容器_右边部分_上_顶部的标题和更多
    //    console.log(rightArr);
            var rightArr_titlAndmore = 
                                        `
                                        <h3 class="welfareChild_bottom_right_top_title">${rightArr.title}</h3>
                                        <a href="" class="welfareChild_bottom_right_top_right">${rightArr.right}</a>
                                        `

        // console.log(rightArr_titlAndmore);
        $(rightArr_titlAndmore).appendTo($(".welfareChild_bottom_right_top_top"))

         //居家生活_底部容器_右边部分_上_顶部的货物
         var rightArr_goods = rightArr.child;
        //  console.log(rightArr_goods);
         for(var k = 0; k < $(rightArr_goods).size(); k++){
    
             var rightArr_goodsNode = 
                                `
                            <div class="welfareChild_bottom_right_top_content_goods">

                                <!-- 货物图片 -->
                                <img src="${rightArr_goods[k].img}" alt="" class="welfareChild_bottom_right_top_content_goods_img">
    
    
                                <!-- 货物图片右边容器 -->
                                <div class="welfareChild_bottom_right_top_content_goods_right">
                                    
                                    <!-- 货物名字 -->
                                    <a href="" class="welfareChild_bottom_right_top_content_goods_name">${rightArr_goods[k].title}</a>
        
                                    <!-- 货物价格 -->
                                    <div class="welfareChild_bottom_right_top_content_goods_price_box">
        
                                        <!-- 现在价格 -->
                                        <span class="welfareChild_bottom_right_top_content_goods_price_box_realPrice">
                                            
                                            <!-- 货币符号 -->
                                            <span class="welfareChild_bottom_right_top_content_goods_price_box_realPrice_currency">${rightArr_goods[k].currency}</span>
                                            
                                            <!-- 价格 -->
                                            <span class="welfareChild_bottom_right_top_content_goods_price_box_realPrice_num">${rightArr_goods[k].price}</span>
        
                                        </span>
        
                                        <!-- 货物打折之前的价格 -->
                                        <del class="welfareChild_bottom_right_top_content_goods_price_box_delPrice">
        
                                            <!-- 货币符号 -->
                                            <span class="welfareChild_bottom_right_top_content_goods_price_box_realPrice_currency">${rightArr_goods[k].currency}</span>
                                                                                
                                            <!-- 价格 -->
                                            <span class="welfareChild_bottom_right_top_content_goods_price_box_realPrice_num">${rightArr_goods[k].delPrice}</span>
        
                                        </del>
        
                                        <!-- 货物点击购物车图标进入商品详情页 -->
                                        <i class="welfareChild_bottom_right_top_content_goods_price_box_i"></i>
                                    </div>
    
                                </div>
                            </div>
                                `
            $(rightArr_goodsNode).appendTo($(".welfareChild_bottom_right_top_content"))
            // console.log(rightArr_goodsNode);
         }
    

    
       //居家生活_底部容器_右边部分_下
       var rightArr2 = newArr.child[3];

       //居家生活_底部容器_右边部分_下_顶部的标题和更多
    //    console.log(rightArr);
            var rightArr2_titlAndmore = 
                                        `
                                        <h3 class="welfareChild_bottom_right_bottom_title">${rightArr2.title}</h3>
                                        <a href="" class="welfareChild_bottom_right_bottom_right">${rightArr2.right}</a>
                                        `

        // console.log(rightArr_titlAndmore);
        $(rightArr2_titlAndmore).appendTo($(".welfareChild_bottom_right_bottom_top"))

         //居家生活_底部容器_右边部分_下_顶部的货物
         var rightArr2_goods = rightArr.child;
        //  console.log(rightArr2_goods);
         for(var k = 0; k < $(rightArr2_goods).size(); k++){
    
             var rightArr2_goodsNode = 
                                `
                            <div class="welfareChild_bottom_right_bottom_content_goods">

                                <!-- 货物图片 -->
                                <img src="${rightArr2_goods[k].img}" alt="" class="welfareChild_bottom_right_bottom_content_goods_img">
    
    
                                <!-- 货物图片右边容器 -->
                                <div class="welfareChild_bottom_right_bottom_content_goods_right">
                                    
                                    <!-- 货物名字 -->
                                    <a href="" class="welfareChild_bottom_right_bottom_content_goods_name">${rightArr2_goods[k].title}</a>
        
                                    <!-- 货物价格 -->
                                    <div class="welfareChild_bottom_right_bottom_content_goods_price_box">
        
                                        <!-- 现在价格 -->
                                        <span class="welfareChild_bottom_right_bottom_content_goods_price_box_realPrice">
                                            
                                            <!-- 货币符号 -->
                                            <span class="welfareChild_bottom_right_bottom_content_goods_price_box_realPrice_currency">${rightArr2_goods[k].currency}</span>
                                            
                                            <!-- 价格 -->
                                            <span class="welfareChild_bottom_right_bottom_content_goods_price_box_realPrice_num">${rightArr2_goods[k].price}</span>
        
                                        </span>
        
                                        <!-- 货物打折之前的价格 -->
                                        <del class="welfareChild_bottom_right_bottom_content_goods_price_box_delPrice">
        
                                            <!-- 货币符号 -->
                                            <span class="welfareChild_bottom_right_bottom_content_goods_price_box_realPrice_currency">${rightArr2_goods[k].currency}</span>
                                                                                
                                            <!-- 价格 -->
                                            <span class="welfareChild_bottom_right_bottom_content_goods_price_box_realPrice_num">${rightArr2_goods[k].delPrice}</span>
        
                                        </del>
        
                                        <!-- 货物点击购物车图标进入商品详情页 -->
                                        <i class="welfareChild_bottom_right_bottom_content_goods_price_box_i"></i>
                                    </div>
    
                                </div>
                            </div>
                                `
            $(rightArr2_goodsNode).appendTo($(".welfareChild_bottom_right_bottom_content"))
            // console.log(rightArr2_goodsNode);
         }
    }

    //居家生活
    function homelife(arr){
        var newArr = arr[8];
        // console.log(newArr);

        
        //居家生活_顶部容器h2标题, list列表, 右边a链接
        var node1 = `
                            <h2>${newArr.title}</h2>
                            <ul class = "homelife_ul">
                                
                            </ul>
                            <a href="#" class="homelife_righta">${newArr.right}</a>
                    `
        $(node1).appendTo($("#homelifeChild_top"))

        // 居家生活_list列表
        var listArr = newArr.list;
        for(var i = 0; i < $(listArr).size(); i++){
            var listNode = 
                            `
                            <li><b>/</b><a href="#">${listArr[i].title}</a></li>

                            `
            $(listNode).appendTo($(".homelife_ul"));
            // console.log(listNode)
        }
        //删除第一个li标签内的b标签
        $(".homelife_ul li:eq(0)").find("b").remove();

    
         //居家生活_banner图
        var bannerArr = newArr.child[0].child;
      
        for(var j = 0; j < $(bannerArr).size(); j++){
            // 图片
            var bannerArrNode = 
                                `
                                    <li><img src="${bannerArr[j].img}" alt=""></li>
                                `
            
            $(bannerArrNode).appendTo($("#homelifeChild_banner ul"));

            // 图片对应的ol li标签个数
            var bannerArrNodeOl = 
                                `
                                    <li></li>
                                `
      
            $(bannerArrNodeOl).appendTo($("#homelifeChild_banner ol"));
        }

    
        //居家生活_banner图底部_商品
        var goodsArr = newArr.child[1].child;
        // console.log(goodsArr);
        for(var k = 0; k < $(goodsArr).size(); k++){
            var goodsNode = 
                            `
                            <!-- 商品 -->
                            <div class="homelifeChild_bottom_goods homelifeChild_bottom_goods${k}">
            
                                <!-- 商品图片 -->
                                <div class="homelifeChild_bottom_goods_img">
                                    <img src="${goodsArr[k].img}" alt="">
                                </div>
                                
                                <!-- 商品信息 -->
                                <div class="homelifeChild_bottom_goods_details">
            
                                    <p class="homelifeChild_bottom_goods_details_p homelifeChild_bottom_goods_details_p${k}">
                                       
                                    </p>
            
                                    <h4>${goodsArr[k].title}</h4>
            
                                    <div id="priceBox">
            
                                        <!-- 价格 -->
                                        <span class="priceBox">
                                            <span class="priceBox_curreny">${goodsArr[k].currency}</span>
                                            <span class="priceBox_price">${goodsArr[k].price}</span>
                                        </span>
            
                                        <!-- 打折前价格 -->
                                        <del class="delPriceBox delPriceBox${k}">
                                            <span class="delPriceBox_curreny">${goodsArr[k].currency}</span>
                                            <span class="delPriceBox_delPrice">${goodsArr[k].delPrice}</span>
                                        </del>
                                    
                                    </div>
            
                                </div>
                            </div>
                            `

            $(goodsNode).appendTo($("#homelifeChild_bottom"));
        }
        isSpan(goodsArr, ".homelifeChild_bottom_goods_details_p");
        isDel(goodsArr);
        
  
    }

    //服饰鞋包
    function costume(arr){
        var newArr = arr[9];
        // console.log(newArr);

        
        //服饰鞋包_顶部容器h2标题, list列表, 右边a链接
        var node1 = `
                            <h2>${newArr.title}</h2>
                            <ul class = "costume_ul">
                                
                            </ul>
                            <a href="#" class="costume_righta">${newArr.right}</a>
                    `
        $(node1).appendTo($("#costumeChild_top"))

        // 服饰鞋包_list列表
        var listArr = newArr.list;
        for(var i = 0; i < $(listArr).size(); i++){
            var listNode = 
                            `
                            <li><b>/</b><a href="#">${listArr[i].title}</a></li>

                            `
            $(listNode).appendTo($(".costume_ul"));
            // console.log(listNode)
        }
        //删除第一个li标签内的b标签
        $(".costume_ul li:eq(0)").find("b").remove();

    
         //服饰鞋包_banner图
        var bannerArr = newArr.child[0].child;
    
        for(var j = 0; j < $(bannerArr).size(); j++){
            // 图片
            var bannerArrNode = 
                                `
                                    <li><img src="${bannerArr[j].img}" alt=""></li>
                                `
      
            $(bannerArrNode).appendTo($("#costumeChild_banner ul"));

            // 图片对应的ol li标签个数
            var bannerArrNodeOl = 
                                `
                                    <li></li>
                                `
      
            $(bannerArrNodeOl).appendTo($("#costumeChild_banner ol"));


        }

    
        //服饰鞋包_banner图底部_商品
        var goodsArr = newArr.child[1].child;

        for(var k = 0; k < $(goodsArr).size(); k++){
            var goodsNode = 
                            `
                            <!-- 商品 -->
                            <div class="costumeChild_bottom_goods costumeChild_bottom_goods${k}">
            
                                <!-- 商品图片 -->
                                <div class="costumeChild_bottom_goods_img">
                                    <img src="${goodsArr[k].img}" alt="">
                                </div>
                                
                                <!-- 商品信息 -->
                                <div class="costumeChild_bottom_goods_details">
            
                                    <p class="costumeChild_bottom_goods_details_p costumeChild_bottom_goods_details_p${k}">
                                       
                                    </p>
            
                                    <h4>${goodsArr[k].title}</h4>
            
                                    <div id="priceBox">
            
                                        <!-- 价格 -->
                                        <span class="priceBox">
                                            <span class="priceBox_curreny">${goodsArr[k].currency}</span>
                                            <span class="priceBox_price">${goodsArr[k].price}</span>
                                        </span>
            
                                        <!-- 打折前价格 -->
                                        <del class="delPriceBox delPriceBox${k}">
                                            <span class="delPriceBox_curreny">${goodsArr[k].currency}</span>
                                            <span class="delPriceBox_delPrice">${goodsArr[k].delPrice}</span>
                                        </del>
                                    
                                    </div>
            
                                </div>
                            </div>
                            `

            $(goodsNode).appendTo($("#costumeChild_bottom"));
        }
        isSpan(goodsArr, ".costumeChild_bottom_goods_details_p");
        isDel(goodsArr);
        
  
    }

    //美食酒水
    function food(arr){
        var newArr = arr[10];
        // console.log(newArr);

        
        //美食酒水_顶部容器h2标题, list列表, 右边a链接
        var node1 = `
                            <h2>${newArr.title}</h2>
                            <ul class = "food_ul">
                                
                            </ul>
                            <a href="#" class="food_righta">${newArr.right}</a>
                    `
        $(node1).appendTo($("#foodChild_top"))

        // 美食酒水_list列表
        var listArr = newArr.list;
        for(var i = 0; i < $(listArr).size(); i++){
            var listNode = 
                            `
                            <li><b>/</b><a href="#">${listArr[i].title}</a></li>

                            `
            $(listNode).appendTo($(".food_ul"));
            // console.log(listNode)
        }
        //删除第一个li标签内的b标签
        $(".food_ul li:eq(0)").find("b").remove();

    
         //美食酒水_banner图
        var bannerArr = newArr.child[0].child;
    
        for(var j = 0; j < $(bannerArr).size(); j++){
            // 图片
            var bannerArrNode = 
                                `
                                    <li><img src="${bannerArr[j].img}" alt=""></li>
                                `
      
            $(bannerArrNode).appendTo($("#foodChild_banner ul"));

            // 图片对应的ol li标签个数
            var bannerArrNodeOl = 
                                `
                                    <li></li>
                                `
      
            $(bannerArrNodeOl).appendTo($("#foodChild_banner ol"));


        }

    
        //美食酒水_banner图底部_商品
        var goodsArr = newArr.child[1].child;

        for(var k = 0; k < $(goodsArr).size(); k++){
            var goodsNode = 
                            `
                            <!-- 商品 -->
                            <div class="foodChild_bottom_goods foodChild_bottom_goods${k}">
            
                                <!-- 商品图片 -->
                                <div class="foodChild_bottom_goods_img">
                                    <img src="${goodsArr[k].img}" alt="">
                                </div>
                                
                                <!-- 商品信息 -->
                                <div class="foodChild_bottom_goods_details">
            
                                    <p class="foodChild_bottom_goods_details_p foodChild_bottom_goods_details_p${k}">
                                       
                                    </p>
            
                                    <h4>${goodsArr[k].title}</h4>
            
                                    <div id="priceBox">
            
                                        <!-- 价格 -->
                                        <span class="priceBox">
                                            <span class="priceBox_curreny">${goodsArr[k].currency}</span>
                                            <span class="priceBox_price">${goodsArr[k].price}</span>
                                        </span>
            
                                        <!-- 打折前价格 -->
                                        <del class="delPriceBox delPriceBox${k}">
                                            <span class="delPriceBox_curreny">${goodsArr[k].currency}</span>
                                            <span class="delPriceBox_delPrice">${goodsArr[k].delPrice}</span>
                                        </del>
                                    
                                    </div>
            
                                </div>
                            </div>
                            `

            $(goodsNode).appendTo($("#foodChild_bottom"));
        }
        isSpan(goodsArr, ".foodChild_bottom_goods_details_p");
        isDel(goodsArr);
        
  
    }

    //个护清洁
    function clean(arr){
        var newArr = arr[11];
        // console.log(newArr);

        
        //个护清洁_顶部容器h2标题, list列表, 右边a链接
        var node1 = `
                            <h2>${newArr.title}</h2>
                            <ul class = "clean_ul">
                                
                            </ul>
                            <a href="#" class="clean_righta">${newArr.right}</a>
                    `
        $(node1).appendTo($("#cleanChild_top"))

        // 个护清洁_list列表
        var listArr = newArr.list;
        for(var i = 0; i < $(listArr).size(); i++){
            var listNode = 
                            `
                            <li><b>/</b><a href="#">${listArr[i].title}</a></li>

                            `
            $(listNode).appendTo($(".clean_ul"));
            // console.log(listNode)
        }
        //删除第一个li标签内的b标签
        $(".clean_ul li:eq(0)").find("b").remove();

    
         //个护清洁_banner图
        var bannerArr = newArr.child[0].child;
    
        for(var j = 0; j < $(bannerArr).size(); j++){
            // 图片
            var bannerArrNode = 
                                `
                                    <li><img src="${bannerArr[j].img}" alt=""></li>
                                `
      
            $(bannerArrNode).appendTo($("#cleanChild_banner ul"));

            // 图片对应的ol li标签个数
            var bannerArrNodeOl = 
                                `
                                    <li></li>
                                `
      
            $(bannerArrNodeOl).appendTo($("#cleanChild_banner ol"));


        }

    
        //个护清洁_banner图底部_商品
        var goodsArr = newArr.child[1].child;

        for(var k = 0; k < $(goodsArr).size(); k++){
            var goodsNode = 
                            `
                            <!-- 商品 -->
                            <div class="cleanChild_bottom_goods cleanChild_bottom_goods${k}">
            
                                <!-- 商品图片 -->
                                <div class="cleanChild_bottom_goods_img">
                                    <img src="${goodsArr[k].img}" alt="">
                                </div>
                                
                                <!-- 商品信息 -->
                                <div class="cleanChild_bottom_goods_details">
            
                                    <p class="cleanChild_bottom_goods_details_p cleanChild_bottom_goods_details_p${k}">
                                       
                                    </p>
            
                                    <h4>${goodsArr[k].title}</h4>
            
                                    <div id="priceBox">
            
                                        <!-- 价格 -->
                                        <span class="priceBox">
                                            <span class="priceBox_curreny">${goodsArr[k].currency}</span>
                                            <span class="priceBox_price">${goodsArr[k].price}</span>
                                        </span>
            
                                        <!-- 打折前价格 -->
                                        <del class="delPriceBox delPriceBox${k}">
                                            <span class="delPriceBox_curreny">${goodsArr[k].currency}</span>
                                            <span class="delPriceBox_delPrice">${goodsArr[k].delPrice}</span>
                                        </del>
                                    
                                    </div>
            
                                </div>
                            </div>
                            `

            $(goodsNode).appendTo($("#cleanChild_bottom"));
        }
        isSpan(goodsArr, ".cleanChild_bottom_goods_details_p");
        isDel(goodsArr);
        
  
    }
   
    //母婴亲子
    function fransnana(arr){
        var newArr = arr[12];
        // console.log(newArr);

        
        //母婴亲子_顶部容器h2标题, list列表, 右边a链接
        var node1 = `
                            <h2>${newArr.title}</h2>
                            <ul class = "fransnana_ul">
                                
                            </ul>
                            <a href="#" class="fransnana_righta">${newArr.right}</a>
                    `
        $(node1).appendTo($("#fransnanaChild_top"))

        // 母婴亲子_list列表
        var listArr = newArr.list;
        for(var i = 0; i < $(listArr).size(); i++){
            var listNode = 
                            `
                            <li><b>/</b><a href="#">${listArr[i].title}</a></li>

                            `
            $(listNode).appendTo($(".fransnana_ul"));
            // console.log(listNode)
        }
        //删除第一个li标签内的b标签
        $(".fransnana_ul li:eq(0)").find("b").remove();

    
         //母婴亲子_banner图
        var bannerArr = newArr.child[0].child;
    
        for(var j = 0; j < $(bannerArr).size(); j++){
            // 图片
            var bannerArrNode = 
                                `
                                    <li><img src="${bannerArr[j].img}" alt=""></li>
                                `
      
            $(bannerArrNode).appendTo($("#fransnanaChild_banner ul"));

            // 图片对应的ol li标签个数
            var bannerArrNodeOl = 
                                `
                                    <li></li>
                                `
      
            $(bannerArrNodeOl).appendTo($("#fransnanaChild_banner ol"));


        }

    
        //母婴亲子_banner图底部_商品
        var goodsArr = newArr.child[1].child;

        for(var k = 0; k < $(goodsArr).size(); k++){
            var goodsNode = 
                            `
                            <!-- 商品 -->
                            <div class="fransnanaChild_bottom_goods fransnanaChild_bottom_goods${k}">
            
                                <!-- 商品图片 -->
                                <div class="fransnanaChild_bottom_goods_img">
                                    <img src="${goodsArr[k].img}" alt="">
                                </div>
                                
                                <!-- 商品信息 -->
                                <div class="fransnanaChild_bottom_goods_details">
            
                                    <p class="fransnanaChild_bottom_goods_details_p fransnanaChild_bottom_goods_details_p${k}">
                                       
                                    </p>
            
                                    <h4>${goodsArr[k].title}</h4>
            
                                    <div id="priceBox">
            
                                        <!-- 价格 -->
                                        <span class="priceBox">
                                            <span class="priceBox_curreny">${goodsArr[k].currency}</span>
                                            <span class="priceBox_price">${goodsArr[k].price}</span>
                                        </span>
            
                                        <!-- 打折前价格 -->
                                        <del class="delPriceBox delPriceBox${k}">
                                            <span class="delPriceBox_curreny">${goodsArr[k].currency}</span>
                                            <span class="delPriceBox_delPrice">${goodsArr[k].delPrice}</span>
                                        </del>
                                    
                                    </div>
            
                                </div>
                            </div>
                            `

            $(goodsNode).appendTo($("#fransnanaChild_bottom"));
        }
        isSpan(goodsArr, ".fransnanaChild_bottom_goods_details_p");
        isDel(goodsArr);
        
  
    }
    
    //运动旅行
    function sportsTravel(arr){
        var newArr = arr[13];
        // console.log(newArr);

        
        //运动旅行_顶部容器h2标题, list列表, 右边a链接
        var node1 = `
                            <h2>${newArr.title}</h2>
                            <ul class = "sportsTravel_ul">
                                
                            </ul>
                            <a href="#" class="sportsTravel_righta">${newArr.right}</a>
                    `
        $(node1).appendTo($("#sportsTravelChild_top"))

        // 运动旅行_list列表
        var listArr = newArr.list;
        for(var i = 0; i < $(listArr).size(); i++){
            var listNode = 
                            `
                            <li><b>/</b><a href="#">${listArr[i].title}</a></li>

                            `
            $(listNode).appendTo($(".sportsTravel_ul"));
            // console.log(listNode)
        }
        //删除第一个li标签内的b标签
        $(".sportsTravel_ul li:eq(0)").find("b").remove();

    
         //运动旅行_banner图
        var bannerArr = newArr.child[0].child;
    
        for(var j = 0; j < $(bannerArr).size(); j++){
            // 图片
            var bannerArrNode = 
                                `
                                    <li><img src="${bannerArr[j].img}" alt=""></li>
                                `
      
            $(bannerArrNode).appendTo($("#sportsTravelChild_banner ul"));

            // 图片对应的ol li标签个数
            var bannerArrNodeOl = 
                                `
                                    <li></li>
                                `
      
            $(bannerArrNodeOl).appendTo($("#sportsTravelChild_banner ol"));


        }

    
        //运动旅行_banner图底部_商品
        var goodsArr = newArr.child[1].child;

        for(var k = 0; k < $(goodsArr).size(); k++){
            var goodsNode = 
                            `
                            <!-- 商品 -->
                            <div class="sportsTravelChild_bottom_goods sportsTravelChild_bottom_goods${k}">
            
                                <!-- 商品图片 -->
                                <div class="sportsTravelChild_bottom_goods_img">
                                    <img src="${goodsArr[k].img}" alt="">
                                </div>
                                
                                <!-- 商品信息 -->
                                <div class="sportsTravelChild_bottom_goods_details">
            
                                    <p class="sportsTravelChild_bottom_goods_details_p sportsTravelChild_bottom_goods_details_p${k}">
                                       
                                    </p>
            
                                    <h4>${goodsArr[k].title}</h4>
            
                                    <div id="priceBox">
            
                                        <!-- 价格 -->
                                        <span class="priceBox">
                                            <span class="priceBox_curreny">${goodsArr[k].currency}</span>
                                            <span class="priceBox_price">${goodsArr[k].price}</span>
                                        </span>
            
                                        <!-- 打折前价格 -->
                                        <del class="delPriceBox delPriceBox${k}">
                                            <span class="delPriceBox_curreny">${goodsArr[k].currency}</span>
                                            <span class="delPriceBox_delPrice">${goodsArr[k].delPrice}</span>
                                        </del>
                                    
                                    </div>
            
                                </div>
                            </div>
                            `

            $(goodsNode).appendTo($("#sportsTravelChild_bottom"));
        }
        isSpan(goodsArr, ".sportsTravelChild_bottom_goods_details_p");
        isDel(goodsArr);
        
  
    }
    
    //数码家电
    function Digital(arr){
        var newArr = arr[14];
        // console.log(newArr);

        
        //数码家电_顶部容器h2标题, list列表, 右边a链接
        var node1 = `
                            <h2>${newArr.title}</h2>
                            <ul class = "Digital_ul">
                                
                            </ul>
                            <a href="#" class="Digital_righta">${newArr.right}</a>
                    `
        $(node1).appendTo($("#DigitalChild_top"))

        // 数码家电_list列表
        var listArr = newArr.list;
        for(var i = 0; i < $(listArr).size(); i++){
            var listNode = 
                            `
                            <li><b>/</b><a href="#">${listArr[i].title}</a></li>

                            `
            $(listNode).appendTo($(".Digital_ul"));
            // console.log(listNode)
        }
        //删除第一个li标签内的b标签
        $(".Digital_ul li:eq(0)").find("b").remove();

    
         //数码家电_banner图
        var bannerArr = newArr.child[0].child;
    
        for(var j = 0; j < $(bannerArr).size(); j++){
            // 图片
            var bannerArrNode = 
                                `
                                    <li><img src="${bannerArr[j].img}" alt=""></li>
                                `
      
            $(bannerArrNode).appendTo($("#DigitalChild_banner ul"));

            // 图片对应的ol li标签个数
            var bannerArrNodeOl = 
                                `
                                    <li></li>
                                `
      
            $(bannerArrNodeOl).appendTo($("#DigitalChild_banner ol"));


        }

    
        //数码家电_banner图底部_商品
        var goodsArr = newArr.child[1].child;

        for(var k = 0; k < $(goodsArr).size(); k++){
            var goodsNode = 
                            `
                            <!-- 商品 -->
                            <div class="DigitalChild_bottom_goods DigitalChild_bottom_goods${k}">
            
                                <!-- 商品图片 -->
                                <div class="DigitalChild_bottom_goods_img">
                                    <img src="${goodsArr[k].img}" alt="">
                                </div>
                                
                                <!-- 商品信息 -->
                                <div class="DigitalChild_bottom_goods_details">
            
                                    <p class="DigitalChild_bottom_goods_details_p DigitalChild_bottom_goods_details_p${k}">
                                       
                                    </p>
            
                                    <h4>${goodsArr[k].title}</h4>
            
                                    <div id="priceBox">
            
                                        <!-- 价格 -->
                                        <span class="priceBox">
                                            <span class="priceBox_curreny">${goodsArr[k].currency}</span>
                                            <span class="priceBox_price">${goodsArr[k].price}</span>
                                        </span>
            
                                        <!-- 打折前价格 -->
                                        <del class="delPriceBox delPriceBox${k}">
                                            <span class="delPriceBox_curreny">${goodsArr[k].currency}</span>
                                            <span class="delPriceBox_delPrice">${goodsArr[k].delPrice}</span>
                                        </del>
                                    
                                    </div>
            
                                </div>
                            </div>
                            `

            $(goodsNode).appendTo($("#DigitalChild_bottom"));
        }
        isSpan(goodsArr, ".DigitalChild_bottom_goods_details_p");
        isDel(goodsArr);
        
  
    }

    //全球特色
    function feature(arr){
        var newArr = arr[15];
        // console.log(newArr);

        
        //全球特色_顶部容器h2标题, list列表, 右边a链接
        var node1 = `
                            <h2>${newArr.title}</h2>
                            <ul class = "feature_ul">
                                
                            </ul>
                            <a href="#" class="feature_righta">${newArr.right}</a>
                    `
        $(node1).appendTo($("#featureChild_top"))

        // 全球特色_list列表
        var listArr = newArr.list;
        for(var i = 0; i < $(listArr).size(); i++){
            var listNode = 
                            `
                            <li><b>/</b><a href="#">${listArr[i].title}</a></li>

                            `
            $(listNode).appendTo($(".feature_ul"));
            // console.log(listNode)
        }
        //删除第一个li标签内的b标签
        $(".feature_ul li:eq(0)").find("b").remove();

    
         //全球特色_banner图
        var bannerArr = newArr.child[0].child;
    
        for(var j = 0; j < $(bannerArr).size(); j++){
            // 图片
            var bannerArrNode = 
                                `
                                    <li><img src="${bannerArr[j].img}" alt=""></li>
                                `
      
            $(bannerArrNode).appendTo($("#featureChild_banner ul"));

            // 图片对应的ol li标签个数
            var bannerArrNodeOl = 
                                `
                                    <li></li>
                                `
      
            $(bannerArrNodeOl).appendTo($("#featureChild_banner ol"));


        }

    
        //全球特色_banner图底部_商品
        var goodsArr = newArr.child[1].child;

        for(var k = 0; k < $(goodsArr).size(); k++){
            var goodsNode = 
                            `
                            <!-- 商品 -->
                            <div class="featureChild_bottom_goods featureChild_bottom_goods${k}">
            
                                <!-- 商品图片 -->
                                <div class="featureChild_bottom_goods_img">
                                    <img src="${goodsArr[k].img}" alt="">
                                </div>
                                
                                <!-- 商品信息 -->
                                <div class="featureChild_bottom_goods_details">
            
                                    <p class="featureChild_bottom_goods_details_p featureChild_bottom_goods_details_p${k}">
                                       
                                    </p>
            
                                    <h4>${goodsArr[k].title}</h4>
            
                                    <div id="priceBox">
            
                                        <!-- 价格 -->
                                        <span class="priceBox">
                                            <span class="priceBox_curreny">${goodsArr[k].currency}</span>
                                            <span class="priceBox_price">${goodsArr[k].price}</span>
                                        </span>
            
                                        <!-- 打折前价格 -->
                                        <del class="delPriceBox delPriceBox${k}">
                                            <span class="delPriceBox_curreny">${goodsArr[k].currency}</span>
                                            <span class="delPriceBox_delPrice">${goodsArr[k].delPrice}</span>
                                        </del>
                                    
                                    </div>
            
                                </div>
                            </div>
                            `

            $(goodsNode).appendTo($("#featureChild_bottom"));
        }
        isSpan(goodsArr, ".featureChild_bottom_goods_details_p");
        isDel(goodsArr);
        
  
    }
  
    //甄选家
    function sift(arr){
        var newArr = arr[16];
        // console.log(newArr);

        
        //甄选家_顶部容器h2标题, 描述文字
        var node1 = `
                            <h2>${newArr.title}</h2>
                            <p class="sift_rightp">${newArr.describe}</p>
                    `
        $(node1).appendTo($("#siftChild_top"))

        //甄选家_底部图片
        // console.log(newArr.child)
        var newArrImg = newArr.child;
        for(var i = 0; i < $(newArrImg).size(); i++){
            var node2 = 
                        `
                            <img src="${newArrImg[i].img}" alt="" class="siftChild_bottom_imgBox_a_img siftChild_bottom_imgBox_a_img${i}">
                        `
            $(node2).appendTo($(`.siftChild_bottom_img${i}Box_a`));
        }
 
    } 
    
    //大家都在说
    function comment(arr){
        var newArr = arr[17];
        // console.log(newArr);

        
        //大家都在说_顶部容器h2标题, 描述文字
        var node1 = `
                            <h2>${newArr.title}</h2>
                            <p class="commentBox_top_rightp">${newArr.describe}</p>
                    `
        $(node1).appendTo($("#commentBox_top"))

        //大家都在说_底部banner图片
        var bannerImg = newArr.child[0].child;
        // console.log(bannerImg);
        for(var i = 0; i < $(bannerImg).size(); i++){
            var bannerImgNode = 
                            `
                            <li>
                            <div class="commentBox_bottom_imgBox">
                                <img src="${bannerImg[i].img}" alt="">
                            </div>
                            
                            <div class="commentBox_bottom_imgBox_speakBox">
    
                                <div class="commentBox_bottom_imgBox_speakBox_user">
                                    <span class="user_username">用户名</span>
                                    <span class="user_date">2019.11.17</span>
                                    <span class="user_time">10:00</span>
                                </div>
    
                                <div class="commentBox_bottom_imgBox_speakBox_title">
                                    <h3>评论标题</h3>
                                    <span class="title_prcie">￥200</span>
                                </div>
    
                                <div class="commentBox_bottom_imgBox_bottom">
                                    <div class="commentBox_bottom_imgBox_speakBox_cont">
                                        评论内容评论内容评论内容评论内容评论内容评论内容
                                    </div>
                                </div>
    
                            </div>
                        </li>
                            `
            $(bannerImgNode).appendTo($(".commentBox_bottom_ul"))
        }


        var iNum = 0;
        var timer = null;
        timer = setInterval(function(){
            iNum--;
            if(iNum < -9){
                iNum = -4;
            }
            $(".commentBox_bottom_ul").stop(true, true).animate({
                left: iNum  * 356
            })
        }, 3000)

        $(".commentBox_moveBtn_left").click(function(){
           
            iNum++;
            if(iNum > 0){
                iNum = -5;
            }
            if(iNum > 9){
                iNum = 4;
            }
            $(".commentBox_bottom_ul").stop(true, true).animate({
                left: iNum  * 356
            }, 100)
            // console.log(iNum);
        })
        $(".commentBox_moveBtn_right").click(function(){
            
            iNum--;
            if(iNum < -9){
                iNum = -4;
            }
            $(".commentBox_bottom_ul").stop(true, true).animate({
                left: iNum  * 356
            }, 100)
            console.log(iNum);
        })

        //鼠标移入暂停,移出继续自动翻页
        $(".commentBox_bottom_ul").mouseenter(function(){
            clearInterval(timer);
        }).mouseleave(function(){
            timer = setInterval(function(){
                iNum--;
                if(iNum < -9){
                    iNum = -4;
                }
                $(".commentBox_bottom_ul").stop(true, true).animate({
                    left: iNum  * 356
                })
            }, 3000)
        })
       


        // show();
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
    
    //侧边导航
    function leftNav(){
        
        // alert($(document).height());
        //当前页面的总高度
        var allTop = $(document).height();
        //当前可视窗口的高度
        var winTop = $(window).height() / 2;
        //当前页面的滚动高度
        var scrTop = $(document).scrollTop();
        //物体的高度
        var x = $("#leftNav").height() * 2;
        if(scrTop < 950){
            $("#leftNav").css({
                top: 650,
            })
        }

        $(document).scroll(function(){
            //当前可视窗口的高度
            var winTop = $(window).height();
            //当前页面的滚动高度
            var scrTop = $(document).scrollTop();
            if(scrTop > 950){
                $("#leftNav").css({
                    top: scrTop + winTop - x + 450,
                })
            }
            
            /* console.log("页面总高度" + allTop + "," + "可是窗口的高度" + winTop + "," + "滚动的高度" + scrTop + "," + x); */
            // console.log("当前滚动距离" + Math.round(scrTop));
            
        })

        $("#leftNav").find("button").eq(0).click(function(){
            top();
            location.href = "#Top_box";
            
        })
        $("#leftNav").find("button").eq(1).click(function(){
            top();
            location.href = "#recommend";
            
        })
        $("#leftNav").find("button").eq(2).click(function(){
            top();
            location.href = "#welfare";
            
        })
        $("#leftNav").find("button").eq(3).click(function(){
            top();
            location.href = "#homelife";
            
        })
        $("#leftNav").find("button").eq(4).click(function(){
            top();
            location.href = "#costume";
            
        })
        $("#leftNav").find("button").eq(5).click(function(){
            top();
            location.href = "#food";
            
        })
        $("#leftNav").find("button").eq(6).click(function(){
            top();
            location.href = "#clean";
            
        })
        $("#leftNav").find("button").eq(7).click(function(){
            top();
            location.href = "#fransnana";
            
        })
        $("#leftNav").find("button").eq(8).click(function(){
            top();
            location.href = "#sportsTravel";
            
        })
        $("#leftNav").find("button").eq(9).click(function(){
            top();
            location.href = "#Digital";
            
        })
        $("#leftNav").find("button").eq(10).click(function(){
            top();
            location.href = "#feature";
            
        })
        $("#leftNav").find("button").eq(11).click(function(){
            top();
            location.href = "#sift";
            
        })
        $("#leftNav").find("button").eq(12).click(function(){
            top();
            location.href = "#comment";
            
        })
        $("#leftNav").find("button").eq(13).click(function(){
            top();
            location.href = "#foot";
            
        })

        function top(){
            $("#leftNav").css({
                top: 1000,
            })
        }
    }   

    return {
        download: download,
        leftNav: leftNav, 
    }
})