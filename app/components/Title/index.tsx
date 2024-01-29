import TextShadow from "../TextShadow";

interface Props {
    children: string;
    className?: string;
}
const Title = ({children}: Props) => {
    return (
        <div>
            <h2 className="flex justify-center"><TextShadow className="text-xl md:text-7xl">{children}</TextShadow></h2>
        </div>
    );
}

export default Title;