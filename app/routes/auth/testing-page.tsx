import { Form, Link, NavLink, useFetcher, useNavigation } from "react-router";
import type { Route } from "./+types/testing-page";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { sleep } from "~/lib/sleep";
import { Loader2Icon, Send, type Loader2 } from "lucide-react";

interface FormTypeData {
    username: string;
    password: string;
}

export async function loader() {
    console.log('loader called - Server');
    return { message: "Hello, world Loader Data! - Server" };
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {

    console.log('client Loader called - Client');
    // call the server loader
    const serverData = await serverLoader();
    console.log('client Loader called - message', serverData.message);
    // And/or fetch data on the client
    // const data = getDataFromClient();
    // Return the data to expose through useLoaderData()
    // return data;
    return { message: "Hello, From the client Loader Data! - Client", serverData };
}

//* Actions 

export async function action({ request, context, params }: Route.ActionArgs) { // action que llega al backend
    console.log('Server - side action called'); 
    await sleep(1000);
    const data = await request.formData();
    console.log('data', { data }); 
    const username = data.get('username');
    const password = data.get('password');
    console.log( 'username',username );  
    console.log( 'password', password );  
    // checkValidationForm();
    // can still call the server action if needed
    return { username, password } ;
}

// Like route actions but only called in the browser.

export async function clientAction({ serverAction, request }: Route.ClientActionArgs) {
    console.log('Client - ClientActionArgs'); 
    const requestData = await request.clone().formData(); // CLONAR EL REQUEST
    const data = await serverAction();
    await sleep(1000);
    return { message: "Hello, From the client Action! - Client", data, requestData };
}


export default function MyRouteComponent({
    loaderData,
    actionData,
    params,
    matches,
}: Route.ComponentProps) {

    const fetcher = useFetcher(); // HANDLE PENDING REQUESTS
    const navigation = useNavigation(); // HANDLE NAVIGATIONS
    const isPosting = navigation.state === 'submitting';
    console.log('MyRouteComponent - Listen actionData', actionData);
    console.log('navigation', { isPosting, navigation });
    
    return (
        <div>
            <h1 className="text-2xl font-bold">Testing Page</h1>
            <p>Loader Data: {JSON.stringify(loaderData)}</p>
            <p>Action Data: {JSON.stringify(actionData)}</p>
            <p>Route Parameters: {JSON.stringify(params)}</p>
            <p>Matched Routes: {JSON.stringify(matches)}</p>
            <NavLink
                to="/auth/testing-args/client-123/victor/33" 
                className={({ isPending }) => isPending ? 'underline text-gray-500' : 'text-blue-500'}
                // className="underline text-blue-500"
            >
                Go to Testing Args
            </NavLink>

            <Label id="form-fetcher" className="mt-4 text-2xl font-bold"> Form fetcher </Label>    
            <fetcher.Form className="flex flex-col gap-2 mt-2 max-w-fit" method="post" > {/* action="/auth/testing-page" */}
                <Label id="username"> User Name</Label>
                <Input type="text" name="username" required/>
                <Label id="password"> Password</Label>
                <Input type="password" name="password" required/>
                
                <Button  type="submit" variant="outline" className="" disabled={fetcher.state !== "idle"}>
                {fetcher.state !== "idle"
                    ? <>
                        <Label id="submit"> Sending.. </Label>
                        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    </>
                    : <>
                        <Label id="submit"> Submit</Label>
                        <Send className="mr-2 h-4 w-4" > Submit</Send>
                    </>
                }
                </Button>
            </fetcher.Form>

            
            <Label id="form-normal" className="mt-4 text-2xl font-bold"> Form normal </Label>
            <Form className="flex flex-col gap-2 mt-2 max-w-fit" method="post" > {/* action="/auth/testing-page" */}
                <Label id="username"> User Name</Label>
                <Input type="text" name="username" required/>
                <Label id="password"> Password</Label>
                <Input type="password" name="password" required/>
                
                <Button  type="submit" disabled={isPosting}>
                {isPosting
                    ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    : <>
                        <Label id="submit"> Submit</Label>
                        <Send className="mr-2 h-4 w-4" > Submit</Send>
                    </>
                }
                </Button>
            </Form>
        </div>
    );
}