const token = getToken()

if(!token){
    window.location.href = 'login.html'
}

const urlList = document.getElementById('urlList')
const errorMsg = document.getElementById('errorMsg')
const logoutBtn = document.getElementById('logoutBtn')

async function loadUrls() {
    
    try{

        const data = await apiRequest('/shorten' , { method: 'GET'})
        //data.urls is my array

        urlList.innerHTML = data.urls.map(url => `
            <div>
                <a href="http://localhost:8000/${url.shortCode}" target="_blank">${url.shortCode}</a>
                <p>${url.url}</p>
                <p>Clicks: ${url.accessCount}</p>
            </div>
        `).join('')

    }catch(err){
        errorMsg.textContent = err.message
    }
}

logoutBtn.addEventListener('click' , () => {

    removeToken()
    window.location.href = 'login.html'

})


loadUrls()