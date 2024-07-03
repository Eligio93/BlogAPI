import githubIcon from '../img/githubIcon.svg'
import mailIcon from '../img/mailIcon.svg'

function About() {
    return (
        <div className="about">
            <h2>Thanks for visiting my blog</h2>
            <p>The goal of this project was to build a full stack web application where each user could authenticate and leave comments under each post.</p>
            <p>Another site is dedicated to the managerial part of the posts and comments, where they can be created, modified, and deleted.<br></br>
            </p>
            <a className='cms-link' href="https://cms-ec-blogapi.netlify.app/login" target="_blank" rel="noopener noreferrer">Go To CMS WEBSITE</a>
            <h2>Contacts</h2>
            <div className="contact">
                <a href="https://github.com/Eligio93/BlogAPI" target="_blank" rel="noopener noreferrer">
                <img src={githubIcon} alt="" />
                Github
                </a>
            </div>
            <div className="contact">
                <a href="mailto:eligio.cristantielli@gmail.com">
                    <img src={mailIcon} alt="" />
                    Mail Me
                </a>
            </div>
        </div>
    )

}

export default About