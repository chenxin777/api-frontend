import { AvatarDropdown, AvatarName } from '@/components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { requestConfig } from './requestConfig';
import {getLoginUserUsingGet} from '@/services/api-backend/userController';
import Footer from '@/components/Footer';

const loginPath = '/user/login';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<InitialState> {
  
  const state: InitialState = {
    // @ts-ignore
    loginUser: undefined
  }
  // 当页面首次加载时,获取全局要保存的数据，比如用户登录信息
  try {
    const res = await getLoginUserUsingGet();
    if (res.data) {
      state.loginUser = res.data;
    }
  } catch (error) {
    history.push(loginPath);
  }
  return state;
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    layout: 'top',
    waterMarkProps: {
      content: initialState?.loginUser?.userName
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      if (!initialState?.loginUser && location.pathname !== loginPath) {
        history.push(loginPath)
      }
    },
    avatarProps: {
      src: initialState?.loginUser?.userAvatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    
  };
};


/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...requestConfig,
};
