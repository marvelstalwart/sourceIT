import"./ReactCard.css";
import { Keyboard, Navigation,EffectCoverflow, EffectCards, Pagination, Scrollbar, A11y } from 'swiper';
import SingleCard from "./SingleCard";
import {MdChevronLeft, MdChevronRight} from "react-icons/md";
import { img1, img2, img3, img4 , img5} from "./CardImages";
import Carousel from 'react-multi-carousel';
import "swiper/css/effect-cards";
import 'react-multi-carousel/lib/styles.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// Import Swiper styles
import { useNavigate } from "react-router-dom";
import 'swiper/css';
import "./styles.css";
import "swiper/css/effect-cards";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { CardActionArea } from "@mui/material";
 const ReactCardContainer = () => {
    const slides = [
        
        { image: img1, title:"Vsonet Education", url: "1ZI2k0oflJgCiMGqdhNkSfr944b2"},
        { image: img2, title:"Deloitte Lagos", url: "VijXePOaDLdNoLum9LevPG29W863"},
        { image: img3, title:"Eridan Group", url: "WtmQVnmbq8SF5XzmQxvJyAORDh03"},
        { image: img4, title:"Chevron", url: "b2nPidJdNDfGRq7kVP8isqujv8i1"},
        { image: img5, title:"Alpha Morgan Capital", url: "Z4z7QImXC5Y7bGhSozzmHdEmQp33"},
        
        
    
    ];

    let navigate = useNavigate();
// const responsive = {
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: 3,
//       slidesToSlide: 3 // optional, default to 1.
//     },
//     tablet: {
//       breakpoint: { max: 1024, min: 464 },
//       items: 2,
//       slidesToSlide: 2 // optional, default to 1.
//     },
//     mobile: {
//       breakpoint: { max: 464, min: 0 },
//       items: 1,
//       slidesToSlide: 1 // optional, default to 1.
//     }
//   };

    return (

//       <Swiper
//       effect={"cards"}
//       modules={[ EffectCards, ]}
      
     
//       onSwiper={(swiper) => console.log(swiper)}
//       onSlideChange={() => console.log('slide change')}
//     >


// {slides.map((slides, index)=> {

// return <SwiperSlide>
// <div className="slider-card">
//     <SingleCard {...slides} key={index}/>
// </div></SwiperSlide>
// })}


//new 

<>
<Swiper
       slidesPerView={1}
       centeredSlides={false}
       slidesPerGroupSkip={1}
       grabCursor={true}
       keyboard={{
         enabled: true,
       }}
       breakpoints={{
         769: {
           slidesPerView: 2,
           slidesPerGroup: 2,
         },
       }}
       scrollbar={true}
       navigation={true}
       pagination={{
         clickable: true,
       }}
        modules={[Keyboard, EffectCoverflow, Pagination, Navigation]}
        className="mySwiper"
      >
  
{slides.map((slides, index)=> {

return  <SwiperSlide><CardActionArea onClick={() => {
  navigate(`profile/${slides.url}`)


}

} >
<img  {...slides} src={slides.image} key={index} />
</CardActionArea>
</SwiperSlide>
})}
 
</Swiper>
</>


    //   {/* Slide 1
    //   <SwiperSlide>Slide 2</SwiperSlide>
    //   <SwiperSlide>Slide 3</SwiperSlide>
    //   <SwiperSlide>Slide 4</SwiperSlide>
    //   ... */}
    // </Swiper>
/* <Carousel
  swipeable={false}
  draggable={false}
  showDots={true}
  responsive={responsive}
  ssr={true} // means to render carousel on server-side.
  infinite={true}
  
  autoPlaySpeed={1000}
  keyBoardControl={true}
  customTransition="all .5"
  transitionDuration={500}
  containerClass="carousel-container"
  removeArrowOnDeviceType={["tablet", "mobile"]}
  
  dotListClass="custom-dot-list-style"
  itemClass="carousel-item-padding-40-px"
>
    {slides.map((slides, index)=> {

        return <div className="slider-card">
            <SingleCard {...slides} key={index}/>
        </div>
    })}
</Carousel> */

    )
}
export default ReactCardContainer;