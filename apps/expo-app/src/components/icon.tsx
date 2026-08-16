import { IconKey, Icons } from "@/lib/content/icons.content";


interface IconProps {
    key: IconKey;
    color?: string;
    size?: number;
    children?: React.ReactNode
}
export default function Icon ({key, color, size, children} : IconProps){

    const IconComponent = Icons[key];

    if(! IconComponent) {

        console.error("[icon] failed to get icon: ", key)
        return null;
    }

    return (

      <IconComponent  size={size} color={color} >

        {children}

      </IconComponent>


    )


}