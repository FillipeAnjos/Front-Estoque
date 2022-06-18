import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ElementType, useEffect } from "react";
import { Autenticacao } from "./autenticacao";

export default function verificarAutenticidade(WrappedComponent: ElementType){
    const Wrapper = (props: any) => {
        
        const {data: session} = useSession();
        const router = useRouter();

        //console.log(session);
        //console.log(session.user.name.nome);
        
        useEffect(() => {
            var autenticacao = new Autenticacao();
            var tokenLogado = autenticacao.userLogado();

            if(!tokenLogado){
                router.replace('/'); 
            }

            /*if(!session){
                router.replace('/');
            }*/

        }, []);

        const WrappedComponents = WrappedComponent as any; // Gambiarra feita para resolver o erro da Vercel, retorno de um elemento JSX
        
        return <WrappedComponents {...props} />
    }

    return Wrapper;
}