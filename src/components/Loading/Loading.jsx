import "./Loading.css";
import { Spinner } from "react-bootstrap";

function Loading({ message }) {
  return (
    <div className="overlay">
      <span className="loading-text">{message}</span>
      <Spinner
        animation="grow"
        style={{ width: "4rem", height: "4rem" }}
        variant="warning"
      />
    </div>
  );
}

export default Loading;
