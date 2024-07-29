import { AboutComp, Manufacturing } from "@/components/about"
import { CTA } from "@/components/home"

export const metadata = {
    title: 'About - Kanakdhara',
    icons: {
        icon: '/icon.png'
    }
}

export default function CONTACT() {
    return (
        <div className="">
            <AboutComp />
            <Manufacturing />
            <CTA />
        </div>
    )
}