import React from 'react';
import { node } from 'prop-types';
import { Box, Flex, Themed } from 'theme-ui';

import Header from './header';
import Footer from './footer';

const Layout = ({ children, ...props }) => (
  <Themed.root>
    <Flex sx={{ flexDirection: 'column', minHeight: '100vh' }}>
      <Header {...props} mb={3} />
      <Box sx={{ flex: 1, mb: 4 }}>{children}</Box>
      <Footer />
    </Flex>
  </Themed.root>
);

Layout.propTypes = {
  children: node,
};

export default Layout;
