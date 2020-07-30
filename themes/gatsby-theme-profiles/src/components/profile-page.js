import React from 'react';
import { arrayOf, object, shape, string } from 'prop-types';
import { Container, Grid, Heading, Styled } from 'theme-ui';
import { Names, PostPreview, ProfilePreview } from '@undataforum/components';
import { Layout, MDXRenderer, Seo } from '@undataforum/gatsby-theme-base';
import Img from 'gatsby-image';
import { FormattedMessage, IntlProvider } from 'react-intl';

import messages from '../i18n/messages';

const Profile = ({ data, pageContext: { lang, posts }, location }) => {
  const {
    avatar: {
      childImageSharp: { fixed },
    },
    honorific,
    name,
    jobtitle,
    organization,
    description,
    body,
    roles,
  } = data.profile;
  return (
    <IntlProvider locale={lang} messages={messages[lang]}>
      <Layout location={location}>
        <Seo title={name} description={description} />
        <Container variant="narrow">
          <ProfilePreview
            profile={{
              avatar: (
                <Img
                  style={{ borderRadius: '100%' }}
                  alt={name}
                  fixed={fixed}
                />
              ),
              honorific,
              name: (
                <Heading as="h1" sx={{ textAlign: 'center', mb: 1 }}>
                  {name}
                </Heading>
              ),
              jobtitle,
              organization,
              badges: roles,
            }}
            mb={4}
          />
          <MDXRenderer>{body}</MDXRenderer>
          {posts.length > 0 && (
            <>
              <Styled.h2>
                <FormattedMessage id="relatedPosts" values={{ name }} />
              </Styled.h2>
              <Grid gap={4} columns={1}>
                {posts.map(({ id, ...post }) => {
                  const {
                    title: { text: title },
                    authors,
                    date,
                    path,
                  } = post;
                  return (
                    <PostPreview
                      key={id}
                      post={{
                        title: (
                          <Heading as="h3" sx={{ textAlign: 'start', mb: 3 }}>
                            {title}
                          </Heading>
                        ),
                        authors: (
                          <Names
                            values={authors.map(
                              ({ name: authorName }) => authorName
                            )}
                            mb={3}
                          />
                        ),
                        date,
                        href: path,
                      }}
                    />
                  );
                })}
              </Grid>
            </>
          )}
        </Container>
      </Layout>
    </IntlProvider>
  );
};

Profile.propTypes = {
  data: shape({ profile: object.isRequired }).isRequired,
  pageContext: shape({ lang: string.isRequired, posts: arrayOf(object) }),
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default Profile;
