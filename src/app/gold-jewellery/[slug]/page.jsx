import { Main } from "@/components/goldjewellerypages"
import { GetCategories } from "@/api/product";

export async function generateMetadata({ params, searchParams }) {

    const res = await GetCategories();
    const a = res.success;
    const cat = a.find((i) => i.category.toLowerCase().replace(/ /g, '-') == params.slug);
    const id = searchParams.id;

    if (!cat) {
        return ({ category: '404 Not Found' })
    }

    const getitem = cat.products.find((i) => i._id == id);

    return {
        title: getitem.title ? `${getitem.title} | ${cat.category}` : `${cat.category} - KanakDhara Jewelers`,
        icons: {
            icon: getitem.imglink 
        },
    };
}

export default function Gold({ params }) {
    return (
        <div className="overflow-x-hidden">
            <Main name={params.slug} />
        </div>
    )
};