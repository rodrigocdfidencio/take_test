const express = require('express');
const api = require("./Api/api");
const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
    try{
        let count = 0;
        let response = [];
        const { data } = await api.get("/repos?per_page=100&sort=created&direction=asc");
        for (let index = 0; index < data.length; index +=1) {
            if (data[index].language == 'C#' && count < 5) {
                    response[count + 1] = {
                        title: data[index].name,
                        subTitle: data[index].description,
                        image: data[index].owner.avatar_url,            
                    };
                    count+=1;
            }
        }
        response = Object.assign({}, response);
        if (response) {
            return res.status(200).send(response)
        } 
    } catch (error){
        res.send({ error: error.message });
    }
});

module.exports = app;
