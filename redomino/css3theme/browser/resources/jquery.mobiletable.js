(function ($){

$.fn.mobiletable = function(){
    return this.each(function (){
        var $this = $(this);
        $this.addClass('mobile-table');
        var labels = $this
            .find('thead th')
            .map(function (){
                return $(this).text();
            }).get();

        $this.find('td').each(function (){
            var $td = $(this);
            var i = $td.index();
 
            $td.attr('data-label', labels[i]);
        });
    });

};

}(jQuery));


