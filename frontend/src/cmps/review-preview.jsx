export function ReviewPreview({ review, onRemoveReview, user }) {
    if(!review.user) return(
        <h1>Loading</h1>
    )
    
    return (
        <div className="review-card">
            <h1>Name: {review.user.fullname}</h1>
            <h3>Comment: {review.content}</h3>
            <h3>toy: {review.toy.name}</h3>
            {/* {user && (user._id === review.userId || user.isAdmin) &&
                <button onClick={() => { onRemoveReview(review._id) }} className="review-trash-btn"></button>
            } */}
        </div>
    )
}