import React from 'react'
import { connect } from "react-redux";
import { loadReviews } from '../store/actions/review.action.js';
import { ReviewList } from '../cmps/review-list.jsx';


export class _ReviewsExplore extends React.Component{

    state = {
        reviews:[]
    }

    async componentDidMount(){
        const reviews = await this.props.loadReviews()
        this.setState({reviews})
    }
    render(){
       const {reviews}=this.props
    return <section className="user-details">
        <h2>Review Explore</h2>
        <ReviewList reviews={reviews}/>

    </section>
  }
}

function mapStateToProps(storeState) {
    return {
        reviews: storeState.reviewModule.reviews,
    }
  }
  const mapDispatchToProps = {
  loadReviews
  }
  
  export const ReviewsExplore = connect(mapStateToProps, mapDispatchToProps)(_ReviewsExplore)