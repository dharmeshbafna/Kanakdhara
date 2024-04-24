import { Main } from "@/components/goldjewellerypages"

export default function Gold ({ params }) {
    return (
        <div>
            <Main name={params.slug} />
        </div>
    )
};