require({
    paths: {
        "jquery": "jquery-1.10.1.min"
    }
})

require(["goodsCont"], function(goodsCont){
    goodsCont.glass();
})