const shortenForm = document.getElementById('shortenForm')
const errorMsg = document.getElementById('errorMsg')
const resultDiv = document.getElementById('result')
const copyBtn = document.getElementById('copyBtn')
//this is like a tag where you can append the new shortened urls
const shortLinkEl = document.getElementById('shortLink')

const navLinks = document.getElementById('navLinks')
const token = getToken()

if (token) {
    navLinks.innerHTML = `<a href="dashboard.html">Dashboard</a> | <a href="#" id="logoutLink">Logout</a>`
    document.getElementById('logoutLink').addEventListener('click', (e) => {
        e.preventDefault()
        removeToken()
        window.location.href = 'login.html'
    })
} else {
    navLinks.innerHTML = `<a href="login.html">Login</a> | <a href="dashboard.html">Dashboard</a>`
}

shortenForm.addEventListener('submit' , async(event) => {
    event.preventDefault()

    const url = document.getElementById('urlInput').value

    try{

        const response = await apiRequest('/shorten' , { method: 'POST',
            body: JSON.stringify({ url })
        })

        const data = response.newUrl
        const fullShortUrl = `http://localhost:8000/${data.shortCode}`

        shortLinkEl.href = fullShortUrl
        shortLinkEl.textContent = fullShortUrl
        resultDiv.style.display = 'block'
        errorMsg.textContent = ''
        
    }catch(err){
        errorMsg.textContent = err.message
    }

})

copyBtn.addEventListener('click' , () => {
    navigator.clipboard.writeText(shortLinkEl.href)
})