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

export const GET_REVIEWS_BY_SITE_SAFETY = gql`
query GetReviewsBySiteSafety($siteSafety: String!) {
  reviewCreateds(where: {siteSafety: $siteSafety}) {
    id
    tokenId
    domainAddress
    metadataURI
    receiver
  }
}
`;

export const GET_REVIEWS_BY_SITE_TAG = gql`
query GetReviewsBySiteSafety($siteTag: String!) {
  reviewCreateds(where: {siteTag:$siteTag}) {
    id
    tokenId
    domainAddress
    metadataURI
    receiver
  }
}
`;

export const GET_REVIEWS_BY_SITE_TYPE = gql`
query GetReviewsBySiteSafety($siteType: String!) {
  reviewCreateds(where: {siteType:$siteType}) {
    id
    tokenId
    domainAddress
    metadataURI
    receiver
  }
}
`;