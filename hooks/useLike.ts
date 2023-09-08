import usePosts from '@/hooks/usePosts';
import usePost from '@/hooks/usePost';
import useCurrentUser from '@/hooks/useCurrentUser';
import useLoginModal from './useLoginModal';
import { useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const useLike = ({ postId, userId }: { postId: string, userId?: string }) => {

    const { data: currentUser } = useCurrentUser();
    const { data: fecthedPost, mutate: mutateFetchedPost } = usePost(postId);
    const { mutate: mutateFetchedPosts } = usePosts(userId);

    const loginModal = useLoginModal();

    const hasLiked = useMemo(() => {

        const list = fecthedPost?.likedIds || [];

        return list.includes(currentUser?.id);

    }, [currentUser?.id, fecthedPost?.likedIds]);


    const toggleLike = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {

            let request;

            if (hasLiked) {
                request = () => axios.delete('/api/like', { params: { postId } })
            } else {
                request = () => axios.post('/api/like', { postId });
            }

            await request();
            mutateFetchedPost();
            mutateFetchedPosts();

            toast.success('Succès')

        } catch (error) {
            toast.error('Un problème est survenue')
        }

    }, [currentUser, hasLiked, postId, mutateFetchedPost, mutateFetchedPosts, loginModal]);

    return {

        hasLiked,
        toggleLike

    }

}

export default useLike;