
var diag;
var utils;

(function($){
  "use strict"

  $(document).ready(function(){

    diag = new LMSDiag();

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

    $("[data-click]").click(function(){
      var val = $(this).data("val");
      diag[$(this).data("click")](val);
    });

  });

})(jQuery);
