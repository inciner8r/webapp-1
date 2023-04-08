import { client } from '../graphql/client';
import { GET_ALL_REVIEWS, GET_ALL_REVIEWS_BY_USER, GET_REVIEWS_BY_SITE_URL, GET_REVIEWS_BY_SITE_SAFETY, GET_REVIEWS_BY_SITE_TYPE, GET_REVIEWS_BY_SITE_TAG } from '../graphql/queries';
import { ReviewCreated } from '../graphql/types';

export async function fetchMetadataURIByUser(walletAddress: string): Promise<ReviewCreated[] | null> {
  try {
    const { data } = await client.query({
      query: GET_ALL_REVIEWS_BY_USER,
      variables: { userWalletAddress: walletAddress },
    });
    return data.reviewCreateds;
  } catch (error) {
    return null;
  }
}

export async function fetchMetadataURIAll(): Promise<ReviewCreated[] | null> {
  try {
    const { data } = await client.query({ query: GET_ALL_REVIEWS });
    return data.reviewCreateds;
  } catch (error) {
    return null;
  }
}

export async function fetchMetadataURIBySiteURL(siteURL: string): Promise<ReviewCreated[] | null> {
  try {
    const { data } = await client.query({
      query: GET_REVIEWS_BY_SITE_URL,
      variables: { siteURL },
    });
    return data.reviewCreateds;
  } catch (error) {
    return null;
  }
}

export async function fetchMetadataURIBySiteSafety(siteSafety: string): Promise<ReviewCreated[] | null> {
  try {
    const { data } = await client.query({
      query: GET_REVIEWS_BY_SITE_SAFETY,
      variables: { siteSafety },
    });
    return data.reviewCreateds;
  } catch (error) {
    return null;
  }
}

export async function fetchMetadataURIBySiteType(siteType: string): Promise<ReviewCreated[] | null> {
  try {
    const { data } = await client.query({
      query: GET_REVIEWS_BY_SITE_TYPE,
      variables: { siteType },
    });
    return data.reviewCreateds;
  } catch (error) {
    return null;
  }
}

export async function fetchMetadataURIBySiteTag(siteTag: string): Promise<ReviewCreated[] | null> {
  try {
    const { data } = await client.query({
      query: GET_REVIEWS_BY_SITE_TAG,
      variables: { siteTag },
    });
    return data.reviewCreateds;
  } catch (error) {
    return null;
  }
}