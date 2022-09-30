import { gql } from "@apollo/client";

export const GET_MY_REVIEWS = gql`
  query GetMyReviews($reviewBy:Bytes) {
    reviews (where:{reviewBy:$reviewBy})
    {
    id
    reviewBy {
      id
    }
      domainAddress
      siteSafety
      siteType
      siteURL
      category
      siteTag
      metaDataUri
  }
}`