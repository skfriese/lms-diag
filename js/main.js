
var diag;
var utils;

(function($){
  "use strict"

  $(document).ready(function(){

    diag = new LMSDiag();
    $('.nav-tabs').tab();

    $(window).on("unload", function(){
      if(diag.terminated){return;}
      try
      {
        diag.setSessionTime();
        diag.commit();
        diag.terminate();
      }
      catch(e){}
    });

    $("[data-click]").click(function(e){
      var key = $(this).data("key");
      var val = $(this).data("val");
      diag[$(this).data("click")](key,val,e);
    });

  });

})(jQuery);
