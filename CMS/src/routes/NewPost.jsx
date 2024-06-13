import { useState } from 'react';
import axios from 'axios'
import { useContext } from 'react';
import { AuthContext } from '../../components/AuthContext';
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';



export default function NewPost() {
    const {user} = useContext(AuthContext);
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


    // starting importing the editor
    const editorRef = useRef(null);
    const log = () => {
      if (editorRef.current) {
        console.log(editorRef.current.getContent());
      }
    };


    return (
        <>
        <form encType='multipart/form-data' className='form' onSubmit={handleSubmit}>
        <label htmlFor="post-title"> Post Title:
            <input type="text" name='title' id='post-title' value={data.title} onChange={handleTextInput} />
        </label>
        <label htmlFor="post-description">Post Description:
            <input type="text" name='description' id='post-description' value={data.description} onChange={handleTextInput} />
        </label>
        <label htmlFor="post-body">Post Body:
            {/* <input type="text" name='body' id='post-body' value={data.body} onChange={handleTextInput} /> */}
            <Editor
        name='body' 
        id='post-body'
        apiKey={import.meta.env.VITE_TINY_MCE_API}
        value={data.body}
        onInit={(_evt, editor) => editorRef.current = editor}
        initialValue="Type here the body of your article"
        // onEditorChange={(newValue, editor) =>   setData((prevData) => ({
        //     ...prevData, [this.name]: newValue
        // }))}
        init={{
          height: 300,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
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

    </>
    
)
        
    
}