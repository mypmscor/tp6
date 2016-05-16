

//(function () {
    "use strict";
    
var input = document.querySelector("#input");
var todolist = document.querySelector("#todolist");
var donelist = document.querySelector("#donelist");
var maskBtn = document.querySelector("#maskBtn");
var deleteBtn = document.querySelector("#deleteBtn");
var template = document.querySelector("template").content.firstElementChild;    
    
disabledDeleteBtn();
disabledMaskBtn();
dataUpdated();
    
    input.onkeypress = function (e) {
        if (!e) e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '13') {
            if(input.value.trim() != ""){
				ajouterTodo(input.value.trim());				
			}
            input.value = "";
            return false;
        }
    };
    
  

    //var qstr = document.querySelectorAll("#selectedSkin");

    function parseQueryString(qstr)
    {
            var query = {};
            var parameters = qstr.substr(1).split('&');
            for(var i = 0; i < parameters.length; i++)
            {
                var keyAndValue = parameters[i].split('=');
                var key = decodeURIComponent(keyAndValue[0]);
                var value = decodeURIComponent(keyAndValue[1] || '')
                query[key] = value;
            }
            return query;
    }


    selectedSkin.onchange = function() {
        //console.warn("skin", selectedSkin.value);
        document.documentElement.className = selectedSkin.value;
        localStorage.setItem("skinColor", selectedSkin.value);
    };


   


  
    
    function ajouterTodo(todoTexte) {
        todoTexte = todoTexte || 'Chose à faire';
        var article = template.cloneNode(true);
        // Completer la case manquante (todotexte)
        var img = article.querySelector('img');
          var  checkbox = article.querySelector('input');
         var   div = article.querySelector('div');
        div.textContent = todoTexte;
        div.onkeypress = function (e) {
            if (!e) e = window.event;
            var keyCode = e.keyCode;
            if (keyCode == '13') {
                var child = this.parentNode.nextElementSibling;
                if (child)
                    child.querySelector("div").focus();
                else if (this.parentNode.parentNode.nextElementSibling) {
                    console.log((this.parentNode).parentNode.nextElementSibling);
                    var article = this.parentNode.parentNode.nextElementSibling.querySelector("article");
                    if (article) {
                        article.querySelector("div").focus()
                    } else {
                        input.focus();
                    }
                } else
                    input.focus();
                return false;
            }
        };
       
        checkbox.onchange = function () {
        checkbox_onchange(this, article);
        };
        checkbox.onkeypress = function (e) {
            if (!e) e = window.event;
            var keyCode = e.keyCode || e.which;
            if (keyCode == '32') {
                checkbox_onkeypress(this,article);
                return false;
            }
            if (keyCode == '13') {
                checkbox_onkeypress(this,article);
                return false;
            }
            
        };
        
        img.onclick = function () {
            deleteTodo(this);
        };
        
        img.onkeypress = deleteTodoOnEnter;
        todolist.insertBefore(article, todolist.firstChild);

        disableTodo();
        disabledMaskBtn();
		dataUpdated();
        
    }
    
        
    function checkbox_onkeypress(checkbox,article) {
         checkbox.checked ? checkbox.checked = false : checkbox.checked = true;
        checkbox_onchange(checkbox, article);
    }
    

    function deleteTodo(img) {
        var child = img.parentNode.nextElementSibling;
        if (child)
            child.querySelector("img").focus();
        else if (img.parentNode.parentNode.nextElementSibling) {
            
            var article = img.parentNode.parentNode.nextElementSibling.querySelector("article");
            if (article) {
                article.querySelector("img").focus()
            } else {
                if(img.parentNode.parentNode.childNodes.length >1){
                    img.parentNode.parentNode.childNodes[img.parentNode.parentNode.childNodes.length-2].querySelector("img").focus();
                }else{
                    input.focus();
                }
            }
        } else{
            if(donelist.childNodes.length >1){
                donelist.childNodes[donelist.childNodes.length-2].querySelector("img").focus();
            }
            else if(todolist.childNodes.length >1){
                todolist.lastChild.querySelector("img").focus();
            }else{
                input.focus();
            }

        }
      img.parentNode.outerHTML = "";
        
        
        disabledMaskBtn();
        disabledDeleteBtn();
		dataUpdated();
    }   
    
    function deleteTodoOnEnter(e) {
        if (!e) e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '13') {
        deleteTodo(this);
	    disableTodo();
   	    dataUpdated();
        return false;
        }
    }
    
    function checkbox_onchange(checkbox, article) 
    {
        if (checkbox.checked) 
        {
           donelist.insertBefore(article, donelist.firstChild); 
        }
        else
        {
            todolist.appendChild(article);
        }
        /*checkbox.checked ? donelist.insertBefore(article, donelist.firstChild) : todolist.appendChild(article);*/
        
        dataUpdated();
        disabledMaskBtn();
        disabledDeleteBtn();
     }
    
    
    function disabledMaskBtn() {
        if (todolist.childNodes.length == 0) {
            maskBtn.disabled = true;
        } else {
            maskBtn.disabled = false;
        }
    }

    function disabledDeleteBtn() {
        if (donelist.childNodes.length == 0) {
            deleteBtn.disabled = true;
        } else {
            deleteBtn.disabled = false;
        }
    }
    
    function disableTodo() {
        todolist.childNodes.length == 0 ? maskBtn.disabled = true  :  maskBtn.disabled = false;
        
    }
    
    maskBtn.addEventListener("click", function () {
        var checklist = todolist.querySelectorAll("input");
        for (var i = 0; i < checklist.length; i++) 
        {
            //checklist[i].click();
            checklist[i].checked = true;
            checkbox_onchange(checklist[i], checklist[i].parentNode);
			
        }
    });
    
    deleteBtn.onclick = function () {
        var deleteimg = donelist.querySelectorAll("img");
        for (var i = 0; i < deleteimg.length; i++) {
            deleteTodo(deleteimg[i]);
			
        }
		dataUpdated();
    };
    
    function dataUpdated()	{
		var todoOne=[];
		var doneOne=[];
		for (let i = 0; i < todolist.children.length; i++)
           {
               todoOne.unshift(todolist.children[i].querySelector("div").textContent);  
           }
            for(let i = 0; i < donelist.children.length; i++)
           {
               doneOne.unshift(donelist.children[i].querySelector("div").textContent);  
           }
        localStorage.setItem('todoOne', JSON.stringify(todoOne));
        localStorage.setItem('doneOne', JSON.stringify(doneOne));
	}
    
    function initialiserDonnees(){     
        var todoOne = JSON.parse(localStorage.getItem('todoOne'));
        var doneOne = JSON.parse(localStorage.getItem('doneOne'));
        for (var i in todoOne)
        {
            ajouterTodo(todoOne[i]);
        }
        for (var i in doneOne)
        {
            ajouterTodo(doneOne[i]);
            todolist.firstChild.querySelector("input").click();   
        }
        
   }

    //function initialiserSkin(){
        //document.documentElement.className = localStorage.getItem("skinColor");
      //document.documentElement.className = parseQueryString(location.search)["skin"];
        // On appliquer le skin de la queryString si ce skin existe et s'il est valide
        if(location.search)
        {
             document.documentElement.className = parseQueryString(location.search)["skin"];
        }
        // Sinon on applique le skin du localStorage, s'il existe
        else if(!location.search)
        {
            document.documentElement.className = localStorage.getItem("skinColor");
        }
        // Sinon on applique le skin par defaut
        else
        {
            selectedSkin.value = "red-on-black";
            document.documentElement.className = selectedSkin.value;
        }
    //}

    initialiserDonnees();
   // initialiserSkin();
//})();

