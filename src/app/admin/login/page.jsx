import { LoginComp } from "@/components/admin"

export const metadata = {
    title: "Admin Login",
    icons: {
        icon: '/icon.png'
    }
}

export default function LOGIN () {
    return (
        <div>
            <LoginComp />
        </div>
    )
}