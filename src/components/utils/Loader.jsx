import "../../styles/css/loader.css";

const Loader = ({ className }) => {
    return (
        <div className={`loader_wrapper ${className}`}>
            <div className="loader"></div>
        </div>
    );
}

export default Loader;