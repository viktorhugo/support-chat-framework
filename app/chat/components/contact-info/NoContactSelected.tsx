import { ShieldUser } from "lucide-react";

export const NoContactSelectedPage = () => {
    return (
        <div className="flex mt-8 w-full items-center justify-center">
            <div className="text-center">
                <ShieldUser size={40} className="mx-auto mb-4 text-muted-foreground" />
                <h1 className="text-2xl font-bold">No Contact selected</h1>
                <p className="text-balance text-muted-foreground">Please select a user to the list for view details and starting chatting</p>
            </div>
        </div>
    )
};

export default NoContactSelectedPage;