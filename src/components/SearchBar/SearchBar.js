import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getReposirotiesList,
  saveLastQuery,
  cacheLastRepositories,
  setCachedItem,
  setFirstPage,
} from "../../store/actions";
import { getCachedListItems } from "../../store/selectors/listSelectors";
import "./styles.scss";

const SearchBar = (props) => {
  const [query, setStateQuery] = useState("");

  const {
    fetchList,
    saveQuery,
    cacheLastRepo,
    cachedItems,
    setCachedItemToStore,
    setFirstPageFlag,
  } = props;

  useEffect(() => {
    saveQuery("search-gitrepo-betterMe");

    const fetchListAsync = async () => {
      await fetchList("search-gitrepo-betterMe");
      cacheLastRepo();
    };

    fetchListAsync();
  }, [saveQuery, cacheLastRepo, fetchList]);

  const chechItemInCache = () => {
    const cachedItem = cachedItems.find((item) => item.cachedResultName === query) || false;
    if (cachedItem) {
      setCachedItemToStore(cachedItem);
    } else {
      fetchList(query);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    cacheLastRepo();
    chechItemInCache();
    saveQuery(query);
    setFirstPageFlag(true);
  };

  const handleInput = (e) => {
    setStateQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2 className="title">Enter the Github Repository</h2>
      <input
        type="text"
        placeholder="Enter Github Repository"
        required
        onChange={(e) => handleInput(e)}
        autoComplete="on"
      />
      <button className="button" type="submit">
        Submit
      </button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    cachedItems: getCachedListItems(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveQuery: (query) => dispatch(saveLastQuery(query)),
    fetchList: (query) => dispatch(getReposirotiesList(query)),
    cacheLastRepo: () => dispatch(cacheLastRepositories()),
    setCachedItemToStore: (item) => dispatch(setCachedItem(item)),
    setFirstPageFlag: (isNew) => dispatch(setFirstPage(isNew)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
