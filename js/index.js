let searchInput = document.getElementById('search')
let userList = document.getElementById('user-list')
let repoResults = document.getElementById('repos-list')

document.getElementById('github-form').addEventListener('submit', e => {
    e.preventDefault();
    let thingToSearch = searchInput.value
    fetch(`https://api.github.com/search/users?q=${thingToSearch}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/vnd.github.v3+json"
    }
 })
 .then(response => response.json())
 .then(data => displayUsers(data.items))
})

function displayUsers(users) {
    userList.textContent = '';
    users.forEach(user => {
        let userInfo = document.createElement('li');
        userInfo.innerHTML = `
            <h2>${user.login}</h2>
            <img src="${user.avatar_url}" alt="User Avatar" width="100">
            <a href="${user.html_url}" target="_blank">View Profile</a>
        `;
        userInfo.addEventListener('click', e => {
            e.preventDefault();
            fetch(`https://api.github.com/users/${user.login}/repos`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(repos => displayRepos(repos))
            .catch(error => console.error('Error fetching repositories:', error));
        });
        userList.appendChild(userInfo);
    });
}

function displayRepos(repos) {
    repoResults.innerHTML = '';
    repos.forEach(repo => {
        let repoInfo = document.createElement('li');
        repoInfo.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || ''}</p>
        `;
        repoResults.appendChild(repoInfo);
    });
}