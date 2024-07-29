import {
    LoaderComp,
    Dashboard
} from "@/components/admin";

export const metadata = {
    title: "Dashboard",
    icons: {
        icon: '/icon.png'
    }
};

export default function DASHBOARD() {
    return (
        <div>
            <LoaderComp />
            <Dashboard />
        </div>
    )
}