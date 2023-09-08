import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../libs/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    try {

        const userId = req.method === 'POST' ? req.body.userId : req.query.userId;

        const { currentUser } = await serverAuth(req, res);

        if (!userId || typeof userId !== 'string') {
            throw new Error('ID invalide')
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw new Error('ID invalide');
        }

        let updatedFollowingIds = [...(user.followingIds || [])];

        if (req.method === 'POST') {
            updatedFollowingIds.push(userId);

            try {
                await prisma.notification.create({
                    data: {
                        body: 'Vous avez un nouveau follower !',
                        userId
                    }
                });

                await prisma.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                        hasNotification: true
                    }
                })

            } catch (error) {
                console.log(error);
            }

        }



        if (req.method === 'DELETE') {
            updatedFollowingIds = updatedFollowingIds.filter((followingId) => followingId !== userId);
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                followingIds: updatedFollowingIds
            }
        });

        return res.status(200).json(updatedUser);

    } catch (error) {
        console.log(error)
        res.status(400).end();
    }


}