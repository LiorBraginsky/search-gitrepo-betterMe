import Axios from "../../utils/axios";
import {
  GET_REPOSITORIES_REQUEST,
  GET_REPOSITORIES_FAILED,
  GET_REPOSITORIES_SUCCESS,
  SAVE_QUERY,
  CACHE_LAST_REPOSITORIES,
  SET_CACHED_ITEM,
  SET_FIRST_PAGE,
} from "../action-types";
import DEFAULT from "../../configs";

export const getRepositoriesRequest = () => ({
  type: GET_REPOSITORIES_REQUEST,
});

export const getRepositoriesSuccess = (payload) => ({
  type: GET_REPOSITORIES_SUCCESS,
  payload,
});

export const getRepositoriesFailed = () => ({
  type: GET_REPOSITORIES_FAILED,
});

export const saveLastQuery = (payload) => ({
  type: SAVE_QUERY,
  payload,
});

export const cacheLastRepositories = () => ({
  type: CACHE_LAST_REPOSITORIES,
});

export const setCachedItem = (payload) => ({
  type: SET_CACHED_ITEM,
  payload,
});

export const setFirstPage = (payload) => ({
  type: SET_FIRST_PAGE,
  payload,
});

export const getReposirotiesList = (repository, page = DEFAULT.PAGE) => {
  const query = repository.replace(/\s/g, "");
  const params = {
    q: query,
    sort: DEFAULT.SORT_BY,
    page,
    per_page: DEFAULT.PER_PAGE,
  };

  return async (dispatch) => {
    dispatch(getRepositoriesRequest());
    try {
      const { data } = await Axios("/search/repositories", params);

      dispatch(getRepositoriesSuccess(data));
    } catch (error) {
      dispatch(getRepositoriesFailed());
    }
  };
};
