import React from "react";
import { connect } from "react-redux";
import "./styles.scss";
import Loader from "../Loader/Loader";
import { getTotalCount, getListItems, getStatusFetch } from "../../store/selectors/listSelectors";

const ListItem = ({ item }) => {
  const { name, html_url :url, stargazers_count: stars } = item;
  return (
    <div className="list_item">
      <div className="title">{name}</div>
      <div className="link"><a href={url} target="_blank" rel="noopener noreferrer">{url}</a></div>
      <div className="stars">{stars}</div>
    </div>
  );
};

const List = (props) => {
  const { totalCount, items, fetchStatus } = props;

  return (
    <div className="list">
      <div className="table">
        <ul className="table-head">
          <li className="title">Repository Name</li>
          <li className="link">Link</li>
          <li className="stars">Stars</li>
        </ul>
        <div className="items-container">
          {fetchStatus.isError && <h3 className="error">Sorry, an error occurred</h3>}
          {!items.length && !fetchStatus.isFetching && !fetchStatus.isError && (
            <h3 className="error">No such repository exists</h3>
          )}
          {fetchStatus.isFetching && <Loader />}
          {items && items.map((item) => <ListItem key={item.id} item={item} />)}
        </div>
        <div className="table-footer">
          <p>
            {`Total count of repositories: ${totalCount}.
          But I don’t want to show you more than 1000 :)`}
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    totalCount: getTotalCount(state),
    items: getListItems(state),
    fetchStatus: getStatusFetch(state),
  };
};

export default connect(mapStateToProps)(List);
