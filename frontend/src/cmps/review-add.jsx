import React from "react";
import { connect } from "react-redux";
import {addReview} from '../store/actions/review.action.js'

export class _ReviewAdd extends React.Component{
    state = {
        review: {
            // userId: '',
            toyId: '',
            content: '',
        }
    }
    componentDidMount = () => {
        const { user, toy } = this.props
        let userId = ''
        if (user) userId = user._id
        const toyId = toy._id
        this.setState(prevState => ({ ...prevState, review: { ...prevState.review, toyId } }))
    }

    handleChange = ({target}) => {
        this.setState((prevState) => ({...prevState, review: {...prevState.review, content: target.value}}))
    }

    onAddReview = (review) => {
        this.props.addReview(review)
        console.log('review-add.jsx onAddReview:', review)
    }

    render(){
        const {user} = this.props
        const {review} = this.state
        return(
            <section className="add-review">
                {(user) ? 
                <form className="add-review-form"
                    onSubmit={(ev) => {ev.preventDefault(); this.onAddReview(review)}}>
                    <textarea 
                        id="content"
                        name="content"
                        rows={7}
                        value={review.content}
                        onChange={this.handleChange}
                    /> 
                    <button>Send</button>
                    </form> : <h2>Plaese login to comment</h2>}
            </section>
        )
    }
}

const mapStateToProps = (storeState) => {
    return {
        toys: storeState.toyModule.toys,
        user: storeState.userModule.user,
        review: storeState.reviewModule.reviews
    }
}

const mapDispatchToProps = {
    addReview,
}

export const ReviewAdd = connect(
    mapStateToProps,
    mapDispatchToProps
)(_ReviewAdd)