import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"  


interface DeleteProps {
    isOpen: boolean;
    onClose: () => void;
}

const Delete: React.FC<DeleteProps> = ({isOpen, onClose}) => {

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogTrigger asChild>
                <button className="hidden">Delete</button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4 flex justify-end space-x-2">
                    <Button onClick={onClose} variant="secondary">Cancel</Button>
                    <Button onClick={() => { console.log('Confirmed delete'); onClose(); }} className="bg-red-500">Delete</Button>
                </div>
            </DialogContent>
        </Dialog>
        </div>
    )
};

export default Delete