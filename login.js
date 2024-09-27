const users = {
    "admin": { password: "wolf", role: "admin" },
    "user1": { password: "1", role: "user1" },
    "user2": { password: "2", role: "user2" }
};

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent form from submitting
    const userId = document.getElementById("userId").value;
    const password = document.getElementById("password").value;

    if (users[userId] && users[userId].password === password) {
        const role = users[userId].role;
        showNotification(`Welcome ${role === 'admin' ? 'Admin' : 'User'}!`);

        setTimeout(function() {
            if (role === "admin") {
                window.location.href = "adminDashboard.html"; 
            } else {
                window.location.href = "userDashboard.html"; 
            }
        }, 3000); // Redirect after showing notification
    } else {
        document.getElementById("error-message").textContent = "Invalid User ID or Password";
    }
});

function showNotification(message) {
    const notification = document.getElementById("notification");
    const notificationMessage = document.getElementById("notification-message");
    
    notificationMessage.textContent = message;
    notification.classList.add("show");

    setTimeout(function() {
        notification.classList.remove("show");
    }, 3000); // Hide after 3 seconds
}
