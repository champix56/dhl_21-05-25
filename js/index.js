function onDOMLoaded() {
    var baliseLoad = document.getElementById('js-loaded');
    baliseLoad.style.backgroundColor = "skyblue";
    baliseLoad.innerHTML = "Cool ca marche !!!!";
}
onDOMLoaded();
/**
 * fonction event de click pour un user d'une liste
 * @param {MouseEvent} evt evenement de la souris injecter par addEventListener
 */
function onuserclick(evt) {
    console.log(evt);
    var target=evt.target;
    console.log(this.querySelector('.user-name'));
    alert('un user a ete clique :'+this.querySelector('.user-name').innerHTML);
}
var desBalisesUserDeListe=document.querySelectorAll('.content-list-view-user');
//parcours de liste de noeuds selectionnés
// for (var index = 0; index < desBalisesUserDeListe.length; index++) {
//     console.log(desBalisesUserDeListe[index]);
//     //ajout de lecouteur d'event sur la balise du tableau
//     desBalisesUserDeListe[index].addEventListener('click',onuserclick);
// }
desBalisesUserDeListe.forEach(function(elment,index){
    elment.addEventListener('click',onuserclick);
});
//equivalent foreach es6 
//for (var iterator of object) {
//     console.log(iterator);
// }

// var uneBalise=document.querySelector('.content-list-view-user');
// uneBalise.addEventListener('click',onuserclick)
