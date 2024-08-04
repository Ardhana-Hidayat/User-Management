import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import UserAvatar from "../Avatar";
import { format } from "date-fns";
import UploadAvatar from "@/components/forms/UploadAvatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface CardProfileProps {
    name: string;
    email: string;
    birth: string;
    job: string;
    address: string;
    status: string;
    avatar?: File | string;
};

const CardProfile: React.FC<CardProfileProps> = ({ name, email, job, birth, status, avatar, address }) => {

    const DETAIL_DATA = [
        { label: 'Job', value: job },
        { label: 'Birth', value: format(new Date(birth), 'd MMM yyyy') },
        { label: 'Address', value: address },
    ];

    return (
        <div className="flex flex-row gap-20">
            <Card className="w-[25%] items-center text-center">
                <CardHeader>
                    <div className="mb-5 mt-5">
                        <Popover>
                            <PopoverTrigger>
                                <UserAvatar url={`http://localhost:5000${avatar}`} />
                            </PopoverTrigger>

                            <PopoverContent>
                                <div className="flex justify-center gap-2 mx-auto">
                                    <div><PencilIcon className="w-5 h-5" /></div>
                                    <div className="pt-1">Edit Photo</div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </CardHeader>

                <CardContent>
                    <p className="font-semibold text-lg">{name}</p>
                    <p className="text-sm">{email}</p>
                </CardContent>
            </Card>

            <div className="w-[450px]">
                {DETAIL_DATA.map((item: any, i: number) => (
                    <div key={item + i} className="mb-5">
                        <div>
                            <div className="text-lg font-semibold">
                                {item.label}
                            </div>
                            <div className="text-md">
                                {item.value}
                            </div>
                        </div>
                    </div>
                ))}
                <div>
                    <div className="text-lg font-semibold">
                        Status
                    </div>
                    <div className="text-md">
                        <Badge className={`${status === 'active' ? 'bg-blue-100 text-blue-500 hover:bg-blue-200' : 'bg-red-100 text-red-500 hover:bg-red-200'} w-auto p-2 pl-5 pr-5 mt-2 text-center`}>
                            <p>
                                {status}
                            </p>
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CardProfile