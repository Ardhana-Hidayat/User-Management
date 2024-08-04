
import EditUserForm from "@/components/forms/EditUserForm";
import CardProfile from "@/components/organism/CardProfile";
import { Button } from "@/components/ui/button";
import { UserInterface } from "@/interface";
import { getUserById } from "@/lib/api";
import { ArrowLeftIcon, PencilIcon } from "lucide-react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ViewUserProps {
    params: {
        id: number;
    };
}

const EditUser = async ({ params }: ViewUserProps) => {

    const userId = params.id;
    let user: UserInterface | null = null;

    try {
        user = await getUserById(userId);
    } catch (error) {
        console.error('Error fetching user data:', error);
        notFound();
    }

    if (!user) {
        notFound();
    }

    return (
        <div>
            <div className='inline-flex items-center gap-5'>
                <Link href={'/users'}>
                    <ArrowLeftIcon className="bg-none text-gray-500" />
                </Link>
                <span className='text-xl font-semibold pt-1'>Add a new user</span>
            </div>

            <div>
            <EditUserForm
                    id={userId}
                    name={user.name}
                    birth={user.birth}
                    job={user.job}
                    email={user.email}
                    address={user.address}
                    status={user.status}
                    avatar={user.avatar} />
            </div>
        </div>
    );
};


export default EditUser