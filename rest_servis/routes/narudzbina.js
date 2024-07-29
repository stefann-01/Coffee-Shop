const express = require("express");
const { sequelize, Kafa, Kategorija, KafaDodatak, Dodatak, StavkaNarudzbine, Narudzbina } = require("../models");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));

route.get("/", async (reg, res) => {
    try{
        const narudzbina = await Narudzbina.findAll();
        return res.json(narudzbina)
    }
    catch (err){
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/:id", async (req, res) => {
    try{
        const narudzbina = await Narudzbina.findByPk(req.params.id);
        return res.json(narudzbina);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.post("/", async (req, res) => {
    try{
        const novaNarudzbina = await Narudzbina.create(req.body);
        return res.json(novaNarudzbina);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.put("/:id", async (req, res) => {
    try{
        const narudzbina = await Narudzbina.findByPk(req.params.id);
        narudzbina.vreme_narucivanja = req.body.vreme_narucivanja;
        narudzbina.zakazano_vreme = req.body.zakazano_vreme;
        narudzbina.status = req.body.status;
        narudzbina.adresa = req.body.adresa;
        narudzbina.telefon = req.body.telefon;
        narudzbina.ime_prezime = req.body.ime_prezime;
        await narudzbina.save();
        return res.json(narudzbina);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/:id", async (req, res) => {
    try{
        const narudzbina = await Narudzbina.findByPk(req.params.id);
        await narudzbina.destroy();
        return res.json( narudzbina.id );
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

module.exports = route;