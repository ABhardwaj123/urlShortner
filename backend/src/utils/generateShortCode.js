import {nanoid} from 'nanoid'

const generateShortCode = () => {

    const randomCode = nanoid(6)
    return randomCode
    
}

export default generateShortCode

