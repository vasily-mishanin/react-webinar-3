import { memo, useState } from "react";
import PropTypes from "prop-types";
import useStore from "../../store/use-store";
import { cn as bem } from "@bem-react/classname";
import { getPagination } from "./helpers";
import "./style.css";

function Pagination(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const store = useStore();

  const cn = bem("Pagination");
  const options = {
    length: props.length,
    totalCount: props.count || 1,
    currentPage,
  };

  const pages = getPagination(options);

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
        {pages.map((page, i) => (
          <li key={`${page}_${i}`}>
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
};

export default memo(Pagination);
