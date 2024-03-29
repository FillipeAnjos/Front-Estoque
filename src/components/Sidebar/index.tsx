import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FcBriefcase , FcHome, FcPaid, FcShipped, FcLike, FcManager, FcInspection } from "react-icons/fc";
import Link from 'next/link';
import styles from '../Sidebar/styles.module.scss';
import { useSession } from 'next-auth/react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useRouter } from "next/router";

import { destroyCookie } from 'nookies';
import { useEffect, useState } from 'react';
import { Autenticacao } from '../../utils/autenticacao';
import { ModalLogin } from "../../components/Modal/ModalLogin"

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

export function Sidebar() {

    const [token, setToken] = useState(false);
    const [user, setUser] = useState<IUserLogado>();

    const {data: session} = useSession();
    const router = useRouter();

    useEffect (() => {
      setarUser();
    }, [])

    return (
        <>
          <ProSidebar className={styles.provider}>
          <Menu iconShape="square">
            {//session ? 
               token ?
              <>
                <MenuItem>
                  <h2 className={styles.logout} title='Deseja deslogar?' onClick={ () => deslogar() }><AiOutlineLogout /></h2>
                </MenuItem>
                <MenuItem icon={<FcHome />}>
                  <Link href="/">Home</Link>
                </MenuItem>
                <MenuItem icon={<FcPaid />}>
                  <Link href="/Venda">Realizar Venda</Link>
                </MenuItem>
                <SubMenu title="Produtos" icon={<FcBriefcase />}>

                  <SubMenu title="Produto">
                    <MenuItem >
                      <Link href="/produto">Listar / Novo</Link>
                    </MenuItem>
                  </SubMenu>

                  <SubMenu title="Cadastrar">
                    <MenuItem >
                      <Link href="/categoria">Categoria</Link>
                    </MenuItem>
                  </SubMenu>

                  <SubMenu title="Balanço">
                    <MenuItem >
                      <Link href="/produtoQtd">Balanço</Link>
                    </MenuItem>
                  </SubMenu>
                  
                </SubMenu>

                <SubMenu title="Vendas" icon={<FcShipped />}>

                  <SubMenu title="Listar / Vendas">
                    <MenuItem >
                      <Link href="/vendas">Vendas</Link>
                    </MenuItem>
                  </SubMenu>                  
                  
                </SubMenu>

                <SubMenu title="Clientes" icon={<FcLike />}>

                  <SubMenu title="Cliente">
                    <MenuItem >
                      <Link href="/clienteCadastrar">Cadastrar</Link>
                    </MenuItem>
                    <MenuItem >
                      <Link href="/clienteListar">Listar</Link>
                    </MenuItem>
                  </SubMenu>                  
                  
                </SubMenu>

                <SubMenu title="Fornecedores" icon={<FcManager />}>

                  <SubMenu title="Fornecedor">
                    <MenuItem >
                      <Link href="/fornecedorCadastrar">Cadastrar</Link>
                    </MenuItem>
                    <MenuItem >
                      <Link href="/fornecedorListar">Listar</Link>
                    </MenuItem>
                  </SubMenu>                  
                  
                </SubMenu>
                <SubMenu title="Relatórios" icon={<FcInspection />}>

                  <SubMenu title="Vendas">
                    <MenuItem >
                      <Link href="/relatorioFechamentos">Fechamentos</Link>
                    </MenuItem>
                    <MenuItem >
                      <Link href="/relatorioVendas">Vendas</Link>
                    </MenuItem>
                  </SubMenu> 
                  <SubMenu title="Produtos">
                    <MenuItem >
                      <Link href="/relatorioProdutos">Listar</Link>
                    </MenuItem>
                  </SubMenu>
                  <SubMenu title="Clientes">
                    <MenuItem >
                      <Link href="/relatorioClientes">Listar</Link>
                    </MenuItem>
                  </SubMenu> 
                  <SubMenu title="Fornecedor">
                    <MenuItem >
                      <Link href="/relatorioFornecedores">Listar</Link>
                    </MenuItem>
                  </SubMenu>                  
                  
                </SubMenu>
              </> 
            : 
              <>
              <MenuItem>
                  {/*<h2 className={styles.logout} title='Deseja Logar?' onClick={ () => logar() }><AiOutlineLogin /></h2>*/}
                  <ModalLogin estadoLogar={mudarEstadoLogado} />
                </MenuItem>
              <SubMenu title="Logar" icon={<FcHome />}>
                {/*<MenuItem >
                    <Link href="/login">Login</Link>
                  </MenuItem>*/}
                  <MenuItem >
                    <Link href="/criarConta">Criar Conta</Link>
                  </MenuItem>
              </SubMenu>
              </>
            }
          </Menu>
        </ProSidebar>
        <div className={styles.menuFixoMarginDireita} />
      </>
    )

    async function setarUser(){
      var autenticacao = new Autenticacao();
      var tokenLogado = autenticacao.userLogado();

      if(tokenLogado){
        var userLogado = await autenticacao.usuarioLogado(tokenLogado)

          setUser(userLogado);
          setToken(true);
      }
    }

  function deslogar(){

    if(!confirm("Deseja realmente deslogar?")){
      return false;
    }

    router.push('/');
    destroyCookie(null, 'nextauth.estoque.token');
    setToken(false);
  }

  function mudarEstadoLogado(){
    var tokenStatus = !token;
    setToken(tokenStatus);
  }

}