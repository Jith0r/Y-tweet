import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal';
import { signIn } from 'next-auth/react'
import React, { useCallback, useState } from 'react'
import axios from 'axios'
import Input from '../Input';
import Modal from '../Modal';
import { toast } from 'react-hot-toast'

const RegisterModal = () => {

    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    //Fonction pour passer du registerForm au loginForm
    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }

        registerModal.onClose(); // On ferme le registerModal
        loginModal.onOpen(); // On ouvre le loginModal

    }, [isLoading, registerModal, loginModal])

    //Fonction une fois submit
    const onSubmit = useCallback(async () => {


        try {
            setIsLoading(true);

            //Inscription (register.ts)
            await axios.post('/api/register', {
                email,
                password,
                username,
                name
            });

            //Notification
            toast.success('Succès')

            //Connexion une fois réussie
            signIn('credentials', {
                email,
                password
            });

            //On ferme le modal
            registerModal.onClose();
        } catch (error) {
            toast.error('Un problème est survenue')
        } finally {
            setIsLoading(false)
        }
    }, [registerModal, email, password, username, name])

    // Contenu du registerModal
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input placeholder='Votre email' value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
            <Input placeholder='Votre nom' value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} />
            <Input placeholder='Votre username' value={username} onChange={(e) => setUsername(e.target.value)} disabled={isLoading} />
            <Input placeholder='Votre mot de passe' type='password' value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
        </div>
    )

    // Footer du modal
    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>Vous avez déjà un compte ? <span onClick={onToggle} className='text-white cursor-pointer hover:underline'> Connexion</span></p>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Inscription"
            actionLabel="M'inscrire"
            onClose={registerModal.onClose}
            onSubmit={onSubmit} // Fonction crée plus haut
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal