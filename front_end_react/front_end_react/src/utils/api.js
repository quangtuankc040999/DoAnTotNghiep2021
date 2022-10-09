import axios from 'axios'

const baseURL = 'http://localhost:3000'
export const get = (endPoint) => {
    return axios({
        method: 'GET',
        url: `${baseURL}/${endPoint}`,
    }).catch((error) => {
        console.log(error);
    })
}
export const post = (endPoint, param) => {
    return axios({
        method: 'POST',
        url: `${baseURL}/${endPoint}`,
        data: param
    }).catch((error) => {
        console.log(error);
    })
}

export const put = (endPoint, param) => {
    return axios({
        method: 'PUT',
        url: `${baseURL}/${endPoint}`,
        data: param
    }).catch((error) => {
        console.log(error);
    })
}