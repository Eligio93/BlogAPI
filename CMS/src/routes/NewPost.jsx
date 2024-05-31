import { useState } from 'react';
import axios from 'axios'

export default function NewPost() {
    const [file, setFile] = useState()
    const [data, setData] = useState({
        title: '',
        description: '',
        body: '',
        author: 'Eligio',
        published: true,
        featured: false
    });


    function handleFile(e) {
        setFile(e.target.files[0])
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('img', file)
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('body', data.body)
        formData.append('author', data.author)
        formData.append('published', data.published)
        formData.append('featured', data.featured)
        try {
            let result = await axios.post('http://localhost:3000/blog/posts/newPost', formData)

        } catch (err) {
            console.log(err)
        }
    }
    function handleCheckbox(e) {
        const { name, checked } = e.target;
        setData(prevData => ({ ...prevData, [name]: checked }))
    }
    function handleTextInput(e) {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData, [name]: value
        }))
    }


    return (
        <form encType='multipart/form-data'>
            <label htmlFor="post-title"> Post Title:
                <input type="text" name='title' id='post-title' value={data.title} onChange={handleTextInput} />
            </label>
            <label htmlFor="post-description">Post Description:
                <input type="text" name='description' id='post-description' value={data.description} onChange={handleTextInput} />
            </label>
            <label htmlFor="post-body">Post Body:
                <input type="text" name='body' id='post-body' value={data.body} onChange={handleTextInput} />
            </label>
            <label htmlFor="img">Upload post Image:
                <input id='img' type="file" name='img' onChange={handleFile} />
            </label>
            <label htmlFor="post-published">Published?
                <input type="checkbox" name="published" id="post-published" checked={data.published} onChange={handleCheckbox} />
            </label>
            <label htmlFor="post-featured">Featured?
                <input type="checkbox" name="featured" id="post-featured" checked={data.featured} onChange={handleCheckbox} />
            </label>
            <button onClick={handleSubmit}>Submit</button>
        </form>
    )
}