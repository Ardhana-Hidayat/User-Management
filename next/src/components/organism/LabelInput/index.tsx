import { Separator } from '@/components/ui/separator'
import React, { ReactNode } from 'react'

interface LabelInputProps {
    children: ReactNode,
    title: string,
    subtitle: string
}

const LabelInput: React.FC<LabelInputProps> = ({ children, title, subtitle }) => {
    return (
        <>
            <div className='flex flex-row items-start'>
                <div className='w-[35%]'>
                    <div className='font-semibold'>{title}</div>
                    <div className='text-gray-400 w-80'>{subtitle}</div>
                </div>
                {children}
            </div>
        </>
    )
}

export default LabelInput
