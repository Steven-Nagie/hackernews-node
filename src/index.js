const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client');

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (root, args, context, info) => context.prisma.links(),
    link: (root, args, context) => {
      return context.prisma.link(args.id)
    }
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description
      });
    },
    // updateLink: (parent, args) => {
    //   for (let i = 0; i < links.length; i++) {
    //     if (links[i].id === args.id) {
    //       links[i].url = args.url ? args.url : links[i].url;
    //       links[i].description = args.description ? args.description : links[i].description;
    //       return links[i];
    //     }
    //   }
    //   return null;
    // },
    // deleteLink: (parent, args) => {
    //   for (let i = 0; i < links.length; i++) {
    //     if (links[i].id === args.id) {
    //       links.splice(i, 1);
    //     }
    //     return links;
    //   }
    // }
  }
}

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma }
});
server.start(() => console.log(`Server is running on http://localhost:4000`))