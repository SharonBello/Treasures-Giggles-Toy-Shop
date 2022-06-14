import React from "react"
import { connect } from 'react-redux'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { toyService } from "../services/toy.service.js"
import { userService } from "../services/user.service.js"

import { saveToy, loadToy, addToy, setSelected } from "../store/actions/toy.action.js"
import defaultImage from '../assets/img/1.png'
import {utilService} from '../services/util.service';

class _ToyEdit extends React.Component {

    state = {
        toy: this.getEmptyToy(),
        user: userService.getLoggedinUser(),
        selectedOption: []
    }

    componentDidMount() {
        const { toyId } = this.props.match.params
        if (!toyId) return
        toyService.getById(toyId)
            .then(toy => {
                if (!toy) this.onGoBack()
                this.setState({ toy })
            })
    }

    onGoBack = () => {
        this.props.history.push('/toy')
    }

    handleChange = (selectedOption) => {
        this.setState((prevState) => ({
            toy: {
                ...prevState.toy,
                labels: selectedOption.map(option => option.value)
            }
        }))
    }

    onHandleChange = ({ target }) => {
        let field = target.name
        if (field === 'labels') this.setState((prevState) => ({ toy: { ...prevState.toy, [field]: [target.value] } }))
        else if (field === 'price') this.setState((prevState) => ({ toy: { ...prevState.toy, [field]: +target.value } }))
        else this.setState((prevState) => ({ toy: { ...prevState.toy, [field]: target.value } }))
    }

    onHandleSubmit = (ev) => {
        ev.preventDefault()
    }

    onSaveToy = async(ev) => {
        ev.preventDefault()
        if (!this.state.user) return
        const toyToSave = { ...this.state.toy }
        await this.props.addToy(toyToSave)
        this.onGoBack()        
    }

    // onSaveToy = (ev) => {
    //     ev.preventDefault()
    //     if (!this.state.user) return
    //     const toyToSave = { ...this.state.toy }
    //     this.props.addToy(toyToSave)
    //         .then(() => {
    //             this.onGoBack()
    //         })
    // }


    getEmptyToy() {
        return {
            name: '',
            price: 0,
            labels: [],
            createdAt: Date.now(),
            review: 'Best ever',
            inStock: true,
            img: '',
            rate: [],
            // description: utilService.makeLorem()
        }
    }

    render() {
        const { toy, selectedOption } = this.state
        if (!toy) return <div>Loading...</div>
        const options = [
            { value: 'on wheels', label: 'On wheels' },
            { value: 'box game', label: 'Box game' },
            { value: 'art', label: 'Art' },
            { value: 'baby', label: 'Baby' },
            { value: 'doll', label: 'Doll' },
            { value: 'puzzle', label: 'Puzzle' },
            { value: 'outdoor', label: 'Outdoor' },
        ]
        const currToyLabels = toy.labels.map(label => {
            return { value: label, label: label.charAt(0).toUpperCase() + label.slice(1) }
        })

        return (
            <section>
                <form className="toy-edit-form flex flex-column" onSubmit={this.onSaveToy}>
                    <label htmlFor="toy-name"><h3>Name:</h3></label>
                    <input type="text" name="name" value={toy.name} id="toy-name" onChange={this.onHandleChange} required />

                    <label htmlFor="toy-ctg"><h3>Price:</h3></label>
                    <input autoComplete="false" name="price" type="number"
                        id='toy-price' onChange={this.onHandleChange} value={toy.price} onClick={(ev) => ev.target.value = ''} />
                        {/* id='toy-price' onChange={this.onHandleChange} placeholder={toy.price} onClick={(ev) => ev.target.value = ''} /> */}

                    <label htmlFor="toy-lbl"><h3>Labels:</h3></label>
                    <Select
                        components={makeAnimated()}
                        onChange={this.handleChange}
                        options={options}
                        placeholder='Select Toy Type'
                        isMulti
                        autoFocus
                        isSearchable
                        value={currToyLabels}
                    />
                    <div><button>Save Changes</button> <button onClick={this.onGoBack}>Back</button></div>
                </form>
            </section>
        )
    }
}


const mapStateToProps = (storeState) => {
    return {
        user: storeState.userModule.user,
        toys: storeState.toyModule.toys,
        selectedOption: storeState.toyModule.selectedOption
    }
}

const mapDispatchToProps = {
    // addActivity,
    saveToy,
    loadToy,
    addToy,
    setSelected
}

export const ToyEdit = connect(
    mapStateToProps,
    mapDispatchToProps
)(_ToyEdit)