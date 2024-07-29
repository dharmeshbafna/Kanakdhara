import { Main } from "@/components/goldjewellerypages"
import { GetCategories } from "@/api/product";

export async function generateMetadata({ params }) {

    const res = await GetCategories();
    const a = res.success;
    const cat = a.find((i) => i.category.toLowerCase().replace(/ /g, '-') == params.slug);

    if (!cat) {
        return ({ category: '404 Not Found' })
    }

    return {
        title: `${cat.category} - KanakDhara Jewelers`,
        icons: {
            icon: '/icon.png'
        },
    };
}

export default function Gold({ params }) {
    return (
        <div>
            <Main name={params.slug} />
        </div>
    )
};