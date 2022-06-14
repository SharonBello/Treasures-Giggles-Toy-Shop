
import React from "react"
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { userService } from "../services/user.service.js"
import { toyService } from "../services/toy.service.js"
import { ToyList } from "../cmps/toy-list.jsx";
import { ToyFilter } from "../cmps/toy-filter.jsx";
import { loadToy, removeToy, setFilter, saveToy } from '../store/actions/toy.action.js'
import AddCircleIcon from '@mui/icons-material/AddCircle';

class _ToyApp extends React.Component {

    state = {
        user: userService.getLoggedinUser(),
        pageSize: 4,
        filter: {
            labels: []
        },
    }


    componentDidMount() {
        this.props.loadToy()
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.filterBy) !== JSON.stringify(this.props.filterBy)) {
            this.props.loadToy(this.props.filterBy)
        }
    }

    onRemoveToy = (toyId) => {
        this.props.removeToy(toyId)
    }

    onChangePage = async (diff) => {
        let { filterBy } = this.props
        const numOfPages = await toyService.getNumOfPages()

        const pageIdx = +filterBy.pageIdx + diff
        if (pageIdx < 0 || pageIdx >= numOfPages) return
        filterBy = { ...filterBy, pageIdx }
        this.props.setFilter(filterBy)
    }

    onHandleChange = (name, value) => {

        const field = name
        let { filterBy } = this.props
        if (field === 'labels') value = [value]
        filterBy = { ...filterBy, [field]: value }
        this.props.setFilter(filterBy)
    }

    onInputHandleChange = ({target}) => {
    const field = target.name
    let { value } = target
    let { filterBy } = this.props
    if (field === 'labels') value = [target.value]
    filterBy = { ...filterBy, [field]: value }
    this.props.setFilter(filterBy)
        }


    handleChangeLabels = (labels) => {

        let { filterBy } = this.props
        const labelsToys = labels.value
        filterBy = { ...filterBy, labels: labelsToys }
        this.setState(prevState => ({ ...prevState, filter: { ...this.state.filter, labels } }), () => this.props.setFilter(filterBy))
    }

    handleRatingChange = (toy) => {
        toyService.saveUserRating(toy)
    }

    render() {
        const { toys, filterBy } = this.props
        const { user } = this.state
        return (
            <section className="toy-app-container">
                <ToyFilter filterBy={filterBy} onHandleChange={this.onHandleChange} onChangePage={this.onChangePage} handleChangeLabels={this.handleChangeLabels} onInputHandleChange={this.onInputHandleChange} labels={this.state.filter.labels} />
                <Link to="/toy/edit"><button className="toy-btn-add tooltip filter-box">
                    <span className="tooltiptext">{(!user) ? 'Need to login' : ''}</span ><AddCircleIcon  className="add-toy"/><p className="add-toy">Add Toy</p></button></Link>
                {(!toys || !user) ? <h1>Loading</h1> : <ToyList toys={toys} onRemoveToy={this.onRemoveToy} handleRatingChange={this.handleRatingChange} username={user.username} />}
            </section>
        )
    }
}

const mapStateToProps = (storeState) => {
    return {
        toys: storeState.toyModule.toys,
        filterBy: storeState.toyModule.filterBy
    }
}

const mapDispatchToProps = {
    loadToy,
    removeToy,
    setFilter,
    saveToy
}

export const ToyApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(_ToyApp)


