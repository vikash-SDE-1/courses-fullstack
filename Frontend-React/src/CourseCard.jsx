import { useState } from 'react';
import './CourseCard.css'
export default function CourseCard(props)
{
  const [enrolled, setEnrolled] = useState(false);

    const handleEnroll = () => {
        setEnrolled(true);
    };

    return(
        <div className="card">
          <div className='cardElements'>
             <h2>{props.title}</h2>
           <h4>{props.description}</h4>
           
            {!enrolled ? (
                    <button onClick={handleEnroll}>Enroll Now!</button>
                ) : (
                    <p style={{ color: "green", fontWeight: "bold" }}>Enrolled ✔</p>
                )}
          </div>
        </div>
    )
}