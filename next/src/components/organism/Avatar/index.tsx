import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import DefaultAvatar from "../DefaultAvatar";

interface UserAvatarProps {
    url: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ url }) => {

    return (
        <div>
            <Avatar className="w-[150px] h-[150px] mx-auto">
                <AvatarImage src={url} />
                <AvatarFallback>
                    <DefaultAvatar />
                </AvatarFallback>
            </Avatar>
        </div>
    )
};

export default UserAvatar