import { Link } from "react-router";
import type { Route } from "./+types/testing-page-args";
import { sleep } from "~/lib/sleep";
import { Loader2 } from "lucide-react";


//* change the meta data for page
export function meta() { // this function is called automatically when route is created
    return [
        { title: "Support Page" },
        {
            property: "og:title",
            content: "Very cool app",
        },
        {
            name: "description",
            content: "This app is the best",
        },
    ];
}

// define any info type (style, resources) preloaded
export function links() {
    return [
    //     {
    //         rel: "icon",
    //         href: "/favicon.png",
    //         type: "image/png",
    //     },
    //     {
    //         rel: "stylesheet",
    //         href: "https://example.com/some/styles.css",
    //     },
    //     {
    //         rel: "preload",
    //         href: "/images/banner.jpg",
    //         as: "image",
    //     },
    ];
}

export async function loader() {
    console.log('loader called - Server');
    return { message: "Hello, world Loader Data! - Server" };
}

//* change the headers for page
export function headers() { // this function is called automatically when creating page
    return {
        "X-Stretchy-Pants": "its for fun",
        "Cache-Control": "max-age=300, s-maxage=3600",
    };
}

// HydrateFallback (util cuando va a realizar un proceso que pone la aplicacion en estado de carga)

export async function clientLoader({ context, params, request, serverLoader }: Route.ClientLoaderArgs) {
    console.log('Client param context', context);
    console.log('Client param params', params);
    console.log('Client param request', request);
    console.log('Client param serverLoader', serverLoader);
    
    await sleep(3000);
    return { message: 'Test HydrateFallback!' };
}

export function HydrateFallback() {
    return (
        <div>
            <Loader2 size={40} className="animate-spin text-zinc-700 w-full" />
        </div>
    );
}

clientLoader.hydrate = true;


export default function MyRouteComponent({
    loaderData,
    actionData,
    params,
    matches,
}: Route.ComponentProps) {

    const { age, id, name } = params;
    console.log(id, name, age);
    console.log('Created Component');
    

    return (
        <div>
            <h1>Testing Args Page</h1>
            <p>Loader Data: {JSON.stringify(loaderData)}</p>
            <p>Action Data: {JSON.stringify(actionData)}</p>
            <p>Route Parameters: {JSON.stringify(params)}</p>
            <p>Matched Routes: {JSON.stringify(matches)}</p>
            <Link to="/auth/testing" className="underline text-blue-500">Go to Testing</Link>
        </div>
    );
}