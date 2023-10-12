const acc = document.querySelector("#acc-create-form");

const createAcc = async (e) => {
  e.preventDefault();

  const doc = {
    username: acc.username.value,
    password: acc.password.value,
  };

  await fetch("http://localhost:3000/users", {
    method: "POST",
    body: JSON.stringify(doc),
    headers: { "Content-Type": "application/json" },
  });
  window.location.replace("/index.html");
};
acc.addEventListener("submit", createAcc);

