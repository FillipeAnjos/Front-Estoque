import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ElementType, useEffect } from "react";

export default function verificarAutenticidade(WrappedComponent: ElementType){
    const Wrapper = (props: any) => {
        
        const {data: session} = useSession();
        const router = useRouter();

        //console.log(session);
        //console.log(session.user.name.nome);
        
        useEffect(() => {

            /*if(!session){
                router.replace('/');
            }*/

        }, []);
        
        return <WrappedComponent {...props} />
    }

    return Wrapper;
}