require.config({
    paths: {
        "jquery": "jquery-1.10.1.min",
        "jqueryCookie": "jquery.cookie"
    },
    shim: {
        "jqueryCookie": ["jquery"]
    }
})

require(["goods", "goodsBannerTag"], function(goods, goodsBannerTag){
    goods.download_first();
    goods.download();
    goodsBannerTag.goodsBannerTag();
})