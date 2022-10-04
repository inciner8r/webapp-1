import { gql } from "@apollo/client";

export const GET_ALL_REVIEWS = gql`
  query GetAllReviews {
    reviews
    {
    id
    reviewBy {
      id
    }
      domainAddress
      siteURL
      category
      siteTag
      metaDataUri
      createdAt
  }
}`