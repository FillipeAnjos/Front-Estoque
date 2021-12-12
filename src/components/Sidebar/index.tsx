import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FiHome, FiHeart } from 'react-icons/fi';
import { FcBriefcase , FcHome} from "react-icons/fc";
import Link from 'next/link';

import styles from '../Sidebar/styles.module.scss';
import { signOut, useSession } from 'next-auth/react';

import { AiOutlineLogout } from 'react-icons/ai';

export function Sidebar() {

    const {data: session} = useSession();

    return (
        <>
          <ProSidebar className={styles.provider}>
          <Menu iconShape="square">
            {!session ? 
              <>
                <MenuItem>
                  <h2 className={styles.logout} title='Deseja deslogar?' onClick={ () => signOut() }><AiOutlineLogout /></h2>
                </MenuItem>
                <MenuItem icon={<FcHome />}>
                  <Link href="/home">Home</Link>
                </MenuItem>
                <SubMenu title="Produtos" icon={<FcBriefcase />}>

                  <SubMenu title="Inserir">
                    <MenuItem >
                      <Link href="/produtoNovo">Produto</Link>
                    </MenuItem>
                    <MenuItem >
                      <Link href="/produtoQtd">Quantidade</Link>
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