'use client'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface HeaderProps {
    
}

const Header: React.FC<HeaderProps> = () => {

    const router = useRouter();
    const navigateJobPage = () => router.push('/post-a-job');

  return (
    <div className='pb-3 mb-8 border-b border-border flex flex-row justify-between item-center'>
      <div>
        <div className='font-semibold'>User Management</div>
      </div>
    </div>
  )
}

export default Header
