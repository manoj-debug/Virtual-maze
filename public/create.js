function validateForm() {
    var username = document.getElementById("pass").value;
    var roomname= document.getElementById("roomname").value;
    var errorMessage = document.getElementById("error");
    
    if (username == ""||roomname=="") {
      errorMessage.style.display = "block";
      return false; // Prevent form submission
    }
    
    
    errorMessage.style.display = "none";
    return true; // Allow form submission
  }