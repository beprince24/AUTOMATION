const notifications = [];

document.getElementById("notificationBell").addEventListener("click", function() {
    const notificationsBox = document.getElementById("notificationsBox");
    notificationsBox.innerHTML = '';  // Clear old notifications

    notifications.forEach(notification => {
        const div = document.createElement("div");
        div.textContent = notification.message;

        const acceptButton = document.createElement("button");
        acceptButton.textContent = "Accept";
        acceptButton.onclick = () => respondToMeeting(notification.participant, "Accepted");

        const rejectButton = document.createElement("button");
        rejectButton.textContent = "Reject";
        rejectButton.onclick = () => respondToMeeting(notification.participant, "Rejected");

        div.appendChild(acceptButton);
        div.appendChild(rejectButton);
        notificationsBox.appendChild(div);
    });
});

function respondToMeeting(participant, response) {
    alert(`You have ${response} the meeting.`);
    notifications.push({ participant, response });
    showUserNotification(participant, response);
}

function showUserNotification(participant, response) {
    const responseDiv = document.createElement("div");
    responseDiv.textContent = `Meeting with ${participant}: ${response}`;
    document.getElementById("notificationsBox").appendChild(responseDiv);
}
