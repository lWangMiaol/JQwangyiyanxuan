// console.log("载入成功");

require.config({
    paths: {
        "jquery": "jquery-1.10.1.min",
        "jquery-cookie": "jquery.cookie"
    },
    shim: {
        "jquery-cookie": ["jquery"],
    }
})

require(["index", "BannerTag", "welfareTag", "homelifeTag", "costumeTag", "foodTag", "cleanTag", "fransnanaTag", "sportsTravelTag", "DigitalTag", "featureTag"], function(index, BannerTag, welfareTag, homelifeTag, costumeTag, foodTag, cleanTag, fransnanaTag, sportsTravelTag, DigitalTag, featureTag){
    // 加载首页数据
    index.download();
    index.leftNav();
    //Banner图
    BannerTag.BannerTag();
    //福利社banner轮播效果
    welfareTag.tagBanner();
    //居家生活banner轮播效果
    homelifeTag.homelifeTag();
    //服饰鞋包banner轮播效果
    costumeTag.costumeTag();
    //饮食酒水banner轮播效果
    foodTag.foodTag();
    //个护清洁banner轮播效果
    cleanTag.cleanTag();
    //母婴亲子banner轮播效果
    fransnanaTag.fransnanaTag();
    //运动旅行banner轮播效果
    sportsTravelTag.sportsTravelTag();
    //数码家电banner轮播效果
    DigitalTag.DigitalTag();
    //全球特色banner轮播效果
    featureTag.featureTag();
})