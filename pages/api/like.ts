import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../libs/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {

        const postId = req.method === 'POST' ? req.body.postId : req.query.postId;

        const { currentUser } = await serverAuth(req, res);



        if (!postId || typeof postId !== 'string') {
            throw new Error('ID invalide');
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        });

        if (!post) {
            throw new Error('ID invalide');
        }

        let updatedLikedIds = [...(post.likedIds || [])];

        if (req.method === 'POST') {
            updatedLikedIds.push(currentUser.id);

            try {
                const post = await prisma.post.findUnique({
                    where: {
                        id: postId
                    }
                });

                if (post?.userId) {
                    await prisma.notification.create({
                        data: {
                            body: 'Un utilisateur a like votre tweet !',
                            userId: post.userId
                        }
                    });

                    await prisma.user.update({
                        where: {
                            id: post.userId
                        },
                        data: {
                            hasNotification: true
                        }
                    })
                }

            } catch (error) {
                console.log(error);
            }
        }

        if (req.method === 'DELETE') {
            updatedLikedIds = updatedLikedIds.filter((likedId) => likedId !== currentUser.id)
        }

        const updatedPost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                likedIds: updatedLikedIds
            }
        });

        return res.status(200).json(updatedPost)

    } catch (error) {
        console.log(error);
        res.status(400).end();

    }


}