
const f = document.getElementById("registrationform");
const showdata = document.getElementById("showdata");
const showpic = document.getElementById("showpic");
const userpic = document.getElementById("pic");


 let arr = JSON.parse(localStorage.getItem("arr")) || [];
function show() {
  showdata.innerHTML = arr
    .map((user) => {
      return `
          <div>
            <p><strong>Full Name:</strong> ${
              user.first + " " + user.last
            }</p>
            <p><strong>Email:</strong> ${
              user.email
            }</p>
            <p><strong>Gender:</strong> ${
              user.gender
            }</p>
              <p><strong>Domain:</strong> ${
                user.domain
              }</p>
            <p><strong>Photo:</strong></p>
            <img src="${
              user.pic
            }" alt="Photo" style="max-width: 200px;">
          </div>
        `;
    })
    .join("");
}

window.addEventListener("load", () => {
  show();
});
userpic.addEventListener("change", function () {
  const file = userpic.files[0];
  if (file) {
    const check = new FileReader();
    check.onload = function () {
      showpic.src = check.result;
      showpic.style.display = "block";
    };
    check.readAsDataURL(file);
  } else {
    showpic.src = "";
    showpic.style.display = "none";
  }
});



      f.addEventListener("submit", function (event) {
  event.preventDefault();
  const first = document.getElementById("fn").value;
  const last = document.getElementById("ln").value;
  const email = document.getElementById("email").value;
  const gender = document.getElementById("gender").value;
 const domain = document.getElementById("domain").value;
  const profilePic = userpic.files[0];
  const profilePicName = profilePic ? profilePic.name : "No Image Selected";
  let profilePicSrc = "";

  if (profilePic) {
    const check = new FileReader();
    check.onload = function () {
      profilePicSrc = check.result;
      arr.push({
        first,last,email,gender,domain,
       
        pic: profilePicSrc,
      });
      localStorage.setItem("arr", JSON.stringify(arr));
     
      show();
    };
    check.readAsDataURL(profilePic);
  } else {
    arr.push({
      fullName,
      email,
      gender,
   profilePic: profilePicSrc,
    });
    localStorage.setItem("arr", JSON.stringify(arr));
   
    show();
  }

    f.reset();

  showpic.src = "";
  showpic.style.display = "none";

});