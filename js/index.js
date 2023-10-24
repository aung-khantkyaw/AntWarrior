// nav background
let header = document.querySelector("header");

window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
});

// When the user clicks anywhere outside of the modal, close it
let modal = document.getElementById("modal");

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//login & out

// Check if the user is already authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  return !!token;
};

// Event listener for the login form submission
document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  login(username, password);
});

// Function to handle login
const login = async (username, password) => {
  const usersData = await fetch("https://my-json-server.typicode.com/aung-khantkyaw/AntWarrior/users");
  const users = await usersData.json();

  const user = users.find((u) => u.username === username);
  if (!user || user.password !== password) {
    alert("Login failed. Please check your credentials.");
    return;
  }

  const authToken = user.username;
  localStorage.setItem("authToken", authToken);
  displayAuthenticatedUser();
};

// Function to handle logout
const logout = () => {
  localStorage.removeItem("authToken");
  displayLoginForm();
};

// Function to display the login form
const displayLoginForm = () => {
  document.getElementById("login").style.display = "block";
  document.getElementById("new_acc").style.display = "block";
  document.getElementById("new_post").style.display = "none";
  document.getElementById("logout").style.display = "none";

  const container = document.querySelector(".card-list");
  const renderPosts = async () => {
    let url = "http://localhost:3000/posts?_sort=id&_order=desc";

    const res = await fetch(url);
    const posts = await res.json();

    let template = "";
    posts.slice(0, 20).forEach((post) => {
      template += `
        <div class="card-item">
            <img src="${post.image_url}" alt="Card Image">
            <span class="created_by">${post.created_by} | ${
        post.created_at
      }</span>
            <h3>${post.title}</h3>
            <p>${post.content.slice(0, 50)}...</p>
            <a href="/detail.html?id=${post.id}" class="btn2">Read More</a>
        </div>
      `;
    });
    container.innerHTML = template;
  };
  window.addEventListener("DOMContentLoaded", () => renderPosts());
};

// Function to display the authenticated user logout button
const displayAuthenticatedUser = () => {
  document.getElementById("login").style.display = "none";
  document.getElementById("modal").style.display = "none";
  document.getElementById("new_acc").style.display = "none";
  document.getElementById("new_post").style.display = "block";
  document.getElementById("logout").style.display = "block";

  const container = document.querySelector(".card-list");
  const renderPosts = async () => {
    let url = "http://localhost:3000/posts?_sort=id&_order=desc";

    const res = await fetch(url);
    const posts = await res.json();

    let template = "";
    posts.forEach((post) => {
      template += `
        <div class="card-item">
            <img src="${post.image_url}" alt="Card Image">
            <span class="created_by">${post.created_by} | ${
        post.created_at
      }</span>
            <h3>${post.title}</h3>
            <p>${post.content.slice(0, 50)}...</p>
            <a href="/detail.html?id=${post.id}" class="btn2">Read More</a>
        </div>
      `;
    });
    container.innerHTML = template;
  };
  window.addEventListener("DOMContentLoaded", () => renderPosts());
};

// Event listener for the logout button
document.getElementById("logout").addEventListener("click", () => {
  logout();
});

// Initialize the UI based on authentication status
if (isAuthenticated()) {
  displayAuthenticatedUser();
} else {
  displayLoginForm();
}
