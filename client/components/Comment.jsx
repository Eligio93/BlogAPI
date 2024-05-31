import avatarImg from '../src/img/userAvatar.svg'

export default function Comment({ message, date, author }) {
    return (
        <>
            <div className="comment-info">
                <img src={avatarImg} alt="comment's author avatar" />
                <div className='comment-author'>
                    <p>{author.name}</p>
                    <p className='comment-date'>{date}</p>
                </div>

            </div>
            <p className='comment-message'>{message}</p>
        </>
    )


}