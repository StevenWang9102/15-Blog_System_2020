export const USER_KEY = 'USER_KEY';

export const setUser = (user) => {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user))
}

export const getUser = () => {
    return JSON.parse(sessionStorage.getItem(USER_KEY))
}