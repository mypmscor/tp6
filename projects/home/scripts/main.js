	
//(function(){
    "use strict";
    
    initAudio();
    initMenu();
    
    function initAudio()
    {
        
    }
    
    function initMenu()
    {
        
    }
//})();


creerMenu();

if(localStorage.checked === "true") {
    sourd.checked = true;
}
else {
    audio.play();
}

// Link the checkBox to the audioSet()
sourd.onclick = audioSet;

function creerMenu() {
   
    /*var projects = [
                    {
                        nom: "Tutoriel JS",
                        dir: "../tutoriel/index.html",
                        
                    },
                    {
                        nom: "Pens",
                        dir: "../pens/index.html",
                        desc: "Exercices que j'ai faits sur CodePen."
                    },
                    {
                        nom: "Youtube",
                        dir: "../youtube/youtube.html"
                        
                    },

                    {
                        nom: "Todo",
                        dir: "../todo/index.html"
                    },
                                      
                    {
                        nom: "Todo (<span style = 'color:red'>classique</span>)",
                        dir: "../todo/index.html?skin=red-on-black"
                       
                    },
                    {
                        nom: "Todo (<span style = 'color:orange'>Orange</span>)",
                        dir: "../todo/index.html?skin=blue-on-orange"
                        
                    },
                           {
                        nom: "Todo (<span style = 'color:gray'>Gray</span>)",
                        dir: "../todo/index.html?skin=green-on-gray"
                        
                    },
                    {
                        nom: "Todo (<span style = 'color:green'>Green</span>)",
                        dir: "../todo/index.html?skin=gray-on-green"
                        
                    },
                    {
                        nom: "Langues",
                        dir: "../langues/index.html",
                        desc: "Pratique de l'utilisation des sélecteurs et de la mise en page avec CSS3",
                        sujet: ["CSS3","HTML5","Selecteurs"]
                    }
                ];*/
  
    
    
    
//    for(var i = 0; i < projects.length; i++)
//    {
//        ul.innerHTML += creerItemMenu(projects[i]);
//    }
//    
//
//    function creerItemMenu(project) {
//      var li = "";
//      li += "<li>";
//      li += "<a href=";
//      li += project.dir;
//      li += ">";
//      li += project.nom;
//      li += "</a>";
//      li += "</li>";
//        
//      
//      return li;
//    }
    
 jQuery.getJSON("scripts/projets.json")
.done( function(jsonData){
    console.log(JSON.stringify(jsonData, null, 4));
     
    // Afficher le menu a partir des donnees JSON
    initJason(jsonData);

    
})

.fail( function() {
    console.log("Impossible de charger le JSON");
});   
}
function initJason(jsonData){
    var projects =jsonData;
    // 1. On recupere le template
    var theTemplateScript = document.querySelector("#entry-template").innerHTML;
    // 2. On compile le template
    var theTemplate = Handlebars.compile(theTemplateScript);
    // 3. On définie le contexte
    var context = { "projects" : projects };
    // 4. On rempplit les cases blanches en appliquant le template au contexte
    var theCompiledHtml = theTemplate(context);
    // 5. On injecte le HTML obtenu dans la page web
    var ul = document.querySelector("#ulMenu");
    ul.innerHTML = theCompiledHtml;
}

	function audioSet()
	{
        localStorage.checked = sourd.checked;
		if(sourd.checked)
		{
            audio.load();
			//hido.innerHTML = "Activer la sourdine"; 
			document.getElementById("label").title = "Désactiver la sourdine";
		}
		else
		{
			audio.play();
			document.getElementById("label").title = "Activer la sourdine";
		}
	}




console.log("home/scripts/main.js");