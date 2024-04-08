import { Material } from "@/app/types/Material";
import MaterialCard from "../MaterialCard";
import { getCategories, getCategory } from "@/app/lib/category";
import Button from "../../atoms/Button";
import clsx from "clsx";
import { reggaeOne } from "@/app/fonts";
import ThumbUpOffAlt from "@mui/icons-material/ThumbUpOffAlt";
import DownloadIcon from '@mui/icons-material/Download';

interface Props {
    materials: Material[];
}

const MaterialList = ({ materials }: Props) => {
    return (
        <div>
            <div className="flex flex-wrap">
                {materials?.map((material) => (
                    <MaterialCard key={material.id} material={material} />
                ))}
            </div>
        </div>
    );
}

export default MaterialList;