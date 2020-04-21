import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import { connect } from "react-redux";
import _ from "lodash";
import { getReposirotiesList, setFirstPage } from "../../store/actions";
import "./styles.scss";
import {
  getLastQuery,
  getTotalCount,
  getIsNewRepositoryFlag,
} from "../../store/selectors/listSelectors";

const PaginationComponent = (props) => {
  const [activePage, setActivePage] = useState(1);
  const { totalCount, fetchList, setFirstPageFlag, isNewRepository } = props;

  const debouncedFunction = _.debounce(fetchList, 300);
  
  useEffect(() => {
    if(isNewRepository) {
      setActivePage(1);
    }
  }, [isNewRepository]);
  
  const handlePageChange = (pageNumber) => {
    const { lastQuery } = props;

    setFirstPageFlag(false);
    setActivePage(pageNumber);
    debouncedFunction(lastQuery, pageNumber);
  };

  return (
    <div className="pagination-section">
      <Pagination
        activeLinkClass="active"
        activePage={activePage}
        totalItemsCount={totalCount > 1000 ? 1000 : totalCount || 0}
        itemsCountPerPage={30}
        pageRangeDisplayed={10}
        onChange={handlePageChange}
        firstPageText="First"
        prevPageText="Prev"
        nextPageText="Next"
        lastPageText="Last"
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    lastQuery: getLastQuery(state),
    totalCount: getTotalCount(state),
    isNewRepository: getIsNewRepositoryFlag(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchList: (lastQuery, pageNumber) => dispatch(getReposirotiesList(lastQuery, pageNumber)),
    setFirstPageFlag: (isNew) => dispatch(setFirstPage(isNew)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaginationComponent);
