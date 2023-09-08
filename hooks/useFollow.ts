import { toast } from 'react-hot-toast';
import axios from 'axios'
import { useMemo, useCallback } from 'react';
import useLoginModal from './useLoginModal';
import useUser from './useUser';
import useCurrentUser from './useCurrentUser';



const useFollow = (userId: string) => {
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(userId);

    const loginModal = useLoginModal();

    const isFollowing = useMemo(() => {
        const list = currentUser?.followingIds || [];

        return list.includes(userId);
    }, [currentUser, userId]);

    const toggleFollow = useCallback(async () => {

        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;

            if (isFollowing) {
                request = () => axios.delete('/api/follow', { params: { userId } });
            } else {
                request = () => axios.post('/api/follow', { userId });
            }


            await request();
            mutateCurrentUser();
            mutateFetchedUser();

            toast.success('Opération réussie !');
        } catch (error) {
            console.log(error)
            toast.error('Un problème est survenue..');
        }
    }, [currentUser, isFollowing, userId, mutateCurrentUser, mutateFetchedUser, loginModal]);

    return {
        isFollowing,
        toggleFollow,
    }

}

export default useFollow;