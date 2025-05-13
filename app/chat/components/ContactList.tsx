import React from 'react'
import { NavLink, useParams } from 'react-router'
import { Button } from '~/components/ui/button'
import { ScrollArea } from '~/components/ui/scroll-area'
import type { Client } from '~/interfaces/chat.interface'

interface ContactListProps {
    clients: Client[]
}

export const ContactList = ({ clients }: ContactListProps ) => {

    const { id } = useParams();
    const clientId = id || '';
    const isLoading = clients.length === 0;

    return (
        <div>
            <ScrollArea className="h-[calc(100vh-134px)]">
                <div className="space-y-4 p-4">
                    <div className="space-y-1">
                        <h3 className="px-2 text-sm font-semibold">Contacts</h3>
                        <div className="space-y-1">
                            {
                                isLoading && 
                                <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
                                    <div className="animate-pulse">Loading contacts...</div>
                                </div>
                            }
                            {
                                clients?.map((client) => (
                                    <NavLink 
                                        key={client.id} 
                                        to={`/chat/client/${client.id}`} 
                                        className={ ({ isActive, isPending, isTransitioning   }) => 
                                            `w-full flex items-center justify-start pl-3 m-2 transition-all duration-300 ${ isActive 
                                                ? 'bg-blue-100 text-primary font-medium rounded-md p-1' 
                                                : 'hover:bg-muted/50 rounded-md'
                                            }`
                                        }
                                    >
                                        <div className={`h-6 w-6 rounded-full mr-2 flex-shrink-0 flex items-center justify-center text-xs ${
                                                client.id === clientId 
                                                    ? 'bg-blue-500 text-white font-medium' 
                                                    : 'bg-gray-300'
                                                }`
                                            }

                                        >
                                            {client.name.charAt(0).toUpperCase()}
                                            {client.name.charAt(1).toLowerCase()}
                                        </div>
                                        <span className={` transition-all duration-300 ${
                                                client.id === clientId 
                                                    ? 'text-blue-600 font-medium' 
                                                    : 'text-gray-600'
                                                }`
                                            }> {client.name} </span>
                                    </NavLink>
                                ))
                            }

                        </div>
                    </div>
                    <div className="pt-4 border-t mt-4">
                        <h3 className="px-2 text-sm font-semibold mb-1">Recent</h3>
                        <NavLink to={"/chat/6"} className="w-full flex items-center justify-start pl-3 m-2">
                            <div className="h-6 w-6 rounded-full bg-gray-500 mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs">
                            TM
                            </div>
                            Thomas Miller
                        </NavLink>
                        <NavLink to={"/chat/7"} className="w-full flex items-center justify-start pl-3 m-2">
                            <div className="h-6 w-6 rounded-full bg-red-500 mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs">
                            SB
                            </div>
                            Sarah Brown
                        </NavLink>
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}
