(function ($){
$.fn.decomment = function (){
    return this.each(function (){
        $(this).find('*')
        .andSelf()
        .contents()
        .each(function (){
            if(this.nodeType == 8){
                $(this).replaceWith(this.data);
            }
        });
    });
};

// launch only once when it found the selector
$.doWhenVisible = function (selector,callback){
    var onResizeDo = function (){
        var $node = $(selector + ":visible");
        if ($node.length){
            if (callback){
                callback.apply($node);
            }
            $(window).unbind('resize',onResizeDo);
        }
    };
    onResizeDo();
    $(window).resize(onResizeDo);
};

}(jQuery));
