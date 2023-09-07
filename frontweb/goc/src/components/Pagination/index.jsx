// import { ReactComponent as ArrowIconPrevious } from "./../../assets/images/arrow.svg";
import { ReactComponent as ArrowIcon } from "./../../assets/images/arrow.svg";
import ReactPaginate from "react-paginate";
import "./styles.css";

const Props = {
  pageCount: Number,
  range: Number,
  onChange: (pageNumber) => {},
};

const Pagination = ({ pageCount, range, onChange }) => {
  return (
    <>
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={range}
        marginPagesDisplayed={1}
        containerClassName="pagination-container"
        pageLinkClassName="pagination-item"
        breakClassName="pagination-item"
        previousClassName="arrow-previous"
        nextClassName="arrow-next"
        activeLinkClassName="pagination-link-active"
        disabledClassName="arrow-inactive"
        onPageChange={(items) => onChange(items.selected)}
        previousLabel={
          <div className="pagination-arrow-container">
            <ArrowIcon />
          </div>
        }
        nextLabel={
          <div className="pagination-arrow-container">
            <ArrowIcon />
          </div>
        }
      />
    </>
  );
};

export default Pagination;
