import { Link } from 'react-router-dom'
import React from 'react'
import { RatingValue } from './toy-rating.jsx'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonGroup from '@mui/material/ButtonGroup';
import EditIcon from '@mui/icons-material/Edit';
import RateReviewIcon from '@mui/icons-material/RateReview';

export const ToyPreview = ({ toy, onRemoveToy, handleRatingChange, username }) => {
      
    return (
        <li className="toy-preview">
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        // image={`../assets/img/${toy.label[0]}.jpg`}
                        image={require(`../assets/img/${toy.labels[0]}.jpg`)}
                        alt="toys"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {toy.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <b>Description:</b><br></br>
                            {/* {toy.description} */}
                        </Typography><br></br>
                        <Typography variant="body1" >
                            <b>Price: $</b>{toy.price}
                        </Typography>
                        <Typography variant="body1">
                            <b>Type: </b><span>{toy.labels.map((label, idx) => {
                                return (idx === toy.labels.length - 1) ? label : label + ', '
                            })}</span>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Stack direction="row" spacing={2}>
                        <ButtonGroup color="secondary" aria-label="medium secondary button group">
                            <Button onClick={() => onRemoveToy(toy._id)} variant="outlined" startIcon={<DeleteIcon />}>
                                Delete
                            </Button>

                            <Link to={`/toy/edit/${toy._id}`}><Button variant="contained" startIcon={<EditIcon />}>
                                Edit
                            </Button>
                            </Link>
                        </ButtonGroup>
                        <ButtonGroup color="secondary" aria-label="medium secondary button group">
                            <Link to={`/toy/${toy._id}`}><Button size="small" color="primary">
                                Details
                            </Button>
                            </Link>
                            <Link to={`/toy/${toy._id}`}><Button variant="contained" startIcon={<RateReviewIcon />}>
                                Review
                            </Button>
                            </Link>
                        </ButtonGroup>
                    </Stack>
                </CardActions>
                <Stack spacing={2}>
                <RatingValue handleRatingChange={handleRatingChange} toy={toy} username={username} />
                </Stack>
            </Card>
        </li>
    )
}
