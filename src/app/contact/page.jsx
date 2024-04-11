import { ContactComp } from "@/components/contact"
import { BreadCrumb } from "@/components/other"

export const metadata = {
    title: 'Contact - Kanakdhara',
    icons: {
        icon: '/icon.png'
    }
}

export default function CONTACT () {
    return (
        <div>
            <BreadCrumb />
            <ContactComp />
        </div>
    )
}