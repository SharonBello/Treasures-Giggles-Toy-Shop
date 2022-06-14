import React from "react";
import { connect } from "react-redux";
import { loadReviews } from "../store/actions/review.action.js";
import { ReviewList } from "../cmps/review-list.jsx";
import { toyReducer } from "../store/reducers/toy.reducer.js";

export class _UserDetails extends React.Component{
    state = {
        reviews: []
    }

    async componentDidMount(){
        let user = this.props.user
        
        let reviews = await this.props.loadReviews({user:user._id})
        this.setState({reviews})
    }

    render(){
        const {user, reviews} = this.props
        console.log('USER DETAILS PROPS:',this.props)
        // if(!toy) return(
    
        //     <h1>Loading</h1>
        // )

        return (
            <section className="user-details">
                {/* <h1>{reviews.toy.name}</h1> */}
                <ReviewList reviews={reviews}/>
            </section>
        )
    }
}

const mapStateToProps = (storeState) => {
    return {
        user: storeState.userModule.user,
        reviews: storeState.reviewModule.reviews,
        toy: storeState.toyModule.toy
    }
}

const mapDispatchToProps = {
    loadReviews
}

export const UserDetails = connect(
    mapStateToProps,
    mapDispatchToProps
)(_UserDetails)