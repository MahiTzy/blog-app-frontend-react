export const doLogin = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
}

export const doLogout = (next) => {
    localStorage.removeItem('user');
    next();
}

export const isLoggedIn = () => {
    return localStorage.getItem('user') !== null;
}

export const getToken = () => {
    return JSON.parse(localStorage.getItem('user')).token;
}

export const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}