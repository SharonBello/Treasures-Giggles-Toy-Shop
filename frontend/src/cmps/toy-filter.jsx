import React from "react"
import { useSelector} from 'react-redux'
import { Doll } from '../services/svg.service.js'
import ExtensionIcon from '@mui/icons-material/Extension';
import ToysIcon from '@mui/icons-material/Toys';
import CasinoIcon from '@mui/icons-material/Casino';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import BrushIcon from '@mui/icons-material/Brush';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';


export const ToyFilter = (props) => {
    const {filterBy} = useSelector((storeState) => storeState.toyModule)
    
    

        return (
            <div className="toy-filter-container">
                <div className="toy-fields-container">
                    <div className="toy-label-filter">
                        <div className="labels-container">
                        <button onClick={() => props.handleChangeLabels('on wheels')} className="filter-onWheel filter-box" name="On Wheels">
                            <ToysIcon />
                            <p>On Wheels</p>
                        </button>
                        <button onClick={() => props.handleChangeLabels('box game')} className="filter-boxGame filter-box" name="Board Game">
                            <CasinoIcon />
                            <p>Board Game</p>
                        </button>
                        <button onClick={() => props.handleChangeLabels('art')} className="filter-art filter-box" name="Art">
                            <BrushIcon />
                            <p>Art</p>
                        </button>
                        <button onClick={() => props.handleChangeLabels('baby')} className="filter-baby filter-box" name="Baby">
                            <ChildFriendlyIcon />
                            <p>Baby</p>
                        </button>
                        <button onClick={() => props.handleChangeLabels('doll')} className="filter-doll filter-box" name="Doll">
                            <Doll />
                            <p>Doll</p>
                        </button>
                        <button onClick={() => props.handleChangeLabels('puzzle')} className="filter-puzzle filter-box" name="Puzzle">
                            <ExtensionIcon />
                            <p>Puzzle</p>
                        </button>
                        <button onClick={() => props.handleChangeLabels('outdoor')} className="filter-outdoor filter-box" name="Outdoor">
                            <SportsSoccerIcon />
                            <p>Outdoor</p>
                        </button>
                        </div>
                        <div className="action-btn-container">
                        <button onClick={() => props.onHandleChange('inStock',true)} className="filter-instock filter-box" >
                            <AssignmentTurnedInIcon />
                            <p>In stock</p>
                        </button>

                        <button onClick={() => props.onHandleChange('inStock',false)} className="filter-outofstock filter-box" >
                            <ReportGmailerrorredIcon />
                            <p>Out of Stock</p>
                        </button>

                        <button onClick={() => props.onHandleChange('sortBy','name')} className="sortby-name filter-box">
                            <SortByAlphaIcon />
                            <p>By Name</p>
                        </button>

                        <button onClick={() => props.onHandleChange('sortBy','price')} className="sortby-price filter-box">
                            <AttachMoneyIcon />
                            <p>By Price</p>
                        </button>

                        <button onClick={() => props.onHandleChange('sortBy','recent')} className="sortby-date filter-box">
                            <CalendarTodayIcon />
                            <p>By Date</p>
                        </button>
                        <div className="toy-filter-search-container filter-box">
                            <input className="search-filter" name="txt" type="search" placeholder="Search..." value={filterBy.txt} onChange={props.onInputHandleChange} />
                        </div>
                        <div className="pagings filter-box">
                            <div><label htmlFor='by-pageIdx'>Choose Page</label></div>
                            <div>(<h3 style={{ display: 'inline' }}>
                                -{+(+filterBy.pageIdx + 1)}-
                            </h3>
                                )
                                <div className="pagings-up-down">
                                    <div className="btn-page" onClick={() => props.onChangePage(-1)}><IndeterminateCheckBoxIcon /></div>
                                    <div className="btn-page" onClick={() => props.onChangePage(1)}><AddBoxIcon /></div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


// const mapStateToProps = (storeState) => {
//     return {
//         toys: storeState.toyModule.toys,
//         filterBy: storeState.toyModule.filterBy
//     }
// }

// const mapDispatchToProps = {
//     setFilter,
// }

// export const ToyFilter = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(_ToyFilter)