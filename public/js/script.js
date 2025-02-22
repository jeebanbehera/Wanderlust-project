// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()



// index.ejs tax button and category button
let taxSwitch = document.getElementById("tax-toggle");
taxSwitch.addEventListener("click", () => {
  let taxInfo = document.getElementsByClassName("tax-info");
  for (info of taxInfo) {
    if (info.style.display != "inline") {
      info.style.display = "inline"
    }
    else {
      info.style.display = "none"
    }

  }
});

// let categoryData = document.querySelectorAll("#filter");
// categoryData.forEach(item => {
//   // item.addEventListener("click", () => {
//   //   // let category = item.querySelector('p').textContent
//   //   // console.log(category);
//   // })
// })

// navbar search button functionality 
let searchFrom = document.getElementById("searchFrom");

searchFrom.addEventListener("submit",(event)=>{
  // event.preventDefault()
  let inp = document.getElementById("input").value;
  // console.log(inp)
})