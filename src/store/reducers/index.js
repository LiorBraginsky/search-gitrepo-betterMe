import {
  GET_REPOSITORIES_REQUEST,
  GET_REPOSITORIES_FAILED,
  GET_REPOSITORIES_SUCCESS,
  SAVE_QUERY,
  CACHE_LAST_REPOSITORIES,
  SET_CACHED_ITEM,
  SET_FIRST_PAGE,
} from "../action-types";

const initialState = {
  listRepositories: {
    total_count: null,
    items: [],
  },
  listCachedRepositories: {
    cachedItems: [],
  },
  lastQuery: "",
  isNewRepository: false,
  isFetching: false,
  isError: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REPOSITORIES_REQUEST:
      return {
        ...state,
        listRepositories: initialState.listRepositories,
        isFetching: true,
        isError: false,
      };

    case GET_REPOSITORIES_SUCCESS:
      return {
        ...state,
        listRepositories: action.payload,
        isFetching: false,
        isError: false,
      };

    case GET_REPOSITORIES_FAILED:
      return {
        ...state,
        isFetching: false,
        isError: true,
      };

    case CACHE_LAST_REPOSITORIES:
      return {
        ...state,
        listCachedRepositories: {
          cachedItems: [
            ...state.listCachedRepositories.cachedItems,
            {
              cachedResultName: state.lastQuery,
              total_count: state.listRepositories.total_count,
              items: state.listRepositories.items,
            },
          ],
        },
      };

    case SET_CACHED_ITEM:
      return {
        ...state,
        listRepositories: action.payload,
      };

    case SAVE_QUERY:
      return { ...state, lastQuery: action.payload };

    case SET_FIRST_PAGE:
      return { ...state, isNewRepository: action.payload };

    default:
      return state;
  }
};

export default reducer;
