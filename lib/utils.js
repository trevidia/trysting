export const getCookie = (req) => {
    let cookie = ""
    let cookieKeys = Object.keys(req.cookies)
    for (let key in cookieKeys){
        cookie += `${cookieKeys[key]}=${req.cookies[cookieKeys[key]]};`
    }
    return cookie
}

export const usernameValidation = (username)=>{
    const re = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/
    return re.exec(username)
}