// Set access token
import axios from 'axios'

const setAuthToken = token => {
    if (token) {
        // Apply to every request
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;
// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMDUyZjZhNGExNzg2M2I5YzE3ZGQyZCIsImVtYWlsIjoicGh1bmdAZ21haWwuY29tIiwibmFtZSI6IkhpZXAgUGh1bmciLCJhdmF0YXIiOiIvL3d3dy5ncmF2YXRhci5jb20vYXZhdGFyLzgyMjNhNmQ5YTQxZjI4ZGRlMzI4ZTNkZWQ1ZDQ2MGViP3M9MjAwJnI9cGcmZD1tbSIsImlhdCI6MTUyNzA3MjgxNCwiZXhwIjoxNTI3MDc2NDE0fQ.cm3ix4lPZUFnwOIUJcfwVu7tt_LnpLRp8Egv93w89G8