'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import { AiOutlineHome, AiOutlineMessage, AiOutlineBuild, AiOutlineUsergroupAdd, AiOutlineUnorderedList, AiOutlineSchedule, AiOutlineSetting, AiOutlineLogout } from "react-icons/ai";
import { useRouter } from 'next/navigation';

interface SidebarProps {

}

const Sidebar: React.FC<SidebarProps> = ({ }) => {

    const router = useRouter();

    return (
        <div className='pb-12 min-h-screen'>
            <div className='space-y-4 py-4'>
                <div className='px-2 py-2'>
                    <h2 className='mb-2 px-4 text-lg font-semibold'>
                        Dashboard
                    </h2>
                    <div className='space-y-1'>
                        <Button
                            variant={'ghost'}
                            className='w-full justify-start rounded-none hover:text-primary'
                            onClick={() => { router.push('/') }}>

                            <AiOutlineHome className='mr-2 mb-1 text-lg' />
                            Home
                        </Button>
                        <Button
                            variant={'ghost'}
                            className='w-full justify-start rounded-none hover:text-primary'
                            onClick={() => (router.push('/users'))}>
                                
                            <AiOutlineUsergroupAdd className='mr-2 mb-1 text-xl' />
                            All Users
                        </Button>
                    </div>
                </div>
            </div>
            <div className='space-y-4 py-4'>
                <div className='px-2 py-2'>
                    <h2 className='mb-2 px-4 text-lg font-semibold'>
                        Setting
                    </h2>
                    <div className='space-y-1'>
                        <Button
                            variant={'ghost'}
                            className='w-full justify-start rounded-none hover:text-primary'
                            onClick={() => { router.push('/settings') }}>

                            <AiOutlineSetting className='mr-2 mb-1 text-xl' />
                            Setting
                        </Button>
                        <Button variant={'ghost'} className='w-full text-red-500 hover:bg-red-100 hover:text-red-500 justify-start rounded-none'>
                            <AiOutlineLogout className='mr-2 mb-1 text-xl' />
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;