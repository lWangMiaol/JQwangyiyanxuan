require.config({
    paths: {
        "jquery": "jquery-1.10.1.min",
        "jqueryCookie": "jquery.cookie"
    },
    shim: {
        "jqueryCookie": ["jquery"]
    }
})

require(["goodsCont", "goodsContTag"], function(goodsCont, goodsContTag){
    goodsCont.download();
    goodsContTag.goodsContTag();
    goodsCont.glass();
    goodsCont.goshop();
}) 