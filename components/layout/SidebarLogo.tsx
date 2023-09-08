import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlineTwitter } from 'react-icons/ai';

const SidebarLogo = () => {

    const router = useRouter();

    return (
        <div
            onClick={() => router.push('/')}
            className='
            rounded-full
            mt-3
            h-14
            w-14
            p-4
            flex
            items-center
            justify-center
            hover:bg-slate-300
            hover:bg-opacity-10
            cursor-pointer
            transition
        '>
            <AiOutlineTwitter size={28} color='white' />
        </div>
    )
}

export default SidebarLogo