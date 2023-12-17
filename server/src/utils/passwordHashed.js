import bcrypt from 'bcrypt';

export const hashedPassward = async (password) => {
    return await bcrypt.hash(password, 10)
}

export const decrptPassword = async (userPassword, DbStorePassword) => {
    return await bcrypt.compare(userPassword, DbStorePassword)
}

