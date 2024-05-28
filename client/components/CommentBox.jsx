import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import Comment from "./Comment";


export default function CommentBox({ comments, user, handleComment }) {
    const [message, setMessage] = useState('')

    function handleMessage(e) {
        setMessage(e.target.value)
    }

    return (
        <div className="comment-box">
            {comments && comments.length > 0 ? (
                <ul>
                    {comments.map((comment) =>
                        <li className="comment">
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
                    <button onClick={(e) => { handleComment(e, message); setMessage('') }}>Comment</button>
                </form>
            }
        </div>
    )
}