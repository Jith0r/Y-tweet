import React from 'react'
import { BsHouseFill, BsBellFill } from 'react-icons/bs'
import useCurrentUser from '@/hooks/useCurrentUser'
import { signOut } from 'next-auth/react'
import { FaUser } from 'react-icons/fa'
import SidebarItem from './SidebarItem'
import SidebarLogo from './SidebarLogo'
import { BiLogOut } from 'react-icons/bi'
import SidebarTweetButton from './SidebarTweetButton'



const Sidebar = () => {

    // Pour savoir si le currentUser est log
    const { data: currentUser } = useCurrentUser();

    const items = [
        {
            label: 'Accueil',
            href: '/',
            icon: BsHouseFill
        },
        {
            label: 'Notifications',
            href: '/notifications',
            icon: BsBellFill,
            auth: true, // Si je ne suis pas connecter ça renvoi sur le loginModal
            alert: currentUser?.hasNotification,
        },
        {
            label: 'Profil',
            href: `/users/${currentUser?.id}`,
            icon: FaUser,
            auth: true // Si je ne suis pas connecter ça renvoi sur le loginModal
        }
    ]

    return (
        <div className='col-span-1 h-full pr-4 md:pr-6'>
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-[230px]">
                    <SidebarLogo />
                    {items.map((item) => (
                        <SidebarItem
                            key={item.href}
                            href={item.href}
                            label={item.label}
                            icon={item.icon}
                            auth={item.auth}
                            alert={item.alert}
                        />
                    ))}
                    {/* Si on a un currentUser on affiche le boutton Déconnexion */}
                    {
                        currentUser && (
                            <SidebarItem onClick={() => signOut()} icon={BiLogOut} label='Déconnexion' />
                        )
                    }
                    <SidebarTweetButton />
                </div>
            </div>
        </div>
    )
}

export default Sidebar