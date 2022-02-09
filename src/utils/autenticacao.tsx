import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { api } from '../services/api';

interface IUserLogado{
    admin: string;
    created_at: string;
    email: string;
    genero: string;
    id: number;
    nascimento: string;
    nome: string;
    senha: string;
    updated_at: string;
}

class Autenticacao{

    userLogado(){
        const { 'nextauth.estoque.token': tokenLogado } = parseCookies();
        return tokenLogado;
    }

    async usuarioLogado(tokenLogado: string){
        var part = tokenLogado.split("_");
        var idLogado = part[1];

        var user: IUserLogado;

        await api({
            method: 'POST',
            url: '/buscarUserLogado',
                data: {
                    param: parseInt(idLogado)
                }
            }).then((res) => {
                user = res.data.user;
            })

        return user
    }

}

export { Autenticacao }