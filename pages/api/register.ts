import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt'
import prisma from '../../libs/prismadb'

// ENDPOINT pour inscription

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    //Limiter la requête en POST
    if (req.method !== 'POST') {
        return res.status(405).end()
    }

    try {

        //GRABB les information passer par la requête
        const { email, username, name, password } = req.body

        // Hash le mot de passe 
        const hashedPassword = await bcrypt.hash(password, 12); // password qui est dans la req.body

        //On crée l'utilisateur
        const user = await prisma.user.create({
            data: {
                email,
                username,
                name,
                hashedPassword // On passe le mot de passe crypter plus haut
            }
        });

        return res.status(200).json(user);
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }

}