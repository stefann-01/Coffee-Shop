const express = require("express");
const { sequelize, Kafa, Kategorija, KafaDodatak, Dodatak, StavkaNarudzbine, Narudzbina } = require("../models");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));

route.get("/", async (reg, res) => {
    try{
        const dodaci = await Dodatak.findAll();
        return res.json(dodaci)
    }
    catch (err){
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/:id", async (req, res) => {
    try{
        const dodatak = await Dodatak.findByPk(req.params.id);
        return res.json(dodatak);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.post("/", async (req, res) => {
    try{
        const noviDodatak = await Dodatak.create(req.body);
        return res.json(noviDodatak);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.put("/:id", async (req, res) => {
    try{
        const dodatak = await Dodatak.findByPk(req.params.id);
        dodatak.naziv = req.body.naziv;
        await dodatak.save();
        return res.json(dodatak);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/:id", async (req, res) => {
    try{
        const dodatak = await Dodatak.findByPk(req.params.id);
        await dodatak.destroy();
        return res.json( dodatak.id );
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

module.exports = route;