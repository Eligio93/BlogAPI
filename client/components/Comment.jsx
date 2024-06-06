import avatarImg from '../src/img/userAvatar.svg'
import { format } from 'date-fns'

export default function Comment({ message, date, author }) {
    let formatDate = format(date, "dd/MM/yyyy H':'m ")

    return (
        <>
            <div className="comment-info">
                <img src={avatarImg} alt="comment's author avatar" />
                <div className='comment-author'>
                    <p>{author.name}</p>
                    <p className='comment-date'>{formatDate}</p>
                </div>

            </div>
            <p className='comment-message'>{message}</p>
        </>
    )


}