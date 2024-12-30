export default `#graphql
  scalar Date

  type User {
    id: ID!
    fullName: String!
    birthdate: Date!
    email: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`
