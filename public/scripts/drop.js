const $dropdown = $('.dropdown-btn')

$('body').on('click', $dropdown, function () {
    // console.log('hellow')
})


for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
  this.classList.toggle("active")
  var dropdownContent = this.nextElementSibling;
  if (dropdownContent.style.display === "block") {
  dropdownContent.style.display = "none"
  } else {
  dropdownContent.style.display = "block"
  }
  })
}