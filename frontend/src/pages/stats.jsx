import React from "react"
import { connect } from 'react-redux'

class _Stats extends React.Component {

    render() {
        // const myLineChart.data.datasets[0].data[2] = 50; // Would update the first dataset's value of 'March' to be 50
        // const myLineChart.update(); // Calling update now animates the position of March from 90 to 50.
        return (
            <div>
                <canvas id="myChart"></canvas>
            </div>

        )
    }
}


const mapStateToProps = (storeState) => {
    return {
        count: storeState.count
    }
}
export const Stats = connect(
    mapStateToProps,
)(_Stats)
