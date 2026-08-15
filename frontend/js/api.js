//this frontend's communication layer with the backend
const BASE_URL = 'http://localhost:8000'

//localStorage is a browser API and it persists even after a page is loaded

function saveToken(token){
    localStorage.setItem('token' , token)
}

function getToken(){
    return localStorage.getItem('token')
}

function removeToken(){
    localStorage.removeItem('token')
}


//apiRequest wrapper
async function apiRequest(endpoint , options = {}){
    //using options = {}, things like {method: 'POST' , body: ...} can be passed

    const token = getToken()

    const headers = {
        'Content-Type': 'application/json',

        //spreads any extra headers if passed
        ...options.headers
    }

    if(token){
        //add token to Authorization if token really exists
        headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${BASE_URL}${endpoint}` , {

        //spread operator
        ...options,
        headers
    })

    const data = await response.json()

    if(!response.ok){
        throw new Error(data.message || 'Something went wrong')
    }

    return data
}