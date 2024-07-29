const express = require("express");
const { sequelize, Kafa, Kategorija, KafaDodatak, Dodatak, StavkaNarudzbine, Narudzbina } = require("../models");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));

route.get("/", async (reg, res) => {
    try{
        const stavka = await StavkaNarudzbine.findAll({ include: [{ model: Kafa, as: 'stavkaKafa' }] });
        return res.json(stavka)
    }
    catch (err){
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/:id", async (req, res) => {
    try{
        const stavka = await StavkaNarudzbine.findByPk(req.params.id);
        return res.json(stavka);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.post("/", async (req, res) => {
    try{
        const novaStavka = await StavkaNarudzbine.create(req.body);
        return res.json(novaStavka);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.put("/:id", async (req, res) => {
    try{
        const stavka = await StavkaNarudzbine.findByPk(req.params.id);
        stavka.komada = req.body.komada;
        stavka.jedinicna_cena = req.body.jedinicna_cena;
        await stavka.save();
        return res.json(stavka);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/:id", async (req, res) => {
    try{
        const stavka = await StavkaNarudzbine.findByPk(req.params.id);
        await stavka.destroy();
        return res.json( stavka.id );
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

module.exports = route;