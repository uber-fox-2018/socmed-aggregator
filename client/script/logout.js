function logout() {
  localStorage.removeItem("token")
  window.location= "http://localhost:8080/index.html"
}