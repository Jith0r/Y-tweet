import useUser from '@/hooks/useUser';
import Image from 'next/image';
import React from 'react'
import Avatar from '../Avatar';


interface UserHeroProps {
    userId: string;
}

const UserHero: React.FC<UserHeroProps> = ({ userId }) => {

    const { data: fetchedUser } = useUser(userId);


    return (
        <div className='bg-[#333639] h-44 relative'>
            {/* BANNIERE COUVERTURE */}
            {fetchedUser?.coverImage && (
                <Image src={fetchedUser.coverImage} fill alt='Image de couverture' style={{ objectFit: 'cover' }} />
            )}

            {/* AVATAR */}
            <div className="absolute -bottom-16 left-4">
                <Avatar userId={userId} isLarge hasBorder />
            </div>
        </div>
    )
}

export default UserHero