import { Button } from "@/components/ui/button";
import { PlusIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface ButtonAddProps {

}

const ButtonAdd: React.FC<ButtonAddProps> = () => {
    const router = useRouter();

    return (
        <div>
            <Button
                className="flex justify-center text-blue-500"
                size={'default'}
                variant={'outline'}
                onClick={() => (router.push('/add-user'))}>
                <span><UserIcon /></span>
                <span><PlusIcon /></span>
            </Button>
        </div>
    )
};

export default ButtonAdd