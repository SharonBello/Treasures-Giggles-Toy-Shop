import React from "react";
// import { reviewService } from "../services/review.service.js";
import {ReviewPreview} from './review-preview.jsx'

export class ReviewList extends React.Component{
    render() {
        const {reviews, onRemoveReview, user} = this.props
        console.log('reviews', reviews)
        if(!reviews.length) return <p>Be the first to review!</p>

        return (
            <section className="review-list">
                {reviews.map(review => <ReviewPreview key={review._id} review={review} onRemoveReview={onRemoveReview} user={user}/>)}
            </section>
        )
    }
}