'use client'

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema } from "@/lib/form-schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { editUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner"
import { format } from "date-fns";

interface EditUserFormProps {
    id: number,
    name: string,
    birth: string,
    job: string,
    email: string,
    address: string,
    status: string,
    avatar?: File | string,
}

const EditUserForm: React.FC<EditUserFormProps> = ({ id, name, birth, job, email, address, status, avatar }) => {
    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: name,
            birth: format(new Date(birth), 'yyyy-MM-dd'),
            job: job,
            email: email,
            address: address,
            status: status,
            avatar: avatar,
        },
    });

    const router = useRouter();

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

            const data = await editUser(formData, id);
            console.log('User updated successfully:', data);
            toast('User updated successfully!', {
                style: {
                    color: 'green',
                }
            });

            router.push('/users');
        } catch (error) {
            console.error('Error updating user:', error);
        }
        console.log(val);
    };

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-5 mt-5 mb-5'>
                    <div className="space-y-5">
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormControl>
                                        <Input className='w-[450px]' placeholder="Full name" {...field} />
                                    </FormControl>
                                )}
                            />
                            <FormMessage />
                            <p className="text-sm text-gray-600">Enter your complete name as it appears on official documents.</p>
                        </FormItem>

                        <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormField
                                control={form.control}
                                name="birth"
                                render={({ field }) => (
                                    <FormControl>
                                        <Input
                                            type="text"
                                            className="w-[450px]"
                                            placeholder="YYYY-MM-DD"
                                            {...field}
                                        />
                                    </FormControl>
                                )}
                            />
                            <FormMessage />
                            <p className="text-sm text-gray-600">Please provide your birth date in the format YYYY-MM-DD.</p>
                        </FormItem>

                        <FormItem>
                            <FormLabel>Job</FormLabel>
                            <FormField
                                control={form.control}
                                name="job"
                                render={({ field }) => (
                                    <FormControl>
                                        <Input
                                            type="text"
                                            className="w-[450px]"
                                            placeholder="example: Web Developer"
                                            {...field}
                                        />
                                    </FormControl>
                                )}
                            />
                            <FormMessage />
                            <p className="text-sm text-gray-600">Specify your current occupation or job title.</p>
                        </FormItem>

                        <FormItem>
                            <FormLabel>Avatar</FormLabel>
                            <FormField
                                control={form.control}
                                name="avatar"
                                render={({ field }) => (
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
                                )}
                            />
                            <FormMessage />
                            <p className="text-sm text-gray-600">Upload a profile picture for your user account.</p>
                        </FormItem>
                    </div>

                    <div className="space-y-5">
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormControl>
                                        <Input
                                            type="text"
                                            className="w-[450px]"
                                            placeholder="xxxxx@gmail.com"
                                            {...field}
                                        />
                                    </FormControl>
                                )}
                            />
                            <FormMessage />
                            <p className="text-sm text-gray-600">Enter your valid email address for communication.</p>
                        </FormItem>

                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormControl>
                                        <Input
                                            type="text"
                                            className="w-[450px]"
                                            placeholder="Jl. Kemangi No 40 ..."
                                            {...field}
                                        />
                                    </FormControl>
                                )}
                            />
                            <FormMessage />
                            <p className="text-sm text-gray-600">Provide your current residential address.</p>
                        </FormItem>

                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className='w-[450px]'>
                                                    <SelectValue placeholder="Status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="inactive">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                )}
                            />
                            <FormMessage />
                            <p className="text-sm text-gray-600">Select your current status (e.g., Active, Inactive).</p>
                        </FormItem>
                        <div className="flex justify-end">
                            <Button size={'lg'}>Save Changes</Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
};

export default EditUserForm;
