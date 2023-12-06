import { memo, useState } from "react";
import PropTypes, { string } from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { getPagination } from "./helpers";
import useStore from "../../store/use-store";

function Pagination(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const store = useStore();

  const cn = bem("Pagination");
  const options = {
    length: props.length,
    totalCount: props.count || 1,
    currentPage,
  };

  console.log({ options });

  const pages = getPagination(options);
  console.log({ pages });

  const callbacks = {
    handlePageClick: (page) => {
      if (page === currentPage) {
        return;
      }

      setCurrentPage(page);
      store.actions.catalog.load(
        `?limit=${props.length}&skip=${
          (page - 1) * props.length
        }&fields=items(_id,%20title,%20price),count`
      );
    },
  };

  return (
    <div className={cn()}>
      <ul>
        {pages.map((page) => (
          <li>
            <button
              className={page === currentPage ? "active" : ""}
              disabled={page === "..."}
              onClick={() => callbacks.handlePageClick(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

Pagination.propTypes = {
  count: PropTypes.number,
  length: PropTypes.number,
  onAdd: PropTypes.func,
};

Pagination.defaultProps = {
  onAdd: () => {},
};

export default memo(Pagination);
