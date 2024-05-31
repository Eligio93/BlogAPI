import { useState } from "react";
import Comment from "./Comment";
import { Link } from "react-router-dom";


export default function CommentBox({ comments, user, handleComment }) {
    const [message, setMessage] = useState('')

    function handleMessage(e) {
        setMessage(e.target.value)
    }

    return (
        <div className="comment-box">
            <h2>Comments</h2>
            {comments && comments.length > 0 ? (
                <ul className="comment-list">
                    {comments.map((comment) =>
                        <li className="comment" key={comment._id}>
                            <Comment
                                message={comment.message}
                                date={comment.date}
                                author={comment.author}
                            />
                        </li>
                    )}
                </ul>

            ) : (
                <p>There's no comments for this post</p>
            )}
            {user &&
                <form>
                    <textarea name="comment-input" id="comment-input" onChange={handleMessage} value={message}></textarea>
                    <button className='comment-btn' onClick={(e) => { handleComment(e, message); setMessage('') }}>Comment</button>
                </form>
            }
            {!user && <Link to='/login' className="comment-btn">Login to comment</Link>}
        </div>
    )
}