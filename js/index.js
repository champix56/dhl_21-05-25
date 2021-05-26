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
    // console.log(evt);
     var userName=this.querySelector('.user-name').innerHTML;
    alert('un user a ete clique :'+userName);
    document.forms["message-sender"]["message-to"].value=userName;
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
function onsubmitmessageform(evt) {
    evt.preventDefault()
    console.log(evt, document.forms);
    var message={
        value:document.forms["message-sender"]["message-value"].value,
        color: document.forms["message-sender"]["message-color"].value,
        to:document.forms["message-sender"]["message-to"].value,
        dateTime:new Date()
    }
    console.log(message);
    
    document.forms["message-sender"].reset();
    document.forms["message-sender"]["message-to"].selectedIndex=-1;
    //ajout au DOM du message avec le template selectionner par document querySelector
    apendMessageOnDOM(message,document.querySelector('.content-list-view-message'));
}

document.forms["message-sender"].addEventListener('submit', onsubmitmessageform);

function apendMessageOnDOM(message,messageTemplate ) {
    //copie de la structure principale pour la rendre independante 
    var toFillTemplate=messageTemplate.cloneNode( true);
    //remplissage des differents champs
    toFillTemplate.querySelector('.message-datetime').innerHTML=message.dateTime.toString();
    toFillTemplate.querySelector('.message-content').innerHTML=message.value;
    //ajout a la liste de message
    document.querySelector('#left-col').append(toFillTemplate);
}
function fillSelectWithUser(user) {
   //je creer une balise option vide 
    var option=document.createElement('option');
   //je met les valeurs a cette balise 
    option.value=user.nom;
    option.innerHTML=user.nom;

    //jajoute cette balise dans le select
    document.forms["message-sender"]["message-to"].append(option);
}
/**
 * ajout d'un user dans la liste des users du tchat
 * @param {object} user objet de data du users a ajouter
 * @param {Element} model model html a peupler avec les valeurs
 */
function appendUserOnDom(user,model) {
    var toFillTemplate=model.cloneNode(true);
    toFillTemplate.querySelector('.user-image').src=user.img;
    toFillTemplate.querySelector('.user-name').innerHTML=user.nom;
    toFillTemplate.addEventListener('click', onuserclick);
    document.querySelector('#right-col').append(toFillTemplate);
    fillSelectWithUser(user);
    
}
//²var unuser=;
appendUserOnDom(
    {id:1,nom:'alex',img:'https://picsum.photos/id/111/200/300'},
        document.querySelector('.content-list-view-user')
);

appendUserOnDom(
    {id:2,nom:'jose',img:'https://picsum.photos/id/114/200/300'},
        document.querySelector('.content-list-view-user')
);
appendUserOnDom(
    {id:3,nom:'pierre',img:'https://picsum.photos/id/231/200/300'},
        document.querySelector('.content-list-view-user')
);





















