const express = require("express");
const { sequelize, Kafa, Kategorija, KafaDodatak, Dodatak, StavkaNarudzbine, Narudzbina } = require("../models");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));

route.get("/", async (reg, res) => {
    try{
        const kafe = await Kafa.findAll({ include: [{ model: Kategorija, as: 'kategorija' }] });
        return res.json(kafe)
    }
    catch (err){
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/:id", async (req, res) => {
    try{
        const kafa = await Kafa.findByPk(req.params.id, {
            include: [{ model: Kategorija, as: 'kategorija' }]
        });
        return res.json(kafa);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.post("/", async (req, res) => {
    try{
        const novaKafa = await Kafa.create(req.body);
        return res.json(novaKafa);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.put("/:id", async (req, res) => {
    try{
        const kafa = await Kafa.findByPk(req.params.id);
        kafa.naziv = req.body.naziv;
        kafa.opis = req.body.opis;
        kafa.cena = req.body.cena;
        kafa.kategorija_id = req.body.kategorija_id;
        await kafa.save();
        return res.json(kafa);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.delete("/:id", async (req, res) => {
    try{
        const kafa = await Kafa.findByPk(req.params.id);
        await kafa.destroy();
        return res.json( kafa.id );
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

module.exports = route;