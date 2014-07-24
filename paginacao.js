(function($) {
    var plugin = "paginacao";
    var MyPlugin = function(element, options) {
        var obj = this;
        var settings = $.extend({
            param: 'default value',
            publicMethodCallback: function(msg) {}
        }, options || {});


        // Public method - can be called from client code
        this.publicMethod = function(param) {
            var msg = 'public method called! = ' + settings.param;
            console.log(msg);
            console.log("param = " + param);
            console.log ('elemento chamado: ' + element.attr('class'));
            settings.publicMethodCallback("publicMethodCallback: " + msg);
            //element.hide();
        };
        this.esconde = function (){
            element.hide();
        }

        // Private method - can only be called from within this object
        var privateMethod = function() {
            console.log('private method called!');
        };
    };

    $.fn[plugin] = function(parameter) {

        var params = arguments;
        var method  = typeof parameter == 'string' ? parameter : null;

        return this.each(function()
        {
            if (!$(this).data(plugin)) $(this).data(plugin, new MyPlugin($(this), parameter));
            else if (method) $(this).data(plugin)[method](params[1]);
        });
    };

})(jQuery);

$(document).ready(function() {

	var todos = $("p").myplugin({
        param: "other value",
        publicMethodCallback: function(msg) {
            console.log(msg);
        }
    });

    $("p").myplugin("publicMethod" , 32);
    $(".primeiro").myplugin("publicMethod" , 32);
});
