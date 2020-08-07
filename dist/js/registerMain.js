require.config({
    paths: {
        "jquery": "jquery-1.10.1.min"
    }
})

require(["register"], function(register){
    register.show(); 
    register.ver(); 
})