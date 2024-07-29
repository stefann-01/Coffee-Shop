const express = require("express");
const { sequelize, Kafa, Kategorija, KafaDodatak, Dodatak, StavkaNarudzbine, Narudzbina } = require("../models");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));

route.get("/", async (reg, res) => {
    try{
        const stavka = await KafaDodatak.findAll();
        return res.json(stavka)
    }
    catch (err){
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.get("/:kafa_id/:dodatak_id", async (req, res) => {
    try {
        const stavka = await KafaDodatak.findOne({
            where: {
                kafa_id: req.params.kafa_id,
                dodatak_id: req.params.dodatak_id
            }
        });
        return res.json(stavka);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});


route.post("/", async (req, res) => {
    try{
        const novaStavka = await KafaDodatak.create(req.body);
        return res.json(novaStavka);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

route.put("/:kafa_id/:dodatak_id", async (req, res) => {
    try {
        const stavka = await KafaDodatak.findOne({
            where: {
                kafa_id: req.params.kafa_id,
                dodatak_id: req.params.dodatak_id
            }
        });

        await stavka.save();
        return res.json(stavka);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});


route.delete("/:kafa_id/:dodatak_id", async (req, res) => {
    try {
        const stavka = await KafaDodatak.findOne({
            where: {
                kafa_id: req.params.kafa_id,
                dodatak_id: req.params.dodatak_id
            }
        });

        await stavka.destroy();
        return res.json({ message: "Stavka deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});


module.exports = route;