const express = require('express');
const cors = require('cors');
const { sequelize, Kafa, Kategorija, KafaDodatak, Dodatak, StavkaNarudzbine, Narudzbina } = require("./models");
const dodatakRoutes = require("./routes/dodatak.js")
const kafaRoutes = require("./routes/kafa.js")
const kategorijaRoutes = require("./routes/kategorija.js")
const narudzbinaRoutes = require("./routes/narudzbina.js")
const stavkaNarudzbineRoutes = require("./routes/stavkaNarudzbine.js")
const kafaDodatakRoutes = require("./routes/kafaDodatak.js")

const app = express();

const corsOptions = {
    origin: ['http://localhost:8000', 'http://127.0.0.1:8000']
};

app.use(cors(corsOptions));
app.use("/dodatak", dodatakRoutes);
app.use("/kafa", kafaRoutes);
app.use("/kategorija", kategorijaRoutes);
app.use("/narudzbina", narudzbinaRoutes);
app.use("/stavkaNarudzbine", stavkaNarudzbineRoutes);
app.use("/kafaDodatak", kafaDodatakRoutes);
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get('/', (reg, res) => {
    res.send('Hello, from REST API service');
});

app.put("/promeni-cenu/:id", async (req, res) => {
    try{
        const kafa = await Kafa.findByPk(req.params.id);
        console.log(req.body.cena);
        kafa.cena = req.body.cena;
        await kafa.save();
        return res.json(kafa);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Greska", data: err });
    }
});

app.listen({ port: 9000 }, async () => {
    console.log("Started server on localhost:8000");
    await sequelize.sync({ force: true });
    console.log("DB synced");
});
