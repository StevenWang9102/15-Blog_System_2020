export const USER_KEY = 'USER_KEY';

export const setUserOnSession = (user) => {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user))
}

export const getUserFromSession = () => {
    return JSON.parse(sessionStorage.getItem(USER_KEY))
}

export const removeUserFromSession = () => {
    sessionStorage.removeItem(USER_KEY);
}