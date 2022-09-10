/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMyReviews
// ====================================================

export interface GetMyReviews_reviews_reviewBy {
  __typename: "User";
  id: string;
}

export interface GetMyReviews_reviews {
  __typename: "Review";
  id: string;
  reviewBy: GetMyReviews_reviews_reviewBy;
  domainAddress: string;
  siteSafety: string;
  siteType: string;
  siteURL: string;
  category: string;
  siteTag: string;
  metaDataUri: string;
}

export interface GetMyReviews {
  reviews: GetMyReviews_reviews[];
}

export interface GetMyReviewsVariables {
  reviewBy?: any | null;
}
