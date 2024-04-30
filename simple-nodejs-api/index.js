import express from "express";
import fs, { read } from "fs";
import { parse } from "path";
import bodyParser from "body-parser";


const app = express();
app.use(bodyParser.json());
const leerDatos = () => {
    try {
        const datos = fs.readFileSync("./db.json");
        return JSON.parse(datos);
    } catch (error) {
        console.log(error);
    }
}

const escribirDatos = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
}



app.get("/", (req, res) => {
    res.send("Testeando primer API xd");
})

app.get("/usuarios", (req, res) => {
    const datos = leerDatos();
    res.json(datos.usuarios);
    
})

app.get("/usuarios/:id", (req, res) => {
    const datos = leerDatos();
    const id = parseInt(req.params.id); // viene como string asi q lo cambiamos
    const usuarios = datos.usuarios.find((usuarios) => usuarios.id === id);
    res.json(usuarios);
})

app.post("/usuarios", (req, res) => {
    const datos = leerDatos();
    const body = req.body;
    const nuevoUsuario = {
        id: datos.usuarios.length + 1,
        ...body,
    }
    datos.usuarios.push(nuevoUsuario);
    escribirDatos(datos);
    res.json(nuevoUsuario);
})

app.put("/usuarios/:id", (req, res) => {
    const datos = leerDatos();
    const body = req.body;
    const id = parseInt(req.params.id);
    const usuariosIndex = datos.usuarios.findIndex((usuarios) => usuarios.id === id);   
    datos.usuarios[usuariosIndex] = {
        ...datos.usuarios[usuariosIndex],
        ...body,       
    }
    escribirDatos(datos);
    res.json({message: "Usuario actualizado"});
})

app.delete("/usuarios/:id", (req, res) => {
    const datos = leerDatos();
    const id = parseInt(req.params.id);
    const usuariosIndex = datos.usuarios.findIndex((usuarios) => usuarios.id === id); 
    datos.usuarios.splice(usuariosIndex, 1);
    escribirDatos(datos);
    res.json({message: "Usuario eliminado"});
})

app.listen(3000, () => console.log("Server listening on port 3000"));



