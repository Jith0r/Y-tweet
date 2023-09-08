import useCurrentUser from '@/hooks/useCurrentUser';
import useEditModal from '@/hooks/useEditModal';
import useFollow from '../../hooks/useFollow'
import useUser from '@/hooks/useUser';
import { format } from 'date-fns'
import React, { useMemo } from 'react'
import { BiCalendar } from 'react-icons/bi';
import Button from '../Button';

interface UserBioProps {
    userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
    const { data: currentUser } = useCurrentUser();
    const { data: fetchedUser } = useUser(userId);

    const editModal = useEditModal(); // Pour éditer le profil

    const { isFollowing, toggleFollow } = useFollow(userId);

    // Date de création du compte
    const createdAt = useMemo(() => {
        if (!fetchedUser?.createdAt) {
            return null;
        }

        return format(new Date(fetchedUser.createdAt), 'MMM yyyy');

    }, [fetchedUser?.createdAt])



    return (
        <div className='border-b-[1px] border-neutral-800 pb-4'>

            <div className="flex justify-end p-2">
                {/* Si c'est le profil de l'utilisateur connecter, il y a éditer le profil sinon Follow le compte*/}
                {currentUser?.id === userId ? (
                    <Button secondary label='Editer le profil' onClick={editModal.onOpen} />
                ) : (
                    <Button onClick={toggleFollow} label={isFollowing ? 'Ne plus suivre' : 'Suivre'} secondary={!isFollowing} outline={isFollowing} />
                )}
            </div>

            <div className="mt-8 px-4">
                <div className="flex flex-col">
                    <p className='text-white text-2xl font-semibold'>
                        {fetchedUser?.name} {/* Afficher le nom du compte */}
                    </p>
                    <p className="text-md text-neutral-500">
                        @{fetchedUser?.username} {/* Afficher l'username du compte */}
                    </p>
                </div>

                <div className="flex flex-col mt-4">
                    <p className='text-white'>
                        {fetchedUser?.bio} {/* Afficher le bio du compte */}
                    </p>
                    <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
                        <BiCalendar size={24} /> {/* Calendrier */}
                        <p>Inscrit en {createdAt}</p>
                    </div>
                </div>

                <div className="flex flex-row items-center mt-4 gap-6">
                    <div className="flex flex-row items-center gap-5">
                        <p className='text-white'>
                            {fetchedUser?.followingIds?.length} {/* Nombre de personne suivi */}
                        </p>
                        <p className="text-neutral-500">
                            Suivi(e)s
                        </p>
                    </div>

                    <div className="flex flex-row items-center gap-5">
                        <p className='text-white'>
                            {fetchedUser?.followersCount || 0} {/* Nombre de follower */}
                        </p>
                        <p className="text-neutral-500">
                            Followers
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UserBio