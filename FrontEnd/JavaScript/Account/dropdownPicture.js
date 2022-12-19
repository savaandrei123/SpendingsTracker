function showPictureDropdown() {
    document.getElementById("myDropdownPicture").classList.toggle("showPicture");
}

window.addEventListener("click", function(event) {
    if (!event.target.matches('.dropbtnPicture')) {
        var dropdownsPicture = document.getElementsByClassName("dropdownPicture-content");
        for (var i = 0; i < dropdownsPicture.length; i++) {
            var openDropdownPicture = dropdownsPicture[i];
            if (openDropdownPicture.classList.contains('showPicture')) {
                openDropdownPicture.classList.remove('showPicture');
            }
        }
    }

})

$(document).ready(function() {
    $("#myDropdownPicture  img").click(function() {
        newPhoto = $(this).attr("src")
        document.getElementById("changePicture").src = newPhoto
        localStorage.setItem("picture", newPhoto)
    })
})


function getCurrentPicture() {
    selectedPicture = localStorage.getItem("picture");
    if (selectedPicture == null) {
        selectedPicture = '../Image/icon1.png'
        document.getElementById("changePicture").src = selectedPicture
    } else
        document.getElementById("changePicture").src = selectedPicture
}