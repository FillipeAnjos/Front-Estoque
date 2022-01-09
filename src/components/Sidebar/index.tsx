import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FcBriefcase , FcHome, FcPaid, FcShipped, FcLike, FcManager } from "react-icons/fc";
import Link from 'next/link';
import styles from '../Sidebar/styles.module.scss';
import { signOut, useSession } from 'next-auth/react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useRouter } from "next/router";

export function Sidebar() {

    const {data: session} = useSession();
    const router = useRouter();

    function deslogar(){
      router.push('/criarConta');
      signOut();
    }

    return (
        <>
          <ProSidebar className={styles.provider}>
          <Menu iconShape="square">
            {session ? 
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
                  </SubMenu>                  
                  
                </SubMenu>
              </> 
            : 
              <SubMenu title="Logar" icon={<FcHome />}>
                {/*<MenuItem >
                    <Link href="/login">Login</Link>
                  </MenuItem>*/}
                  <MenuItem >
                    <Link href="/criarConta">Criar Conta</Link>
                  </MenuItem>
              </SubMenu>
            }
          </Menu>
        </ProSidebar>
        <div className={styles.menuFixoMarginDireita} />
      </>
    )
}