import React, { useEffect, useState } from "react"
import { connect, useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
// import { toyService } from "../services/toy.service.js"
// import { userService } from "../services/user.service.js"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadReviews, removeReview } from '../store/actions/review.action.js'
import { removeToy, getById } from "../store/actions/toy.action.js"
import { ReviewAdd, } from "./review-add.jsx"
import { ReviewList } from '../cmps/review-list.jsx'
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

export const ToyDetails = (props) => {

    const { user } = useSelector((storeState) => storeState.userModule)
    // const {toys} = useSelector((storeState) =>  storeState.toyModule)
    const { toy } = useSelector((storeState) => storeState.toyModule)
    const { reviews } = useSelector((storeState) => storeState.reviewModule)
    const dispatch = useDispatch()


    // const [toy, setToy] = useState(null)
    const params = useParams()

    useEffect(() => {
        console.log('params', params)
        dispatch(getById(params.toyId))
        dispatch(loadReviews({ byToyId: params.toyId }))
    })

    // componentDidMount() {
    //     const { toyId } = this.props.match.params
    //     if (toyId) this.props.getById(toyId)

    //     props.loadReviews({byToyId:toyId})
    // }

    const onRemoveToy = (toyId) => {
        dispatch(removeToy(toyId))
        onGoBack()
    }

    const onRemoveReview = async reviewId => {
        await props.removeReview(reviewId)
    }

    const onGoBack = () => {
        props.history.push('/toy')
    }

    // const { toy, reviews, user } = props
    if (!toy) return <div>Loading toy...</div>
    
    return (
        <section className='toy-details'>
            <h3>Details</h3>
            <h4>{toy.name}</h4>
            <p>In stock: <span>{(toy.inStock) ? 'Yes' : 'No'}</span></p>
            <p>Price: <span>{toy.price}</span></p>
            <p>Labels: <span key={toy.labels.map((label, idx) => idx)}>{toy.labels.map((label, idx) => {
                return (idx === toy.labels.length - 1) ? label : label + ', '
            })}</span></p>
            <ReviewAdd toy={toy} />
            <p>Reviews: <span>{toy.review}</span></p>
            <ReviewList toy={toy} reviews={reviews} onRemoveReview={onRemoveReview} user={user} />
            <div>
                <button onClick={() => onRemoveToy(toy._id)}>x</button>
                <Link to={`/toy/edit/${toy._id}`}><button>Edit</button></Link>
                <button onClick={onGoBack}>back</button>
            </div>
        </section>
    )
}



// const mapStateToProps = (storeState) => {
//     return {
//         user: storeState.userModule.user,
//         toys: storeState.toyModule.toys,
//         toy: storeState.toyModule.toy,
//         reviews: storeState.reviewModule.reviews
//     }
// }

// const mapDispatchToProps = {
//     removeToy,
//     getById,
//     loadReviews,
//     removeReview
// }

// export const ToyDetails = connect(mapStateToProps, mapDispatchToProps
// )(_ToyDetails)
