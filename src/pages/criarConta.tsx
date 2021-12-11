
import { FormEvent, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import styles from '../components/CriarConta/styles.module.scss';
import { api } from '../services/api';

export default function CriarConta() {

    const [nome, setNome] = useState('');
    const [sobre, setSobre] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [genero, setGenero] = useState('f');
    const [admin, setAdmin] = useState('');
    
    const {data: session} = useSession();

    function criarConta(event: any) {
        event.preventDefault();

        var dados = {
            nome: nome,
            sobre: sobre,
            email: email,
            senha: senha,
            nascimento: nascimento,
            genero: genero,
            admin: admin
        }

        api({
            method: 'POST',
            url: '/cadastrarUser',
            data: {
                param: dados
            }
        }).then( (res) => {
            //console.log(res);

            if(res.data.user.success){
                
                alert(res.data.user.success);
                setNome('');
                setSobre('');
                setEmail('');
                setSenha('');
                setNascimento('');
                setGenero('f');
                setAdmin('');

            }else{
                alert(res.data.user.error);
            }
        })
    }

    return (
     <>
        <form>
            <div className={styles.container}>    

                <br/>
                <h2>Abra sua conta</h2>
                <h4>E gerencie sua loja!</h4>

                <div className={styles.containerNomes}> 
                    <input type="text" className={styles.nome} placeholder="Nome" value={nome} onChange={ event => setNome(event.target.value) } />  
                    <input type="text" className={styles.sobre} placeholder="Sobre nome" value={sobre} onChange={ event => setSobre(event.target.value) } />
                </div>

                <input type="text" className={styles.email} placeholder="Email" value={email} onChange={ event => setEmail(event.target.value) } />
                
                <input type="password" className={styles.senha} placeholder="Senha" value={senha} onChange={ event => setSenha(event.target.value) } />

            </div>

                <br/> 
                <label className={styles.nascimentoText}>Data de Nascimento</label>
                <input name="nascimento" type="date" className={styles.nascimento} value={nascimento} onChange={ event => setNascimento(event.target.value) } />

                <br/> 
                <label className={styles.generoText}>Genero</label>
                <select value={genero} className={styles.genero} onChange={ event => setGenero(event.target.value) }>
                    <option value="m">Masculino</option>
                    <option value="f">Feminino</option>
                    <option value="o">Outro</option>
                </select>

                <br/> 
                <label className={styles.generoText}>Senha Administrador</label>
                <input type="password" className={styles.admin} placeholder="Senha Admin" value={admin} onChange={ event => setAdmin(event.target.value) } />

            <br/>

            {!session ? 
                <>
                    <button 
                        type="submit"
                        className={styles.buttonLogar}
                        onClick={(event) => criarConta(event)}
                    >
                        Criar Conta
                    </button> 
                    &nbsp;&nbsp;&nbsp;
                    
                    <button 
                        type="submit"
                        className={styles.buttonLogar}
                        onClick={() => signIn()}
                    >
                        Logar
                    </button>
                </>
            : 
                <button 
                    type="submit"
                    className={styles.buttonLogar}
                    onClick={() => signOut()}
                >
                    Você já está logado
                </button> 
            }

            <br/>
            <br/>

        </form>

     </>
    )
  }
  