import { Material } from "@/app/types/Material";
import MaterialCard from "../MaterialCard";

interface Props {
    materials: Material[];
}

const MaterialList = ({ materials }: Props) => {
    return (
        <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {materials?.map((material) => (
                    <MaterialCard key={material.id} material={material} />
                ))}
            </div>
        </div>
    );
}

export default MaterialList;