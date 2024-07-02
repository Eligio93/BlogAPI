import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function Form({
    handleSubmit,
    handleTextInput,
    handleFile,
    handleCheckbox,
    data,
    disableField,
    handleEditor,
    deleteBtn,
    handleDelete,
    btnName }) {
    const editorRef = useRef(null);
    return (
        <form encType='multipart/form-data' className='form' onSubmit={handleSubmit}>
            <label htmlFor="post-title"> Post Title:
                <input type="text" name='title' id='post-title' value={data.title} onChange={handleTextInput} required />
            </label>
            <label htmlFor="post-description">Post Description:
                <textarea type="text" name='description' id='post-description' value={data.description} onChange={handleTextInput} required />
            </label>
            <label htmlFor="post-body">Post Body:
                <Editor
                    name='body'
                    id='post-body'
                    apiKey={import.meta.env.VITE_TINY_MCE_API}
                    value={data.body_text}
                    required
                    onInit={(_evt, editor) => editorRef.current = editor}
                    onEditorChange={handleEditor}
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
            {!disableField && <label htmlFor="img">Upload post Image:
                <input id='img' type="file" name='img' accept='image/*' onChange={handleFile} hidden={disableField} required />
            </label>}
            <label htmlFor="post-published">Published?
                <input type="checkbox" name="published" id="post-published" checked={data.published} onChange={handleCheckbox} />
            </label>
            <label htmlFor="post-featured">Featured?
                <input type="checkbox" name="featured" id="post-featured" checked={!data.published ? false : data.featured} disabled={!data.published} onChange={handleCheckbox} />
            </label>
            <button type='submit' className='green-btn'>{btnName}</button>
            {deleteBtn && <button onClick={handleDelete} className='red-btn'>Delete Post</button>}
        </form>

    )
}