import { useState } from "react";
// import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const[ title, setTitle ] = useState('');
    const[ body, setBody ] = useState('');
    const[ author, setAuthor ] = useState('mario');
    const[ isPending, setIsPending ] = useState(false);
    // const history = useHistory();
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault(); //stops page from refreshing when button is clicked
        const blog = { title, body, author };
        console.log(blog);

        setIsPending(true);

        setTimeout(() => { 
            fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(blog)
            }).then( () => {
                console.log('new blog added');        
                setIsPending(false);
            })
            //history.go(-1); //go back the previous page that you were in
           // history.go(1); //go forward
           //history.push("/");
            navigate("/");
        }, 1000) //I set a 1second timeout so that I could see the submit button changes when isPending changes its boolean value
    }

    return (
        <div className = "create">
            <h2> Add a New Blog</h2>
            <form onSubmit = { handleSubmit } >
                <label> Blog title: </label>
                <input type= "text"
                        reuired 
                        value= { title }
                        onChange={ (e) => setTitle(e.target.value) }
                >
                </input>
                <label> Blog body: </label>
                <textarea
                type= "text"
                        reuired 
                        value= { body }
                        onChange={ (e) => setBody(e.target.value) }
                >
                </textarea>
                <label> Blog author: </label>
                <select
                value = { author }
                onChange={ (e) => setAuthor(e.target.value) }
                >
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                { !isPending && <button> Add blog </button> }
                { isPending && <button disabled> Adding blog... </button> }
                <p> { title } </p>
                <p> { body } </p>
                <p> { author } </p>
            </form>
        </div>
    );
}

export default Create;