import { Footer } from '@/components';
import { userRegisterUsingPost } from '@/services/api-backend/userController';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { Helmet, Link, history } from '@umijs/max';
import { Tabs, message } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import Settings from '../../../../config/defaultSettings';

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});

const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { styles } = useStyles();

  const handleSubmit = async (values: API.UserRegisterRequest) => {
    try {
      // 注册
      const res = await userRegisterUsingPost({
        ...values,
      });
      if (res.data) {
        history.push('/user/login');
      }
    } catch (error) {
      const defaultRegisterFailureMessage = '注册失败，请重试！';
      console.log(error);
      message.error(defaultRegisterFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {'注册'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          submitter={{
            searchConfig: {
              submitText: '注册',
            },
          }}
          logo={<img alt="logo" src="http://8.140.27.137:9000/mypic/imgs/logo.png" />}
          title="Play API"
          initialValues={{
            autoRegister: true,
          }}
          onFinish={async (values: any) => {
            await handleSubmit(values as API.UserRegisterRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'user',
                label: '账户密码注册',
              },
            ]}
          />
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'用户名'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'再次输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Link to="/user/login">登录</Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
