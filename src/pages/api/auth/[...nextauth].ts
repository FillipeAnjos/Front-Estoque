import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { api } from '../../../services/api'

interface User { 
              status: boolean;
              id: number; 
              name: string; 
              email: string; 
              idade: number 
            }

export default NextAuth({
    session: {
      maxAge: 24 * 60 * 60, // 24 hours
    },
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: "", type: "text", placeholder: "Email" },
            senha: {  label: "", type: "password", placeholder: "Senha" }
          },
          async authorize(credentials, req) {

            let credenciais = { email: credentials.email, senha: credentials.senha };

            let user = null;
            await api({
                  method: 'post',
                  url: '/login',
                  data: {
                  param: credenciais
                }
            }).then(function(res) {
                user = res.data;
            })

            if (user.status) {
              return user
            } else {
                console.log("Erro ao tentar logar. Usuário e/ou Senha incorretos!");
              return null
            }
          }
        })
      ]
    
})