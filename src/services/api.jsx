import axios from 'axios';

export const fetchDataApi = (searchQuery, page = 1) => {
  const URL = 'https://pixabay.com/api/';
  const KEY = '34615621-fecaa10f9eea33d0198f958';
  return axios
    .get(`${URL}?key=${KEY}&per_page=12&page=${page}&q=${searchQuery}`)
    .then(res => res.data);
};
