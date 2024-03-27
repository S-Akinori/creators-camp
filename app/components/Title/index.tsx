import clsx from "clsx";
import TextShadow from "../TextShadow";
import { reggaeOne } from "@/app/fonts";

interface Props {
    children: string;
    className?: string;
}
const Title = ({children, className}: Props) => {
    return (
        <div>
            <h2 className={clsx(['flex justify-center', reggaeOne.className, className])}><TextShadow className="text-xl md:text-7xl">{children}</TextShadow></h2>
        </div>
    );
}

export default Title;