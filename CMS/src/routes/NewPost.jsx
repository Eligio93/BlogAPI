import { useState } from 'react';
import axios from 'axios'
import { useContext } from 'react';
import { AuthContext } from '../../components/AuthContext';
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from 'react-router-dom';



export default function NewPost() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState()
    const [data, setData] = useState({
        title: '',
        description: '',
        body: '',
        author: 'Eligio',
        published: true,
        featured: false
    });

    //handle the loading file
    function handleFile(e) {
        setFile(e.target.files[0])
    }


    //handle form Submit
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
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
            if (result.status === 200) {
                setSuccess(result.data.message)
                setTimeout(() => {
                    navigate('/')
                }, 2000)
            }
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    //handle checkboxes
    function handleCheckbox(e) {
        const { name, checked } = e.target;
        setData(prevData => ({ ...prevData, [name]: checked }))
    }

    //handle Post Description Input
    function handleTextInput(e) {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData, [name]: value
        }))
    }

    if (loading) {
        return <p>Loading...</p>
    }
    return (
        <>
            {success ? (<p>{success}</p>) : (
                <form encType='multipart/form-data' className='form' onSubmit={handleSubmit}>
                    {error && <p>{error}</p>}
                    <label htmlFor="post-title"> Post Title:
                        <input type="text" name='title' id='post-title' value={data.title} onChange={handleTextInput} />
                    </label>
                    <label htmlFor="post-description">Post Description:
                        <textarea type="text" name='description' id='post-description' value={data.description} onChange={handleTextInput} />
                    </label>
                    <label htmlFor="post-body">Post Body:
                        <Editor
                            name='body'
                            id='post-body'
                            apiKey={import.meta.env.VITE_TINY_MCE_API}
                            value={data.body}
                            onInit={(_evt, editor) => editorRef.current = editor}
                            // initialValue={data.body}
                            onEditorChange={(newValue, editorRef) => {
                                setData((prevData) => ({
                                    ...prevData, body: editorRef.getContent({ format: 'text' })
                                }))
                            }}
                            init={{
                                height: 300,
                                menubar: false,
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo |' +
                                    'bold italic forecolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                        />
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
                    <button type='submit'>Submit</button>
                </form>
            )}

        </>

    )


}