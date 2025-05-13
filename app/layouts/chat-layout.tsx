import {  LogOut, X } from 'lucide-react';
import {  Form, Link, Outlet, redirect, useNavigate } from 'react-router';
import { ContactList } from '~/chat/components/ContactList';
import { ContactInfoHandler } from '~/chat/components/contact-info/ContactInfoHandler';
import { Button } from '~/components/ui/button';
import { checkAuth, getClient, getClients } from '~/fake/fake-data';
import type { Route } from './+types/chat-layout';
import { getSession } from '~/sessions.server';

// Executed when the route is loaded, (RouteModule)
export const loader = async ({ request, context, params }: Route.LoaderArgs) => {

    const { id } = params;

    console.log('Chat Layout loader called');
    // get session
    const session = await getSession(request.headers.get('Cookie'));
    console.log('LoginLoader -userId exists in session?', session.has('userId'));
    const token = session.get('token');
    const userName= session.get('name');
    if (!session.has('userId')) {
        console.log('No found userId');
        return redirect('/auth/login');
    }

    if (!token) {
        console.log('No found token');
        return redirect('/auth/login');
    }
    if (!userName) {
        console.log('No found userName');
        return redirect('/auth/login');
    }
    console.log('Session name', userName);
    console.log('Session token', token);
    console.log('Session userId', session.get('userId'));

    // check auth 
    const user = await checkAuth(token);
    
    const clients = await getClients();
    if (id) {
        const client = await getClient(id);
        return { client, userName, clients };
    }
    // console.log(loaderData); // Clients
    return { clients, userName };

}

const ChatLayout = ( { loaderData }: Route.ComponentProps ) => {

    const { clients, userName, client } = loaderData;

    const navigate = useNavigate();
    const logout = () => {
        // remove token
        localStorage.removeItem('token');
        // invalidate the query and refetch
        navigate( "/auth/logout", { replace: true})
    };
    
    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <div className="w-64 border-r bg-muted/10">
            <div className="p-4 border-b">
                <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-primary" />
                <Link to="/chat" className="font-semibold">{ userName || 'UserName'}</Link>
                </div>
            </div>
            <ContactList clients={ clients } />
            <div className="p-4 border-t">
                <Form method="post" action='/auth/logout'>
                    <Button variant={"default"} onClick={() => logout()} className="text-center w-full cursor-pointer" size={'sm'}>
                        <LogOut className="h-4 w-4" />
                        Logout
                    </Button>
                </Form>
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
                <ContactInfoHandler client={ client }/>
            </div>
            </div>
        </div>
    )
}

export default ChatLayout;
