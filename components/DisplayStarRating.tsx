'use client';
import { StarRating } from 'react-flexible-star-rating';

type Props = {
  rating: number;
};

export default function DisplayStarRating(props: Props) {
  return (
    <StarRating
      dimension={5}
      initialRating={props.rating}
      isHalfRatingEnabled
      isReadOnly
      color="#ff8c00"
    />
  );
}
