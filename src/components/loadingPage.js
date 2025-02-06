import Spinner from "./spinner";

export default function LoadingPage() {
  return (
    <div className="d-flex flex-fill justify-content-center align-self-center">
      <Spinner />
    </div>
  );
}
