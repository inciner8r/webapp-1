import { client } from '../graphql/client';
import { GET_ALL_REVIEWS, GET_ALL_REVIEWS_BY_USER, GET_REVIEWS_BY_SITE_URL } from '../graphql/queries';
import { ReviewCreated } from '../graphql/types';

export async function fetchMetadataURIByUser(walletAddress: string): Promise<ReviewCreated[] | null> {
  try {
    const { data } = await client.query({
      query: GET_ALL_REVIEWS_BY_USER,
      variables: { userWalletAddress: walletAddress },
    });
    return data.reviewCreateds;
  } catch (error) {
    console.error('Error fetching metadata URI by user:', error);
    return null;
  }
}

export async function fetchMetadataURIAll(): Promise<ReviewCreated[] | null> {
  try {
    const { data } = await client.query({ query: GET_ALL_REVIEWS });
    return data.reviewCreateds;
  } catch (error) {
    console.error('Error fetching all metadata URIs:', error);
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
    console.error('Error fetching metadata URI by site URL:', error);
    return null;
  }
}
