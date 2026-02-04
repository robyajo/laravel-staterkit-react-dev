import { Head, Link, usePage } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { BreadcrumbItem, User } from '@/types';
import UserForm from './form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
    {
        title: 'Edit User',
        href: '#',
    },
];

export default function UsersEdit() {
    const { user: userId } = usePage<{ user: string }>().props;

    const {
        data: userResponse,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['users', userId],
        queryFn: () =>
            axios
                .get<{ data: User }>(`/api/users/${userId}`)
                .then((res) => res.data),
        enabled: !!userId,
    });

    const user = userResponse?.data;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit User ${user?.name || userId}`} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/users">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Edit User
                    </h1>
                </div>

                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Edit User Details</CardTitle>
                        <CardDescription>
                            Update the user information below.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="space-y-4">
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        ) : isError || !user ? (
                            <div className="text-center text-muted-foreground">
                                Failed to load user data.
                            </div>
                        ) : (
                            <UserForm user={user} isEdit />
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
