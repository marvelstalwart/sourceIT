import './Card.css';
import  img from "../../../assets/img/Chevron.jpg"

export default function TestCard({imgUrl, body,title }) {
    return (
        <div className='card-container'>
            <div className="image-container">
                <img src={img} alt='image'/>
            </div>
            <div className='card-content'>
            <div className="card-title">
               <h3 style={{textAlign: "center"}}> {title} </h3>
            </div>   
            <div className="card-body">
               <p>{body}</p> 
            </div>
            </div>


            
            <div className="btn">
                <button>
                     <a>
                        Check it out
                     </a>
                </button>
            </div>
        </div>
    )
}
