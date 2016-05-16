(function () {
    var iframe = document.querySelector("iframe");
 
    iframe.l= ajusterEcran;
    window.onresize = ajusterEcran;
    function ajusterEcran()
    {
        iframe.style.height = 'initial';
        iframe.style.height = iframe.contentDocument.body.scrollHeight + 200 +'px';
    }
    

iframe.onload = function () {
    
    this.style.height = this.contentDocument.body.scrollHeight + 200 + 'px';
    
    
    var $iframe = $(iframe);
    
    
    $('#Btn_iframe').click(function(){
        $iframe.slideToggle(500);
    });
//    
//    $('#Btn').click(function(){
//       // var $article = $(article);
/*      var iframeRoot = iframe.contentDocument;
        var $article = $('article', iframeRoot);
//        //var Btn = $("<button>Basculer<br/> affichage</button>");
        $article.append('<button>Basculer <br/>  affichage</button>');
        $(iframeRoot).find("button").css("display", "none");
 */  

    
//    });
//    
    var iframeRoot = iframe.contentDocument;
    var $p = $('p', iframeRoot);
    
    $('#Btn_para').click(function(){
         $p.slideToggle(500);
        
    })
   

       $('#Btn_button').click(function(){

        $(iframeRoot).find("button").slideToggle(500);
    });
   
    
  
        var $Btn = $("<button>Basculer affichage</button>");
        var iframeRoot = iframe.contentDocument;
        var $article = $('article', iframeRoot);
        $article.css("position", "relative");
    
        $Btn.css({
            "border-radius": "5px",
            "opacity": "0.5",
            "font-weight": "bold",
            "position": "absolute",
            "right": "20px",
            "top": "20px",
            "cursor": "pointer",
            "width": "90px"
        });
    
        $Btn.hide();
    
        $Btn.hover(function () {
            $(this).css({
                "color": "red",
                "opacity": "1"
            });
        }, function () {
            $(this).animate({
                "opacity": "0.5"
            },"slow",function () {
                $(this).css({"color": "black"});
            });

        });
        $Btn.click(function () {
            console.log(this);
            var $action = $(this).parent().find('p,ol');
            $action.fadeToggle("slow");
        });
        $article.append($Btn);
   
}
})();