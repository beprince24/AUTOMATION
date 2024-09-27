const userNotifications = {
    user1: [],
    user2: [],
};

const meetingResponses = {
    user1: [],
    user2: [],
};

document.getElementById("scheduleButton").addEventListener("click", function() {
    const meetingTitle = document.getElementById("meetingTitle").value;
    const meetingTime = document.getElementById("meetingTime").value;
    const selectedUser = document.getElementById("userSelect").value;

    // Store the notification for the selected user
    userNotifications[selectedUser].push(`Meeting "${meetingTitle}" scheduled at ${meetingTime}.`);
    
    // Show response section
    updateMeetingResponses();

    showNotification(`Meeting "${meetingTitle}" scheduled successfully for ${selectedUser}.`);
});

document.getElementById("autoScheduleButton").addEventListener("click", function() {
    const meetingTitle = document.getElementById("meetingTitle").value;
    const selectedUser = document.getElementById("userSelect").value;

    // Generate a random meeting time (for demonstration purposes)
    const randomTime = generateRandomMeetingTime();
    
    // Store the notification for the selected user
    userNotifications[selectedUser].push(`AI-generated meeting "${meetingTitle}" scheduled at ${randomTime}.`);

    // Show response section
    updateMeetingResponses();

    showNotification(`AI-generated meeting "${meetingTitle}" scheduled successfully for ${selectedUser} at ${randomTime}.`);
});

document.getElementById("notificationBell").addEventListener("click", function() {
    const notificationsBox = document.getElementById("notificationsBox");
    notificationsBox.innerHTML = ""; // Clear previous notifications

    // Display notifications for the selected user
    const selectedUser = document.getElementById("userSelect").value;
    const notifications = userNotifications[selectedUser];

    notifications.forEach(notification => {
        const notificationItem = document.createElement("div");
        notificationItem.textContent = notification;

        // Add accept/reject buttons
        const acceptButton = document.createElement("button");
        acceptButton.textContent = "Accept";
        acceptButton.onclick = function() {
            handleResponse(selectedUser, notification, true);
        };

        const rejectButton = document.createElement("button");
        rejectButton.textContent = "Reject";
        rejectButton.onclick = function() {
            handleResponse(selectedUser, notification, false);
        };

        notificationItem.appendChild(acceptButton);
        notificationItem.appendChild(rejectButton);
        notificationsBox.appendChild(notificationItem);
    });
});

// Function to handle accept/reject responses
function handleResponse(user, notification, isAccepted) {
    const responseMessage = isAccepted ? "accepted" : "rejected";
    const responseEntry = `${user} has ${responseMessage} the notification: "${notification}"`;
    meetingResponses[user].push(responseEntry); // Store the response

    showNotification(`Notification ${responseMessage} by ${user}.`);

    // Update meeting responses section
    updateMeetingResponses();
}

// Function to update the meeting responses display
function updateMeetingResponses() {
    const meetingResponsesContainer = document.getElementById("meetingResponses");
    meetingResponsesContainer.innerHTML = ""; // Clear previous responses

    Object.keys(meetingResponses).forEach(user => {
        const userResponses = meetingResponses[user];
        userResponses.forEach(response => {
            const responseItem = document.createElement("div");
            responseItem.textContent = response; // Display the response
            meetingResponsesContainer.appendChild(responseItem);
        });
    });
}

// Function to generate a random meeting time
function generateRandomMeetingTime() {
    const currentDateTime = new Date();
    const randomHour = Math.floor(Math.random() * 3) + 1; // Random hour within the next 3 hours
    const randomMinutes = Math.floor(Math.random() * 60); // Random minutes

    currentDateTime.setHours(currentDateTime.getHours() + randomHour);
    currentDateTime.setMinutes(randomMinutes);
    
    return currentDateTime.toLocaleString(); // Format to a readable string
}

function showNotification(message) {
    const notificationMessage = document.getElementById("notification-message");
    notificationMessage.textContent = message;
}
