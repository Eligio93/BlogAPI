import LoadingImg from '../src/img/loading.svg'

export default function Loading(){
    return(
        <div className="loading">
            <img src={LoadingImg} alt="loading-spinner" />
            <p>Loading...</p>
        </div>
    )
}