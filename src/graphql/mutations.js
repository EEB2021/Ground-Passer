/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createScoredb = /* GraphQL */ `
  mutation CreateScoredb(
    $input: CreateScoredbInput!
    $condition: ModelScoredbConditionInput
  ) {
    createScoredb(input: $input, condition: $condition) {
      id
      name
      zeit
      anztreffer
      anzfehler
      punkte
      createdAt
      updatedAt
    }
  }
`;
export const updateScoredb = /* GraphQL */ `
  mutation UpdateScoredb(
    $input: UpdateScoredbInput!
    $condition: ModelScoredbConditionInput
  ) {
    updateScoredb(input: $input, condition: $condition) {
      id
      name
      zeit
      anztreffer
      anzfehler
      punkte
      createdAt
      updatedAt
    }
  }
`;
export const deleteScoredb = /* GraphQL */ `
  mutation DeleteScoredb(
    $input: DeleteScoredbInput!
    $condition: ModelScoredbConditionInput
  ) {
    deleteScoredb(input: $input, condition: $condition) {
      id
      name
      zeit
      anztreffer
      anzfehler
      punkte
      createdAt
      updatedAt
    }
  }
`;
