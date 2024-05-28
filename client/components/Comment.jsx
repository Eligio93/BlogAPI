import avatarImg from '../src/img/userAvatar.svg'

export default function Comment({ message, date, author }) {
    return (
        <>
            <div className="comment-author">
                <img src={avatarImg} alt="comment's author avatar" />
                <p>{author.name}</p>
                <p>{date}</p>
            </div>
            <p className='comment-message'>{message}</p>
        </>
    )


}