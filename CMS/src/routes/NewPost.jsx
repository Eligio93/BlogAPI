import { useState } from 'react';
import axios from 'axios'

export default function NewPost(){
    const[file, setFile]=useState();

    
    function handleFile(e){
      setFile(e.target.files[0])
    }

    async function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('img', file)
        try{
            let result= await axios.post('http://localhost:3000/blog/posts/newPost', formData)

        }catch(err){
            console.log(err)
        }
    }


return(
   <form encType='multipart/form-data'>
    <input type="file" name='img' onChange={handleFile}/>
    <input type="text" name='saluto' />
    <button onClick={handleSubmit}>Submit</button>
   </form>
)
}