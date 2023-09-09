import ContentLoader from "react-content-loader";

const CardLoader = ({ speed = 2, width = 1000, height = 600 }) => {
  let viewbox = `0 0 ${width} ${height}`;
  return (
    <div className="card-loader-container">
      <ContentLoader
        speed={speed}
        width={width}
        height={height}
        viewBox={viewbox}
        backgroundColor="#ecebeb"
        foregroundColor="#d6d2d2"
      >
        <rect x="0" y="20" rx="20" ry="20" width={width} height={height} />
      </ContentLoader>
    </div>
  );
};

export default CardLoader;
