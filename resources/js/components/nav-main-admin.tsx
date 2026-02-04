import { Link, usePage } from '@inertiajs/react';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { BookOpen, Layers } from 'lucide-react';

export function NavMainAdmin() {
    const { url } = usePage();
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Menu Admin</SidebarGroupLabel>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        asChild
                        isActive={url === '/users'}
                        tooltip="Users"
                    >
                        <Link href="/users" prefetch>
                            <Layers />
                            <span>Users</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        asChild
                        isActive={url === '/articles'}
                        tooltip="Articles"
                    >
                        <Link href="/articles" prefetch>
                            <BookOpen />
                            <span>Articles</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
}
