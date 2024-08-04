import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { postUser } from "@/lib/api";
import { userSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UploadAvatarProps {

}

const UploadAvatar: React.FC<UploadAvatarProps> = () => {
    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            avatar: undefined,
        },
    });

    const onSubmit = async (val: z.infer<typeof userSchema>) => {
        try {
            const formData = new FormData();
            Object.keys(val).forEach((key) => {
                const value = val[key as keyof typeof val];
                if (value instanceof File) {
                    formData.append(key, value);
                } else {
                    formData.append(key, value as string);
                }
            });

            const data = await postUser(formData);
            console.log('User added successfully:', data);

        } catch (error) {
            console.error('Error adding user:', error);
        }
        console.log(val);
    };

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} >
                    <FormField
                        control={form.control}
                        name="avatar"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        id="avatar"
                                        type="file"
                                        className="w-[450px]"
                                        onChange={(e) => {
                                            const file = e.target.files ? e.target.files[0] : null;
                                            field.onChange(file);
                                        }} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    )
};

export default UploadAvatar