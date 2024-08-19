'use client'
import { Checkbox } from "@mui/material";
import FormControl from "../../Form/FormControl";
import Label from "../../Form/Label";
import { ChangeEvent, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { updateQueryString } from "@/app/lib/functions/updateQueryString";

interface Props {
    defaultChecked?: boolean;
}

const AISearchForm = ({defaultChecked = false}: Props) => {
    const router = useRouter();
    const [checked, setChecked] = useState(defaultChecked);
    const searchParams = useSearchParams()
    const pathname = usePathname()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newQuery = updateQueryString(searchParams.toString(), 'except_ai', e.target.checked ? '1' : '0');
        router.push(`${pathname}?${newQuery}`);
    };

    useEffect(() => {
        if(searchParams.get('except_ai') === '1') {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }, [searchParams]);

    return (
        <form action="">
            <FormControl>
                <Checkbox id="except_ai" name="except_ai" value="except_ai" onChange={handleChange} checked={checked} />
                <Label htmlFor="except_ai">AI素材を除外</Label>
            </FormControl>
        </form>
    );
};

export default AISearchForm;