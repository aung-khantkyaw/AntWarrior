const post = document.querySelector("#post-create-form");

// Format Date for create post
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

const createPost = async (e) => {
  e.preventDefault();

  const doc = {
    title: post.title.value,
    image_url: post.img.value,
    content: post.body.value,
    created_at: formatDate(new Date()),
    created_by: post.createdBy.value,
  };

  await fetch("http://localhost:3000/posts", {
    method: "POST",
    body: JSON.stringify(doc),
    headers: { "Content-Type": "application/json" },
  });
  window.location.replace("/index.html");
};
post.addEventListener("submit", createPost);
