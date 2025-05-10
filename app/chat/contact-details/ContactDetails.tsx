import { Ban } from "lucide-react";
import { useParams } from "react-router";

export const  ContactDetails = () => {

    const { clientId } = useParams();

    return (
        <div className="flex mt-8 w-full items-center justify-center">
            <div className="text-center">
                <Ban size={40} className="mx-auto mb-4 text-muted-foreground"/>
                <h1 className="text-2xl font-bold">Contact not found</h1>
            </div>
        </div>
    );
};