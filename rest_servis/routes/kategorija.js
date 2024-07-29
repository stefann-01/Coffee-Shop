const express = require("express");
const { sequelize, Kafa, Kategorija, KafaDodatak, Dodatak, StavkaNarudzbine, Narudzbina } = require("../models");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));

route.get("/", async (reg, res) => {
    try{
        const kategorija = await Kategorija.findAll();
        return res.json(kategorija)
    }
    catch (err){
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/:id", async (req, res) => {
    try{
        const kategorija = await Kategorija.findByPk(req.params.id);
        return res.json(kategorija);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.post("/", async (req, res) => {
    try{
        const novaKategorija = await Kategorija.create(req.body);
        return res.json(novaKategorija);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.put("/:id", async (req, res) => {
    try{
        const kategorija = await Kategorija.findByPk(req.params.id);
        kategorija.naziv = req.body.naziv;
        kategorija.opis = req.body.opis;
        kategorija.cena = req.body.cena;
        kategorija.kategorija_id = req.body.kategorija_id;
        await kategorija.save();
        return res.json(kategorija);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/:id", async (req, res) => {
    try{
        const kategorija = await Kategorija.findByPk(req.params.id);
        await kategorija.destroy();
        return res.json( kategorija.id );
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

module.exports = route;