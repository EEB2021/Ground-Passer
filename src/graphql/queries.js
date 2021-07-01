/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getScoredb = /* GraphQL */ `
  query GetScoredb($id: ID!) {
    getScoredb(id: $id) {
      id
      name
      zeit
      createdAt
      updatedAt
    }
  }
`;
export const listScoredbs = /* GraphQL */ `
  query ListScoredbs(
    $filter: ModelScoredbFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listScoredbs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        zeit
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
