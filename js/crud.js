/**
 * Fonction d'appel reseau pour les pages, vues, et ressources d'API
 * @param {URL} url url de ma ressource a recuperer
 * @param {Function} callback fonction à exectuer une fois la fin de reception de la requete effective
 * @param {String?} method methode HTTP soit : GET|POST|PATCH|PUT|DELETE default: GET
 * @param {Object?} body corps objet js de la requete pour l'envoi Default: undefined
 * @param {Object?} async corps objet js de la requete pour l'envoi Default: true
 */
function xhr(url, callback, method,body, async) {
    if (undefined === method) {
        method = 'GET'
    }
    if (undefined === async) {
        async = true
    }
    var xhr = new XMLHttpRequest();
    xhr.open(method, url,async);
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState < XMLHttpRequest.DONE) return;
        if (xhr.status >=400) return;
        // document.querySelector('#main').innerHTML = xhr.response;
        callback(xhr.response)
        console.log(xhr);
    };
    xhr.send(JSON.stringify(body));
    if(!async){callback(xhr.response)}

}

