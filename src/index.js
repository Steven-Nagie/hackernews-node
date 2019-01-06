const { GraphQLServer } = require('graphql-yoga')


// 1
let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}];

let idCount = links.length;

// 2
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => {
      const id = args.id;
      let link;
      links.forEach(innerLink => {
        if (innerLink.id === id) {
          link = innerLink;
        }
      });
      return link;
    }
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      for (let i = 0; i < links.length; i++) {
        if (links[i].id === args.id) {
          links[i].url = args.url ? args.url : links[i].url;
          links[i].description = args.description ? args.description : links[i].description;
          return links[i];
        }
      }
      return null;
    },
    deleteLink: (parent, args) => {
      for (let i = 0; i < links.length; i++) {
        if (links[i].id === args.id) {
          links.splice(i, 1);
        }
        return links;
      }
    }
  }
  // Link: {
  //   id: (parent) => parent.id,
  //   description: (parent) => parent.description,
  //   url: (parent) => parent.url
  // }
}

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))