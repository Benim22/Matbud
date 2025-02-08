import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface ReviewFormProps {
  restaurantId: string;
  orderId: string;
  onSubmit: (review: {
    rating: number;
    comment: string;
    restaurantId: string;
    orderId: string;
  }) => Promise<void>;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ restaurantId, orderId, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        rating,
        comment,
        restaurantId,
        orderId,
      });
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Failed to submit review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ditt betyg
        </label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              onMouseEnter={() => setHoveredRating(value)}
              onMouseLeave={() => setHoveredRating(0)}
              className="focus:outline-none"
            >
              <Star
                className={`w-8 h-8 ${
                  value <= (hoveredRating || rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                } transition-colors`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
          Din recension
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
          placeholder="Berätta om din upplevelse..."
        />
      </div>

      <button
        type="submit"
        disabled={rating === 0 || isSubmitting}
        className={`w-full py-2 px-4 rounded-md text-white font-medium
          ${rating === 0
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-orange-500 hover:bg-orange-600'
          } transition-colors`}
      >
        {isSubmitting ? 'Skickar...' : 'Skicka recension'}
      </button>
    </form>
  );
};

export default ReviewForm;