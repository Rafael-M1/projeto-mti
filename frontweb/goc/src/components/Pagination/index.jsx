import ReactPaginate from "react-paginate";
import "./styles.css";

const Pagination = ({ pageCount, range, onChange }) => {
  return (
    <>
      <ReactPaginate
        onPageChange={(items) => onChange(items.selected)}
        previousLabel={"Anterior"}
        nextLabel={"Próximo"}
        pageCount={pageCount}
        pageRangeDisplayed={range}
        marginPagesDisplayed={1}
        breakLabel={"..."}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </>
  );
};

export default Pagination;
