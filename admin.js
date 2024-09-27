const scheduledMeetings = [];
const usedEmails = new Set();
const meetingResponses = {};

document.getElementById("scheduleButton").addEventListener("click", function() {
    const participant = document.getElementById("participantEmail").value;
    const meetingTime = document.getElementById("meetingTime").value;

    if (participant && meetingTime) {
        scheduledMeetings.push({ participant, meetingTime });
        usedEmails.add(participant);

        alert(`Meeting scheduled for ${participant} at ${meetingTime}`);

        // Simulate sending notification
        showAdminNotification(participant, `Meeting scheduled at ${meetingTime}`);
    }
});

document.getElementById("autoScheduleButton").addEventListener("click", function() {
    const participant = document.getElementById("participantEmail").value;

    if (participant) {
        const autoTime = new Date();
        autoTime.setHours(autoTime.getHours() + 1); // Automatically schedule for 1 hour later
        scheduledMeetings.push({ participant, meetingTime: autoTime });
        usedEmails.add(participant);

        alert(`AI Auto-scheduled meeting for ${participant} at ${autoTime}`);

        // Simulate sending notification
        showAdminNotification(participant, `AI Auto-scheduled meeting at ${autoTime}`);
    }
});

document.getElementById("usedEmailsButton").addEventListener("click", function() {
    const usedEmailsList = document.getElementById("usedEmailsList");
    usedEmailsList.innerHTML = '';

    usedEmails.forEach(email => {
        const div = document.createElement("div");
        div.textContent = email;
        usedEmailsList.appendChild(div);
    });

    usedEmailsList.classList.toggle("hidden");
});

function showAdminNotification(participant, message) {
    const responseDiv = document.getElementById("meetingResponses");
    const newResponse = document.createElement("div");
    newResponse.textContent = `${participant}: ${message}`;
    responseDiv.appendChild(newResponse);
}
