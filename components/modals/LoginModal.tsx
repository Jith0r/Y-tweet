import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal';
import React, { useCallback, useState } from 'react'
import Input from '../Input';
import Modal from '../Modal';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast'

const LoginModal = () => {

    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    //Fonction pour passer du loginForm au registerForm
    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }

        loginModal.onClose(); // On ferme le loginModal
        registerModal.onOpen(); // On ouvre le registerModal

    }, [isLoading, registerModal, loginModal])


    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            // Connexion
            await signIn('credentials', {
                email,
                password,
            });

            //Notification une fois la connexion établie
            toast.success('Succès')


            //On ferme le modal
            loginModal.onClose();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }, [loginModal, email, password])

    // Contenu du loginModal
    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input placeholder='Votre email' value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
            <Input placeholder='Votre mot de passe' type='password' value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
        </div>
    )

    // Footer du modal
    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>Pas encore de compte ? <span onClick={onToggle} className='text-white cursor-pointer hover:underline'> Inscription</span></p>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Connexion"
            actionLabel='Se connecter'
            onClose={loginModal.onClose}
            onSubmit={onSubmit} // Fonction crée plus haut
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModal