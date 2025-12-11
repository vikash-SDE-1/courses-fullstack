import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import './Courses.css';

export default function Courses() {
    const [data, setData] = useState([]);

  
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

  
    useEffect(() => {
        fetch('http://localhost:3000/courses')
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((e) => console.log(e));
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:3000/courses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, description }),
        })
            .then((res) => res.json())
            .then((newCourse) => {
                alert("Course Added!");

          
                setData([...data, newCourse.course]);

                setTitle("");
                setDescription("");
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
           
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Course Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <textarea
                    placeholder="Course Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <br />
                <button type="submit">Add Course</button>
            </form>

            <hr />

   
            <div className="cardelements">
                {data.map((d, index) => (
                    <CourseCard
                        key={index}
                        title={d.title}
                        description={d.description}
                    />
                ))}
            </div>
        </>
    );
}
