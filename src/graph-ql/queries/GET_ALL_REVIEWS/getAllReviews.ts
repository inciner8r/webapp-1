import { gql } from "@apollo/client";

export const GET_ALL_REVIEWS = gql`
  query GetAllReviews($filter:Bytes, $siteType_contains:Bytes) {
    reviews (where:{domainAddress_contains_nocase:$filter, siteType_contains:$siteType_contains})
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
      siteType
  }
}`