import { DocumentNode, gql } from "@apollo/client";

export const GET_FOOD_ITEMS: DocumentNode = gql`
  query GetItems($params: GetItemsParams!) {
    getItems(params: $params) {
      ... on Items {
        items {
          id
          name
          category
          baseSizeUnit
          servingSizeUnit
        }
      }
    }
  }
`;
