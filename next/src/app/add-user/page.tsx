'use client'

import AddUserForm from "@/components/forms/AddUserForm";
import { ArrowLeftIcon, CalendarIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AddUsersProps {

}

const AddUsers: React.FC<AddUsersProps> = () => {
    const router = useRouter();

    return (
        <div>
            <div className='inline-flex items-center gap-5'>
                <Link href={'/users'}>
                    <ArrowLeftIcon className="bg-none text-gray-500" />
                </Link>
                <span className='text-xl font-semibold pt-1'>Add a new user</span>
            </div>

            <div>
                <AddUserForm />
            </div>
        </div>
    )
};

export default AddUsers