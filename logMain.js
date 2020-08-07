require.config({
    paths:{
        "jquery": "jquery-1.10.1.min",
        "jqueryCookie": "jquery.cookie"
    },
    shim: {
        "jqueryCookie": ["jquery"]
    }
})

require(["log"], function(log){
    log.show();
    //表单验证
    log.verify();
    //提交按钮
    // log.btn();
})