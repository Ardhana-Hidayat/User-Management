import { z } from 'zod';

export const userSchema = z.object({
    name: z.string({required_error: 'Name is required'}),
    birth: z.string({required_error: 'Date of Birth is required'}),
    job: z.string({required_error: 'Job is required'}),
    email: z.string({required_error: 'Email is required'}),
    address: z.string({required_error: 'Address is required'}),
    status: z.string({required_error: 'Address is required'}).default('active'),
    avatar: z.any().optional(),
});
