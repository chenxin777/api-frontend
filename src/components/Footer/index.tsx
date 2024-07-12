import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = '玩物志出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/chenxin777',
          blankTarget: true,
        },
      ]}
      copyright={`${currentYear} ${defaultMessage}`}
    />
  );
};

export default Footer;
