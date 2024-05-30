import { useRouteError , Link } from "react-router-dom";
import ErrorBg from '../img/404bg.jpg'

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" style={{backgroundImage:`url(${ErrorBg})`}}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <br />
      <Link to='/'>Go back Home</Link>
    </div>
  );
}