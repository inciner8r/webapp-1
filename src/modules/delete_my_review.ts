// /home/adimis/Desktop/Netsepio/webapp/src/graphql/delete_my_review.ts
import { client } from '../graphql/client';
import { DELETE_REVIEW } from '../graphql/queries';

export async function deleteMyReview(reviewId: string): Promise<boolean> {
  try {
    await client.mutate({
      mutation: DELETE_REVIEW,
      variables: {
        id: reviewId,
      },
    });
    console.log('Review deleted:', reviewId);
    return true;
  } catch (error) {
    console.error('Error deleting review:', error);
    return false;
  }
}
