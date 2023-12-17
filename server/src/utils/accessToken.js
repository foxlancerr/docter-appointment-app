import jwt from "jsonwebtoken";

console.log(process.env.SECRET_KEY);
export const generateAccessToken = (...data) => {
    return jwt.sign(
        { ...data },
        process.env.SECRET_KEY
    )
}
export const verifyAccessToken = (token) => {
    return jwt.verify(
        token,
        process.env.SECRET_KEY
    )
}


/**
 * @param { testing the tokens}
 */
// const token =  generateAccessToken("kamran","kamran@gmail.com","zafar",true,undefined)
// console.log(token);

// const data = verifyAccessToken(token)
// console.log(data);

