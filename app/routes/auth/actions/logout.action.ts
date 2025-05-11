import { destroySession, getSession } from "~/sessions.server";
import { redirect } from "react-router";
import type { Route } from "./+types/logout.action";


export async function action({ request, context, params }: Route.ActionArgs) {
    const session = await getSession( request.headers.get("Cookie") );

    return redirect("/auth/login", {
        headers: {
            "Set-Cookie": await destroySession(session),
        },
    });
}