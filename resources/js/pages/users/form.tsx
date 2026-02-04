import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { router } from '@inertiajs/react';
import type { User } from '@/types';

// Simplified Form setup since we don't have zod resolver installed in package.json
// If you want zod, we can install it. For now, manual validation or server validation is fine.
// Actually, let's just rely on HTML validation + Server errors for simplicity in this demo,
// or use basic react-hook-form validation.

type UserFormData = {
    name: string;
    email: string;
    password?: string;
    role: string;
};

type UserFormProps = {
    user?: User;
    isEdit?: boolean;
};

export default function UserForm({ user, isEdit = false }: UserFormProps) {
    const queryClient = useQueryClient();
    
    // We need to construct the default values. 
    // If it's edit mode, we might not have the password.
    const form = useForm<UserFormData>({
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
            password: '',
            role: user?.role || 'user',
        },
    });

    const mutation = useMutation({
        mutationFn: async (data: UserFormData) => {
            if (isEdit && user) {
                // For update, we might filter out empty password
                const payload = { ...data };
                if (!payload.password) delete payload.password;
                
                return axios.put(`/api/users/${user.id}`, payload);
            } else {
                return axios.post('/api/users', data);
            }
        },
        onSuccess: () => {
            toast.success(isEdit ? 'User updated successfully' : 'User created successfully');
            queryClient.invalidateQueries({ queryKey: ['users'] });
            router.visit('/users');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Something went wrong';
            toast.error(message);
            
            // Handle validation errors from Laravel
            if (error.response?.data?.errors) {
                const errors = error.response.data.errors;
                Object.keys(errors).forEach((key) => {
                    form.setError(key as any, {
                        type: 'server',
                        message: errors[key][0],
                    });
                });
            }
        },
    });

    const onSubmit = (data: UserFormData) => {
        mutation.mutate(data);
    };

    return (
        <div className="grid gap-6">
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <label htmlFor="name" className="text-sm font-medium">Name</label>
                        <Input
                            id="name"
                            placeholder="John Doe"
                            {...form.register('name', { required: 'Name is required' })}
                        />
                        {form.formState.errors.name && (
                            <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            {...form.register('email', { 
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                        {form.formState.errors.email && (
                            <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="role" className="text-sm font-medium">Role</label>
                        <select 
                            id="role"
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            {...form.register('role')}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="password" className="text-sm font-medium">
                            {isEdit ? 'Password (Leave blank to keep current)' : 'Password'}
                        </label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="********"
                            {...form.register('password', { 
                                required: isEdit ? false : 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters"
                                }
                            })}
                        />
                        {form.formState.errors.password && (
                            <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
                        )}
                    </div>

                    <Button type="submit" disabled={mutation.isPending}>
                        {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isEdit ? 'Update User' : 'Create User'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
