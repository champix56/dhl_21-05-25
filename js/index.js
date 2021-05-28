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
    var userId =  this.id.substring(5);
   // alert('un user a ete clique :' + userName);
    document.forms["message-sender"]["message-to"].value = userId;
}

/**
 * soumission du formulaire pour un message
 * @param {FormEvent} evt 
 */
function onsubmitmessageform(evt) {
    evt.preventDefault()
    console.log(evt, document.forms);
    var message = {
        value: document.forms["message-sender"]["message-value"].value,
        color: document.forms["message-sender"]["message-color"].value,
        to:Number( document.forms["message-sender"]["message-to"].value),
        dateTime: new Date().toISOString(),
        userId: whoami.id
        //, user:whoami
    }
    console.log(message);

    document.forms["message-sender"].reset();
    document.forms["message-sender"]["message-to"].selectedIndex = -1;
    //ajout au DOM du message avec le template selectionner par document querySelector
    xhr(CONFIG.SRV_URL+'/tchatmessages'+CONFIG.ENDING_URL,
        recievedPostedMessage,
        'POST',
        message
    );

    ;
}
function recievedPostedMessage(reponseDuServeur) {
    responseDuServeur = JSON.parse(reponseDuServeur);
    responseDuServeur.user = whoami;
    apendMessageOnDOM(responseDuServeur, messageTemplate)
}
var lastMessageId=-1;
function apendMessageOnDOM(message, messageTemplate) {
    //copie de la structure principale pour la rendre independante 
    var toFillTemplate = messageTemplate.cloneNode(true);
    //remplissage des differents champs
    toFillTemplate.querySelector('.message-datetime').innerHTML = message.dateTime;
    toFillTemplate.querySelector('.message-content').innerHTML = message.value;
    toFillTemplate.querySelector('img').src = message.user.img;
    if (message.to === whoami.id) {
        toFillTemplate.querySelector('.message-content').style.fontStyle="italic"
        toFillTemplate.querySelector('.message-content').style.fontWeight="900"
    }
    //ajout a la liste de message
    document.querySelector('#left-col').append(toFillTemplate);
    if(lastMessageId<message.id)lastMessageId=message.id;
}
function fillSelectWithUser(user) {
    //je creer une balise option vide 
    var option = document.createElement('option');
    //je met les valeurs a cette balise 
    option.value = user.id;
    option.innerHTML = user.nom;

    //jajoute cette balise dans le select
    document.forms["message-sender"]["message-to"].append(option);
}
/**
 * ajout d'un user dans la liste des users du tchat
 * @param {object} user objet de data du users a ajouter
 * @param {Element} model model html a peupler avec les valeurs
 */
function appendUserOnDom(user, model) {
    var toFillTemplate = model.cloneNode(true);
    toFillTemplate.id='user-'+user.id;
    toFillTemplate.querySelector('.user-image').src = user.img;
    toFillTemplate.querySelector('.user-name').innerHTML = user.nom;
    toFillTemplate.addEventListener('click', onuserclick);
    document.querySelector('#right-col').append(toFillTemplate);
    fillSelectWithUser(user);

}


// users.forEach(function (element) {
//     appendUserOnDom(element, document.querySelector('.content-list-view-user'));
// });




// messages.forEach(function (element) {
//     //recuperation du user ayant le meme id que userId dans le message
//    var leBonUserDeLidDuMessage= users.find(function (userElement) { return element.userId===userElement.id});
//    //insertion du bon user trouvé dans le message sous le champs user
//     element.user=leBonUserDeLidDuMessage;
//     console.log(element)
//     //envoie du message pour insertion dans le DOM
//     apendMessageOnDOM(element, document.querySelector('.content-list-view-message'));
// });






































