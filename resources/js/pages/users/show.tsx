import { Head, Link, usePage } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
    ArrowLeft,
    Mail,
    Pencil,
    Shield,
    User as UserIcon,
} from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import type { BreadcrumbItem, User } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
    {
        title: 'User Details',
        href: '#',
    },
];

export default function UsersShow() {
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
            <Head title={`User ${user?.name || userId}`} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" asChild>
                            <Link href="/users">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <h1 className="text-2xl font-bold tracking-tight">
                            User Details
                        </h1>
                    </div>
                    {user && (
                        <Button asChild>
                            <Link href={`/users/${user.id}/edit`}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit User
                            </Link>
                        </Button>
                    )}
                </div>

                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {isLoading ? (
                            <div className="space-y-4">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                                <Skeleton className="h-4 w-[150px]" />
                            </div>
                        ) : isError || !user ? (
                            <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
                                <p>Failed to load user data.</p>
                                <p className="text-sm">
                                    The user might not exist or there was an
                                    error.
                                </p>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <UserIcon className="h-4 w-4" />
                                        <span className="text-sm font-medium">
                                            Full Name
                                        </span>
                                    </div>
                                    <div className="font-medium">
                                        {user.name}
                                    </div>
                                </div>
                                <Separator />
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Mail className="h-4 w-4" />
                                        <span className="text-sm font-medium">
                                            Email Address
                                        </span>
                                    </div>
                                    <div className="font-medium">
                                        {user.email}
                                    </div>
                                </div>
                                <Separator />
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Shield className="h-4 w-4" />
                                        <span className="text-sm font-medium">
                                            Role
                                        </span>
                                    </div>
                                    <div className="font-medium capitalize">
                                        {user.role || 'User'}
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
