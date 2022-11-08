/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllReviews
// ====================================================

export interface GetAllReviews_reviews_reviewBy {
  __typename: "User";
  id: string;
}

export interface GetAllReviews_reviews {
  __typename: "Review";
  id: string;
  reviewBy: GetAllReviews_reviews_reviewBy;
  domainAddress: string;
  siteURL: string;
  category: string;
  siteTag: string;
  metaDataUri: string;
  createdAt: any;
}

export interface GetAllReviews {
  reviews: GetAllReviews_reviews[];
}
