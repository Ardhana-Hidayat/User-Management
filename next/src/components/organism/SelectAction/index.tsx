import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Delete from "../ModalDelete"; 

interface SelectActionProps {
    userId: number;
}

const SelectAction: React.FC<SelectActionProps> = ({ userId }) => {
    const router = useRouter();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleSelectChange = (value: string) => {
        switch (value) {
          case 'view':
            router.push(`/view/${userId}`);
            break;
          case 'edit':
            router.push(`/edit/${userId}`);
            break;
          case 'delete':
            setIsDeleteModalOpen(true);
            break;
          default:
            break;
        }
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    return (
        <div>
            <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="w-[50px] custom-select-trigger flex justify-center">
                   <MoreHorizontal className="specific-icon" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="view">View</SelectItem>
                    <SelectItem value="edit">Edit</SelectItem>
                    <SelectItem value="delete" className="text-red-500">Delete</SelectItem>
                </SelectContent>
            </Select>

            <Delete 
                isOpen={isDeleteModalOpen} 
                onClose={handleCloseDeleteModal} 
            />
        </div>
    )
};

export default SelectAction;
