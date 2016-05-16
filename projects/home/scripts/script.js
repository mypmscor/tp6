jQuery.getJSON("projets.json")
.done( function(jsonData){
    console.log(JSON.stringify(jsonData, null, 4));
})

.fail( function() {
    console.log("Impossible de charger le JSON");
});