import "../styles/css/infBanner.css";

export const capitalize = str => str[0].toUpperCase() + str.substring(1)

const Banner = ({ children }) => {
    return (
        <div className="inf_banner">
            <div className="wrapper">
                {
                    [...Array(6)].map((e, i) => (
                        <section key={"banner-count-" + i}>
                            { children }
                        </section>
                    ))
                }
            </div>
        </div>
    );
};
  
export default Banner;