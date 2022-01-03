import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FiHome, FiHeart } from 'react-icons/fi';
import { FcBriefcase , FcHome, FcPaid } from "react-icons/fc";
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
                  <Link href="/venda">Realizar Venda</Link>
                </MenuItem>
                <SubMenu title="Produtos" icon={<FcBriefcase />}>

                  <SubMenu title="Inserir">
                    <MenuItem >
                      <Link href="/produto">Listar / Novo</Link>
                    </MenuItem>
                  </SubMenu>

                  <SubMenu title="Balanço">
                    <MenuItem >
                      <Link href="/produtoQtd">Balanço</Link>
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