import { Material } from "@/app/types/Material";
import MaterialCard from "../MaterialCard";
import { getCategories, getCategory } from "@/app/lib/category";

interface Props {
    materials: Material[];
}

const MaterialList = ({ materials }: Props) => {
    return (
        <div className="flex flex-wrap">
            {materials?.map((material) => (
                <MaterialCard key={material.id} material={material} />
            ))}
        </div>
    );
}

export default MaterialList;