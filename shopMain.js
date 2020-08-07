require.config({
    paths: {
        "jquery": "jquery-1.10.1.min",
        "jqueryCookie": "jquery.cookie"
    },
    shim: {
        "jqueryCookie": ["jquery"],
    }
})

require(["shop"], function(shop){
    shop.getCookie();
    shop.list();
})