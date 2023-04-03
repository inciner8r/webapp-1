import { gql } from '@apollo/client';

export const GET_ALL_REVIEWS_BY_USER = gql`
  query GetAllReviewsByUser($userWalletAddress: String!) {
    reviewCreateds(where: {receiver: $userWalletAddress}) {
      id
      tokenId
      domainAddress
      metadataURI
      receiver
    }
  }
`;

export const GET_ALL_REVIEWS = gql`
  query GetAllReviews {
    reviewCreateds {
      id
      tokenId
      domainAddress
      metadataURI
      receiver
    }
  }
`;

export const GET_REVIEWS_BY_SITE_URL = gql`
  query GetReviewsBySiteURL($siteURL: String!) {
    reviewCreateds(where: {domainAddress: $siteURL}) {
      id
      tokenId
      domainAddress
      metadataURI
      receiver
    }
  }
`;