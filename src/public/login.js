document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const title = document.getElementById('username').value
    const password = document.getElementById('password').value
    

    console.log(title)
    console.log(password)
})