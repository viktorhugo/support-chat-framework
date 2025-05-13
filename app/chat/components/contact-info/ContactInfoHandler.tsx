import { useLoaderData, useNavigation, useParams } from "react-router";
import NoContactSelectedPage from "./NoContactSelected";
import type { Client } from "~/interfaces/chat.interface";
import { ContactInfoSkeleton } from "./ContactInfoSkeleton";
import { ContactInfo } from "./ContactInfo";

interface props {
    client?: Client
}

export const ContactInfoHandler = ({ client }: props) => {
 // user first loader data
    const { state } = useNavigation();
    const { clients = [] } = useLoaderData();

    // console.log('state', {state});

    if (client) return <ContactInfo client={ client } />;
    if (state === 'loading' && !client) return <ContactInfoSkeleton />;
    if (!client) return <NoContactSelectedPage />;
    
    return <ContactInfo client={client} />
};