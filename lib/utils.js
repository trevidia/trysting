export const getCookie = (req) => {
    let cookie = ""
    let cookieKeys = Object.keys(req.cookies)
    for (let key in cookieKeys){
        cookie += `${cookieKeys[key]}=${req.cookies[cookieKeys[key]]};`
    }
    return cookie
}