require("dotenv").config();
const axios = require('axios');
 
// Buscando Access Token do spotify
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;


function getToken(){
   return new Promise((resolve, reject) => { axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')),        
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: {
                grant_type: 'client_credentials'
            },
            json: true,
        })
        .then(body => {
            // console.log(body.data.access_token);
            resolve (body.data.access_token);
        })
        .catch(error => {
            console.log(error.response.data);
            reject(error.response.data);
        });
    });
};
// Exportando função getToken()
module.exports.getToken = getToken;
