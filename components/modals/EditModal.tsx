import useCurrentUser from '@/hooks/useCurrentUser'
import useEditModal from '@/hooks/useEditModal';
import useUser from '@/hooks/useUser';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import ImageUpload from '../ImageUpload';
import Input from '../Input';
import Modal from '../Modal';

const EditModal = () => {

    const { data: currentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
    const editModal = useEditModal();

    const [profileImage, setProfileImage] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        // Init les champs éxistant
        setProfileImage(currentUser?.profileImage);
        setCoverImage(currentUser?.coverImage);
        setName(currentUser?.name);
        setUsername(currentUser?.username);
        setBio(currentUser?.bio);
    }, [
        currentUser?.profileImage,
        currentUser?.username,
        currentUser?.bio,
        currentUser?.name,
        currentUser?.coverImage
    ]);

    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            await axios.patch('/api/edit', {
                name,
                username,
                bio,
                profileImage,
                coverImage
            });

            mutateFetchedUser();

            toast.success('Profil mis à jour !')

            editModal.onClose();

        } catch (error) {
            toast.error('Une erreur est survenue')
        } finally {
            setIsLoading(false);
        }
    }, [bio, name, username, profileImage, coverImage, editModal, mutateFetchedUser])


    //BODY du modal
    const bodyContent = (
        <div className="flex flex-col gap-4">

            <ImageUpload
                value={profileImage}
                disabled={isLoading}
                onChange={(image) => setProfileImage(image)}
                label="Ajouter une image de profil"
            />


            <ImageUpload
                value={coverImage}
                disabled={isLoading}
                onChange={(image) => setCoverImage(image)}
                label="Ajouter une image de couverture"
            />

            <Input
                placeholder='Votre nom'
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />

            <Input
                placeholder='Votre username'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}
            />

            <Input
                placeholder='Votre bio'
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                disabled={isLoading}
            />
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={editModal.isOpen}
            title={'Editer votre profil'}
            actionLabel="Enregistrer"
            onClose={editModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    )
}

export default EditModal