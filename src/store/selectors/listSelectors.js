export const getListItems = (state) => {
  return state.listRepositories.items;
};

export const getCachedListItems = (state) => {
  return state.listCachedRepositories.cachedItems;
};

export const getTotalCount = (state) => {
  return state.listRepositories.total_count;
};

export const getLastQuery = (state) => {
  return state.lastQuery;
};

export const getIsNewRepositoryFlag = (state) => {
  return state.isNewRepository;
};

export const getStatusFetch = (state) => {
  return {
    isFetching: state.isFetching,
    isError: state.isError,
  };
};
