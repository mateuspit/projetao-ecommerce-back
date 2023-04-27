import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";

export async function signUp(req,res){
    const {name, email, password} = req.body;

    //middlewares usando schemas em routes filtra a entrada

    try{
        const emailExists = await db.collection("users").findOne({email});
        if(emailExists) return res.status(409).send("Email já cadastrado, faça login!")

        const cryptedPassword = bcrypt.hashSync(password, 10);

        await db.collection("users").insertOne({name, email, password: cryptedPassword});

        res.status(201).send("Conta criada com sucesso!");
    }
    catch (error){
        res.status(500).send(error.message);
    }
}