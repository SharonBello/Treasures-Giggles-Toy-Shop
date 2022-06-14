import { useEffect, useState } from "react"
// import { utilService } from '../services/util.service.js'

import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import { useEffectUpdate } from "../hooks/useEffectUpdate"
import FavoriteIcon from '@mui/icons-material/Favorite';
// import { styled } from '@mui/material/styles';

export const RatingValue = ({ handleRatingChange, toy, username }) => {
    const [value, setValue] = useState(0)
    const [isFilled, setIsFilled] = useState(true)
        
    const getStyle = () => {
        return isFilled ? { '& .MuiRatingIconFilled': { color: '#ff8eb0' } } : { '& .MuiRatingIconHover': { color: '#ff004c' } }
    }

    const handleOnChange = (e, username, newValue, toy) => {
        setValue(newValue);
        let rateIndex = toy.rating.findIndex(r => r.username === username);
        if (rateIndex === -1) {
            toy.rating.push({ username: username, rating: newValue });
            } else {
            toy.rating[rateIndex] = { username: username, rating: newValue };
        }
        handleRatingChange(toy);
    }
    const getAvg = (rating) => {
        let avgRating = null  
        if (rating.length>0) {
            let sum = 0;
            rating.forEach(r => sum += r.rating)
            avgRating = (sum / rating.length).toFixed(1)
        }
        return avgRating
    }
    const avgRating = getAvg(toy.rating)
    const rateStyle = getStyle()
    
    return (
        <>
            <Rating
                name="rating"
                value={avgRating}
                getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                precision={0.5}
                icon={<FavoriteIcon fontSize="inherit" />}
                style={rateStyle}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                onChange={(event, newValue) => handleOnChange(event, username, newValue, toy)}
            />
            {avgRating!==undefined && avgRating !== null && <h4><h4>Avg: </h4><span>{avgRating}</span> (<span className="number-rates">{toy.rating.length}</span>)</h4>}
            {!avgRating && avgRating!==0 && <span>no ratings yet</span>}
        </>

    )
}



