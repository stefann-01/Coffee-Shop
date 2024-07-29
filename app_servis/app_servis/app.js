const express = require('express');
const path = require('path');
const BP = require('body-parser');
const Joi = require('joi');
const fs=require('fs');

const app = express();
app.use( express.static( path.join(__dirname, 'static') ) );
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.listen(8000);

app.use('/nova-kafa', BP.urlencoded({extended: false}));
app.post("/nova-kafa", (req, res) => {
    const shema = Joi.object().keys({
        naziv: Joi.string().trim().min(5).max(25).required(),
        opis: Joi.string().trim().min(1).required(),
        kategorija: Joi.string().trim().min(3).required(),
        cena: Joi.number().greater(0).required()
    });
    const {error, succ} = shema.validate(req.body);
    if(error) {
        res.send("Greska: " + error.details[0].message);
        return;
    }
    req.body.opis.replace(/\r?\n|\r/g, '<br>');
    fs.appendFile("kafe.txt",
        JSON.stringify(req.body) + "\n",
        function(err, succ){
            res.send("Poruka je poslata, očekujte odgovor uskoro");
        }
    );
})

app.get("/kafe", (req, res) => {
    // res.send("sva jela");
    const kafe = [];
    fs.readFile('../kafe.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send({ error: "Greška" });
            return;
        }
        else {
            const redovi = data.split('\n');
            for(let i=0; i<redovi.length; i++) {
                let obj = JSON.parse( redovi[i] );
                kafe.push(obj);
            }
        }
        res.json(kafe);
    })
})