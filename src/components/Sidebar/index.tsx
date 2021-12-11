import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FiHome, FiHeart } from 'react-icons/fi';
import { FcBriefcase , FcHome} from "react-icons/fc";
import Link from 'next/link';

import styles from '../Sidebar/styles.module.scss';
import { useSession } from 'next-auth/react';

export function Sidebar() {

    const {data: session} = useSession();

    return (
        <ProSidebar className={styles.provider}>
        <Menu iconShape="square">
          {session ? 
            <>
              <MenuItem icon={<FcHome />}>
                <Link href="/">Home</Link>
              </MenuItem>
              <SubMenu title="Produtos" icon={<FcBriefcase />}>
                <MenuItem >
                  <Link href="/produtoNovo">Produto Novo</Link>
                </MenuItem>
                <MenuItem >
                  <Link href="/produtoExistente">Inserir quantidade</Link>
                </MenuItem>
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
    )
}