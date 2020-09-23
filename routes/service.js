const express = require('express');
const { Router } = require('express');
const router = express.Router();
const axios = require('axios');
const { getToken } = require('./spotifyToken');
const mongoose = require("mongoose");


//Definindo Schema para o MongoDB armazenar as cidades consultadas
const CitySchema = new mongoose.Schema({
        city: {type: String},
        createdAt: {
            type: Date,
            default: Date.now,
        },
    });
const cidade = mongoose.model('city', CitySchema)

router.get('/history', async(req, res) => { 
    const histQuery = await cidade.find().count();
    const cities = await cidade.distinct("city");
    console.log(cities);
    
    const consultasCity =await Promise.all(cities.map(async function (nome,response){
        const somarConsultas = await cidade.distinct("city", {"city":nome}).count();
        response=`{cidade: ${nome}, consultas: ${somarConsultas}}`
        return response
    }));

    const retornoConsultas = consultasCity.map(consultasCityItem => consultasCityItem)
    //retorana o historico de consultas total e por cidade
    return res.status(200).send({
        consultasRealizadas: `${histQuery}`,
        cidadesConsultadas: [`${retornoConsultas}`]
    })
});


router.get('/:city', async(req, res) => {   
    // Busca token para consulta no spotify
    const token = await getToken();
    // Buscando a Temperatura da cidade informada na chamada
    const city = req.params.city
    const prefix = process.env.WEATHER_PREFIX;
    const appid = process.env.WEATHER_APPID;
    //URL para chamada da temperatura
    const temperatura = prefix.concat(city).concat(appid)

    try {
        //Buscando temperatura para Cidade passada na consulta
        const { data } = await axios(temperatura)
        
        if(data.cod === 200){
            //Salvando consulta no MongoDB
            new cidade({
                city:`${city}`
            }).save().then(() => {
                console.log("Cidade inserida com sucesso " + "("+city+")" )
            }).catch((err) => {
                console.log("Houve um erro ao inserir consulta no DB "+ err)
            })

            // Convertendo temperatura absoluta de Kelvin para Celcius(celciusTemp)
            let celsiusTemp = data.main.temp - 273.15;

            // Sugerir musicas Classicas
            if (celsiusTemp <= 10 ) {
                
                const classicList = async (req, res) => {
                    const options = {
                        method: 'get',
                        url: 'https://api.spotify.com/v1/playlists/1eHPuy4fZe0El9wtCJll5g/tracks?fields=items(track(name(name)))',
                        headers: {
                            'Authorization': 'Bearer ' + token    
                        },
                        json: true
                    }
                    //Obtendo lista classica do Spotify
                    return axios(options)
                    .then(body => {
                        let arrayList = [];
                        arrayList = body.data.items;
                        return arrayList
                    }).catch(error => {
                        console.log(error);
                        res = error;
                    });
                }

                const lista = await classicList()
                const playlist = lista.map(listaItem => listaItem.track);
           
                //Retornando genero sugerido e lista de musicas.
                res.status(200).send({
                    gender: 'Musica Classica',
                    playlist:`${playlist.map(playlistItem => [playlistItem.name])}`

                })
            }
            // Sugerir musicas Rock
            else if( celsiusTemp > 10 && celsiusTemp <= 25 ){
                const classicList = async (req, res) => {
                    const options = {
                        method: 'get',
                        url: 'https://api.spotify.com/v1/playlists/2p3JCp6f2Wtutyn0baf7zt/tracks?fields=items(track(name(name)))',
                        headers: {
                            'Authorization': 'Bearer ' + token    
                        },
                        json: true
                    }
                    //Obtendo lista Rock do Spotify
                    return axios(options)
                    .then(body => {
                        let arrayList = [];
                        arrayList = body.data.items;
                        return arrayList
                    }).catch(error => {
                        console.log(error);
                        res = error;
                    });
                }

                const lista = await classicList()
                const playlist = lista.map(listaItem => listaItem.track);
              
                //Retornando genero sugerido e lista de musicas.
                res.status(200).send({
                    gender: 'Rock',
                    playlist:`${playlist.map(playlistItem => [playlistItem.name])}`

                })
            }
            //Sugerir musicas Pop
            else{
                const classicList = async (req, res) => {
                    const options = {
                        method: 'get',
                        url: 'https://api.spotify.com/v1/playlists/6uRb7sx4uFM3Zd5YRKxUDy/tracks?fields=items(track(name(name)))',
                        headers: {
                            'Authorization': 'Bearer ' + token    
                        },
                        json: true
                    }
                    //Obtendo lista pop do Spotify
                    return axios(options)
                    .then(body => {
                        let arrayList = [];
                        arrayList = body.data.items;
                        return arrayList
                    }).catch(error => {
                        console.log(error);
                        res = error;
                    });
                }

                const lista = await classicList()
                const playlist = lista.map(listaItem => listaItem.track);
            
                //Retornando genero sugerido e lista de musicas.
                res.status(200).send({
                    gender: 'Musica Pop',
                    playlist:`${playlist.map(playlistItem => [playlistItem.name])}`

                })
            }


        }
    } catch (error) {

        //tratando erro cidade não encontrada
        if ( error.response.data.cod === '404' ){
            console.error(error.response.data)
            return res.json(error.response.data)
         }else {
             console.error(error)
             return res.json(error)
         }
    }

});

module.exports = router;
