const id = new URLSearchParams(window.location.search).get("id");
const form = document.querySelector("#edit-form");
const container = document.querySelector(".details");
const deleteBtn = document.querySelector(".delete");
const editBtn = document.querySelector(".edit");

//Format date for Edit Post
const date = new Date();
date.setHours(0, 0, 0, 0);

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join('-');
}

//Show Post Detail
const renderDetails = async () => {
  const res = await fetch("http://localhost:3000/posts/" + id);
  const post = await res.json();
  const template = `
        <div class="post_detail">
            <div class="post_img">
                <img src="${post.image_url}" alt="">
            </div>
            <div class="post_text>
                <p class="post_title" style="font-size: 2rem">${post.title}</p>
                <p class="post_author">${post.created_by}</p>
                <p class="post_date">${post.created_at}</p>
                <p class="post_description">${post.content}</p>
            </div>
                  
        </div>
        `;
  container.innerHTML = template;
};

// Login or not
const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  return !!token;
};

// If Login User can edit and delete
if (isAuthenticated()) {
  renderDetails();
  deleteBtn.addEventListener("click", async (e) => {
    const res = await fetch("http://localhost:3000/posts/" + id, {
      method: "DELETE",
    });
    window.location.replace("/index.html");
  });

  editBtn.addEventListener("click", async (e) => {
    const doc = {
      title: form.title.value,
      image_url: form.img.value,
      content: form.body.value,
      created_at: formatDate(new Date()),
      created_by: form.createdBy.value
    };

    const res = await fetch("http://localhost:3000/posts/" + id, {
      method: "PUT",
      body: JSON.stringify(doc),
      headers: { "Content-Type": "application/json" },
    });
    window.location.replace("/index.html");
  });

  document.querySelector(".btnSection").style.display = "block";
} else {
  renderDetails();
}
window.addEventListener("DOMContentLoaded", () => renderDetails());
