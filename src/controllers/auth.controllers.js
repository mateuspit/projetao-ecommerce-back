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

export async function signIn(req, res){
    const {email, password} = req.body;
    //middlewares usando schemas em routes filtra a entrada
    try{
        const dataUser = await db.collection("users").findOne({email});
        if (!dataUser) return res.status(404).send("Email não cadastrado!")

        const passwordCorrect = bcrypt.compareSync(password, dataUser.password);
        if(!passwordCorrect) return res.status(401).send("Senha incorreta, tente novamente!");

        const token = uuid();
        //com o upsert caso não exista a sessão com esse usuario, ela será criada com userID e token
        //caso exista acontecerá o update apenas do token
        //assim evitamos criar muitas sessions por cada login
        await db.collection("sessions").updateOne(
            { userID: dataUser._id },
            { $set: { token } },
            { upsert: true }
        );

        return res.status(200).send({token, name: dataUser.name});
    }
    catch (error){
        return res.status(500).send(error.message);
    }
}

export async function logout(req,res){
    //middlewares em routes filtra a entrada já conferindo o token 
    //e devolvendo sem Bearer utilizando res.locals.sessionn
    const userSession = res.locals.session;
    try{
        await db.collection("sessions").deleteOne({token: userSession.token});
        return res.sendStatus(200)
    }
    catch (error){
        return res.status(500).send(error.message);
    }
}