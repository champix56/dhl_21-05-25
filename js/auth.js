var whoami = null;
function makeAuthentification(whoamiId) {

    whoami = users.find(e => {
        return e.id === whoamiId
    });
    xhr('vues/tchat.html',
        function (resp) {
            document.querySelector('#main').innerHTML = resp;
            document.forms["message-sender"].addEventListener('submit', onsubmitmessageform);
            //users.forEach(e=>{})
            users.forEach(function (e) {
                appendUserOnDom(e, userTemplate);
            });
            setInterval(function () {
                xhr(CONFIG.SRV_URL+'/tchatmessages'+CONFIG.ENDING_URL+'?_expand=user&id_gte=' + (lastMessageId + 1),
                    function (fluxJsonDuServer) {
                        var arr = JSON.parse(fluxJsonDuServer);
                        arr.forEach(function (element) {
                            apendMessageOnDOM(element, messageTemplate);
                        });
                    }
                )
            }, CONFIG.PULLING_INTERVAL_TIME);

        }
    );
}
function disconnect(params) {

}
var users = [];
function initAuthent() {
    xhr('vues/auth.html', function (response) {
        //montage de l'authentification dans le dom
        document.querySelector('#main').innerHTML = response;
        //ajout de l'event pour validation de l'authentification
        document.forms["auth"].addEventListener('submit', function (evt) {
            evt.preventDefault();
            var whoamiId = Number(document.forms["auth"]["login"].value);
            makeAuthentification(whoamiId);
        });
        //chargement global des users 
        xhr(CONFIG.SRV_URL+'/tchatusers',
            function (fluxJsonDuServer) {
                users = JSON.parse(fluxJsonDuServer);
                //remplissage des users dans la liste d'authent
                users.forEach(function (element) {
                    var opt = document.createElement('option');
                    opt.value = element.id;
                    opt.innerHTML = element.nom;
                    document.forms["auth"]["login"].append(opt);
                    // appendUserOnDom(element, userTemplate);
                });
            }
        );

    });
}
//evenement lié au chargement principal du dom
window.addEventListener('DOMContentLoaded', initAuthent)