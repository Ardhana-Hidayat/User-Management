import { Button } from "@/components/ui/button";
import { TrashIcon, UserIcon } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ButtonDeleteAllProps {
    onUsersDeleted: () => void;
}

const ButtonDeleteAll: React.FC<ButtonDeleteAllProps> = ({ onUsersDeleted }) => {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="flex justify-center text-red-500">
                        <span><UserIcon /></span>
                        <span><TrashIcon className="h-5" /></span>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader className="mb-5">
                        <DialogTitle className="mb-5">Are you sure to delete all users?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete all data users
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="justify-end">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                No
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button
                                type="button"
                                className="bg-red-500"
                                onClick={() => {
                                    onUsersDeleted(); // Call the provided function
                                }}>
                                Yes
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ButtonDeleteAll;
