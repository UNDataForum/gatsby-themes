const { createFilePath } = require('gatsby-source-filesystem');
const remark = require('remark');
const strip = require('strip-markdown');
const defaultOptions = require('../defaultOptions');

module.exports = (
  { node, actions, getNode, createNodeId, createContentDigest },
  {
    basePath = defaultOptions.basePath,
    contentPath = defaultOptions.contentPath,
    type = defaultOptions.type,
  }
) => {
  // Process MDX nodes only.
  if (node.internal.type !== `Mdx`) {
    return;
  }

  // Parent fileNode makes `name` option from `gatsby-source-filename` available as `sourceInstanceName`.
  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;

  const { createNode, createParentChildLink } = actions;

  // Process files in `contentPath` location only.
  if (source === contentPath) {
    // Process description.
    let description;
    if (node.frontmatter.description) {
      description = node.frontmatter.description;
    } else {
      const match =
        // Match first para when there is import statement, then first para when there is no import statement.
        node.rawBody.match(/;\n\n(.+)/) || node.rawBody.match(/\n\n(.+)/);
      if (match) {
        // Strip Markdown.
        description = remark()
          .use(strip)
          .processSync(match[1])
          .contents.trim();
      }
    }

    // Process path.
    let path;
    if (node.frontmatter.slug) {
      path = `/${node.frontmatter.slug}/`;
    } else {
      // The `basePath` argument is not the same as theme option `basePath`/
      path = createFilePath({ node, getNode, basePath: contentPath });
    }
    const slug = path.slice(1, -1);
    // Add theme's basePath.
    path = `${basePath}${path}`;
    const post = {
      slug,
      type,
      title: node.frontmatter.title,
      date: node.frontmatter.date,
      // Contains author slugs.
      authors: node.frontmatter.authors,
      images: node.frontmatter.images,
      description,
      path,
    };
    const postNode = {
      ...post,
      // Generated ID is namespaced to plugin.name.
      id: createNodeId(`${type}-${slug}`),
      // Make post node aware of MDX node.
      parent: node.id,
      children: [],
      internal: {
        type: 'Post',
        contentDigest: createContentDigest(post),
      },
    };
    createNode(postNode);
    // Make MDX node aware of derived post node.
    createParentChildLink({ parent: node, child: postNode });
  }
};
