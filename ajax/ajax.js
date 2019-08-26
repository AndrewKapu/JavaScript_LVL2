'use strict';

let request = Math.random();

request > .5 ? getData('ok.json') : getData('error.json');

function getData(url) {
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(json => {
            alert(json.msg);
        })
}