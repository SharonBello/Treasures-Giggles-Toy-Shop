import React from "react"
import { connect } from 'react-redux'
// import home_page from "../assets/img/home_page.jpg"
console.log('in home page')

class _HomePage extends React.Component {

    render() {
        return (
            <section> 
                {/* <img className="homepage-container" src={home_page} /> */}
            </section >
        )
    }
}


const mapStateToProps = (storeState) => {
    return {
        count: storeState.count
    }
}
export const HomePage = connect(
    mapStateToProps,
)(_HomePage)
