import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
app.use(bodyParser.urlencoded({extended: true}));
const port = 3000;
const apiKey = "46c3f221bf7a4fff94fd450771aba268";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric"
app.use(express.static("public"));

app.get("/", (req, res) =>{
    res.render("index.ejs");
});

app.post("/search", async (req, res) =>{
    var city = req.body.city;
    try{
        const result = await axios.get(apiUrl + `&q=${city}` + `&appid=${apiKey}`);
        var response = await result.data;
        console.log(response);
        res.render("index.ejs", {data : response});
    } catch(error){
        console.error('Error fetching data:', error);
    }
});


app.listen(port, ()=>{
    console.log(`Server running on port ${port}.`)
});