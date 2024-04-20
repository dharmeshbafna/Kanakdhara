import { ContactComp } from "@/components/contact"

export const metadata = {
    title: 'Contact - Kanakdhara',
    icons: {
        icon: '/icon.png'
    }
}

export default function CONTACT () {
    return (
        <div>
            <ContactComp />
        </div>
    )
}