import { useState } from "react"
import { Copy, Download, ThumbsUp, ThumbsDown, Send, LoaderCircle, MessageSquareMore } from "lucide-react"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { Button } from "~/components/ui/button"
import { Textarea } from "~/components/ui/textarea"
import { Form, useNavigation, useParams, type ShouldRevalidateFunctionArgs } from "react-router"
import { getClientMessages, sendMessage } from "~/fake/fake-data"
import type { Route } from "./+types/client-chat-page"
import { formatDate } from "~/lib/date-formatter"
import type { Message } from "~/interfaces/chat.interface"

// export const  shouldRevalidate = (arg: ShouldRevalidateFunctionArgs ) => {
//     return true; // false
// }

export const loader = async ({ context, params, request }: Route.LoaderArgs) => {
    const { id } = params;
    console.log('Id', id);
    
    if (!id) {
        console.log('No found id');
        return { messages: [] };
    }
    const messages = await getClientMessages(id);
    return { messages };
}

// action
export const action = async ({ request, context, params }: Route.ActionArgs) => {
    const { id } = params;
    const form = await request.formData();
    const message = form.get('message');
    console.log('message', message);
    // insert message into database
    const newMessage: Message = {
        sender: 'agent',
        clientId: id,
        content: message as string,
        createdAt: new Date(),
        like: 'neutral',
        id: `M1-${Math.floor(10000 + Math.random() * 90000)}`,
    }
    await sendMessage(newMessage);
    return newMessage;
}

export default function ClientChatPage({ loaderData, actionData, params, matches }: Route.ComponentProps) {
    const [input, setInput] = useState("");
    const navigation = useNavigation(); // HANDLE NAVIGATIONS
    
    if (navigation.state === 'loading' && !actionData) return (
        <div className="flex mt-8 w-full items-center justify-center">
            <div className="text-center">
                <LoaderCircle size={40} className="mx-auto mb-4 animate-spin" />
                <p className="text-1xl font-bold">Loading..</p>
            </div>
        </div>
    );

    if (!loaderData || !loaderData.messages) {
        return (
            <div className="flex mt-8 w-full items-center justify-center">
                    <div className="text-center">
                        <MessageSquareMore size={40} className="mx-auto mb-4 text-muted-foreground"/>
                        <h1 className="text-2xl font-bold">No Messages </h1>
                        <p className="text-balance text-muted-foreground">Start a conversation.</p>
                    </div>
                </div>
        )
    }

    const  { messages = [] } = loaderData;

    return (
        <div className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                {
                    messages.map((message, index: number) => (
                        <div key={index} className="w-full">
                        {message.sender === "client" ? (
                            // Agent message - left aligned
                            <div className="flex gap-2 max-w-[80%]">
                            <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0" />
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">NexTalk</span>
                                <span className="text-sm text-muted-foreground">{formatDate(message.createdAt)}</span>
                                </div>
                                <div className="p-3 bg-muted/50 rounded-lg">
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Copy className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <ThumbsUp className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <ThumbsDown className="h-4 w-4" />
                                </Button>
                                </div>
                            </div>
                            </div>
                        ) : (
                            // User message - right aligned
                            <div className="flex flex-col items-end">
                            <div className="text-right mb-1">
                                <span className="text-sm font-medium mr-2">G5</span>
                                <span className="text-sm text-muted-foreground">{formatDate(message.createdAt)}</span>
                            </div>
                            <div className="bg-black text-white p-3 rounded-lg max-w-[80%]">
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            </div>
                            </div>
                        )}
                        </div>
                    ))
                }
                {   
                    messages.length === 0
                    ? <div className="flex mt-8 w-full items-center justify-center">
                        <div className="text-center">
                            <MessageSquareMore size={40} className="mx-auto mb-4 text-muted-foreground"/>
                            <h1 className="text-2xl font-bold">No Messages </h1>
                            <p className="text-balance text-muted-foreground">Start a conversation.</p>
                        </div>
                    </div>
                    : null
                }
                </div>
            </ScrollArea>
            <div className="p-4 border-t">
                <Form method="post" >

                    <div className="flex items-center gap-2">
                        <Textarea
                            name="message"
                            placeholder="Type a message as a customer"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="min-h-[44px] h-[44px] resize-none py-3"
                        />
                        <Button className="h-[44px] px-4 flex items-center gap-2" type="submit">
                            <Send className="h-4 w-4" />
                            <span>Send</span>
                        </Button>
                    </div>

                </Form>
            </div>
        </div>
    )
}

