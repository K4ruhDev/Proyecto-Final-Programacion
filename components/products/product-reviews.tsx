import { Star } from "lucide-react"
import type { Review } from "@/lib/types"

interface ProductReviewsProps {
  reviews: Review[]
}

export default function ProductReviews({ reviews }: ProductReviewsProps) {
  // Calculate average rating
  const averageRating =
    reviews.length > 0 ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length : 0

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-5 w-5 ${
                star <= Math.round(averageRating) ? "fill-primary-500 text-primary-500" : "text-muted-foreground"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          {averageRating.toFixed(1)} de 5 ({reviews.length} reseñas)
        </span>
      </div>

      {reviews.map((review) => (
        <div key={review.id} className="pb-4 border-b border-primary-100">
          <div className="flex justify-between mb-1">
            <div className="font-medium">{review.name}</div>
            <div className="text-sm text-muted-foreground">{review.date}</div>
          </div>
          <div className="flex mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= review.rating ? "fill-primary-500 text-primary-500" : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">{review.comment}</p>
        </div>
      ))}
    </div>
  )
}
