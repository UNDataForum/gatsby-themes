const path = require('path');

const pkg = require('./package.json');

module.exports = {
  siteMetadata: {
    title: 'Test Site',
    description: 'Test site description for SEO.',
    keywords: [
      'United Nations World Data Forum',
      '2030 Agenda',
      'Sustainable Development Goals',
    ],
    siteTwitterUsername: 'UNDataForum',
    siteUrl: pkg.homepage,
  },
  plugins: [
    'gatsby-theme-blog',
    'gatsby-theme-news',
    'gatsby-theme-profiles',
    'gatsby-theme-webinars',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src', 'images'),
      },
    },
  ],
};
