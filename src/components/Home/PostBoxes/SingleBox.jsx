import { Card } from '@mui/material';
import { CardHeader } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import {Grid, Button, CardActionArea, CardActions } from '@mui/material';



export default function SingleBox(reviews) {

    let navigate = useNavigate()
   
    return (
        
        <Card className='single-review-box' variant="outlined" >
        <CardActionArea   sx={{height: "100%"}}  onClick={() => {
        navigate(`/post/${reviews.id}`, {
                
            state:{ reviews
            }
        
        }
        );
        

        }}>

        <CardMedia
        className='cardmedia'
        component="img"
        height="250"
        src={reviews.cover}
        alt={reviews.cover}
        
        />
    <CardContent >

    <Typography className="card-title" variant="h4" component="div" fontFamily={"'Raleway', sans-serif"}>
   {reviews.title}
  </Typography>
  <Typography variant="body2" color="text.secondary" >
  <div dangerouslySetInnerHTML={{ __html: reviews.content.slice(0, 150) + "..."}}/>
  </Typography>
    </CardContent>
    </CardActionArea>
        </Card>


    )
}
