
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

const ViewUser = async ({ params }: ViewUserProps) => {

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
            <div className='flex justify-between mb-10'>
                <div className="inline-flex items-center gap-5">
                    <Link href={'/users'}>
                        <ArrowLeftIcon className="bg-none text-gray-500" />
                    </Link>
                    <span className='text-xl font-semibold pt-1'>User Detail</span>
                </div>

                <div>
                    <Button className="flex justify-center gap-2 mx-auto" variant={'outline'}>
                        <div><PencilIcon className="w-5 h-5" /></div>
                        <div className="pt-1">Edit Profile</div>
                    </Button>
                </div>
            </div>
            <CardProfile
                name={user.name}
                email={user.email}
                job={user.job}
                birth={user.birth}
                address={user.address}
                status={user.status}
                avatar={user.avatar} />
        </div>
    );
};


export default ViewUser