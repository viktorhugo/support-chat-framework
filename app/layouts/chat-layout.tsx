import {  LogOut, X } from 'lucide-react';
import {  Outlet, useNavigate } from 'react-router';
import { ContactList } from '~/chat/components/ContactList';
import { ContactInfoHandler } from '~/chat/components/contact-info/ContactInfoHandler';
import { Button } from '~/components/ui/button';
import { getClient, getClients } from '~/fake/fake-data';
import type { Route } from './+types/chat-layout';

// Executed when the route is loaded, (RouteModule)
export const loader = async () => {
    console.log('Chat Layout loader called');
    
    const clients = await getClients();
    return clients;
}

const ChatLayout = ( { loaderData }: Route.ComponentProps ) => {
    console.log(loaderData); // Clients

    const navigate = useNavigate();
    const logout = () => {
        // remove token
        localStorage.removeItem('token');
        // invalidate the query and refetch
        navigate( "/auth", { replace: true})
    };
    
    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <div className="w-64 border-r bg-muted/10">
            <div className="p-4 border-b">
                <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-primary" />
                <span className="font-semibold">NexTalk</span>
                </div>
            </div>
            <ContactList clients={ loaderData } />
            <div className="p-4 border-t">
                <Button variant={"default"} onClick={() => logout()} className="text-center w-full cursor-pointer" size={'sm'}>
                    <LogOut className="h-4 w-4" />
                    Logout
                </Button>
            </div>
            </div>

    
            {/* Main Content */}
            <div className="flex-1 flex">
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="h-14 border-b px-4 flex items-center justify-between">
                <div></div> {/* Empty div to maintain spacing */}
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                    Save conversation
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <X className="h-4 w-4" />
                    </Button>
                </div>
                </header>

                <Outlet />
            </div>
    
            {/* Right Panel - Contact Details */}
            <div className="w-80 border-l">
                <div className="h-14 border-b px-4 flex items-center">
                    <h2 className="font-medium">Contact details</h2>
                </div>
                <ContactInfoHandler />
            </div>
            </div>
        </div>
    )
}

export default ChatLayout;
