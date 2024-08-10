import { myAxios } from './Helper';
export const signup = (user) => {
    return myAxios.post('/auth/register', user).then
        (response => {
            return response.data;
        });
}

export const login = (user) => {
    return myAxios.post('/auth/login', user).then
        (response => {
            return response.data;
        });
}

export const getUserById = (userId) => {
    return myAxios.get(`/users/${userId}`).then
        (response => {
            return response.data;
        }
        )
}

