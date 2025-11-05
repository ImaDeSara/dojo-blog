import { useState } from 'react';
import BlogList from './BlogList';
import useFetch from './useFetch';

const Home  = () => { 
    const [name, setName] = useState('mario');
    const [age, setAge] = useState(25);
    const [count, setCount] = useState(0);
    const items = ['Apple', 'Banana', 'Orange'];
    const { data: blogs, isPending, error } = useFetch('http://localhost:8000/blogs');

    const handleClick = (e) => {
        setName('luigi');
        setAge(30); 
    } 
    
    const handleClickAgain = (name, e) => {
        console.log('hello ' + name, e.target);
    } 

    return (
        <div className="home">
            {/* <h2> Homepage </h2>
            <p> { name } is { age } years old </p>
            <button onClick={ handleClick }> Click me</button>

            <button onClick={ (e) => handleClickAgain('mario', e) }> Click me again</button>
         */}
            { error && <div> { error } </div>}
            { isPending && <div> Loading...</div>} 
            { blogs && <BlogList blogs = { blogs } title="All Blogs"/>} 
            {/* we use AND to first check whether blogs are retrieved first to display them */}
           
            {/* <BlogList blogs = {blogs.filter((blog) => blog.author === "mario")} title="Mario's Blogs" /> */}

            {/* <button onClick={() =>setName('luigi') } >change name</button>
            <p> {name} </p> */}

            {/* <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}> Increment </button>
           <ul>
                { items.map( (item, index) => (<li key={index}> {item} </li>) ) }
            </ul> */}

       </div>
    ); 
}

export default Home;