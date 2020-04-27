import React from 'react';
import { Header } from '@undataforum/components';
import { Logo } from '@undataforum/assets';

const ShadowedHeader = (props) => (
  <Header
    {...props}
    logo={<Logo scaleTo="height" />}
    links={[
      { href: '/blog/', text: 'Blog' },
      { href: '/news/', text: 'News' },
      { href: '/webinars/', text: 'Webinars' },
      { href: '/profiles/', text: 'Profiles' },
      { href: '/test/', text: 'Test' },
    ]}
  />
);

export default ShadowedHeader;
