document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chatBox");
  const userInput = document.getElementById("userInput");
  const sendButton = document.getElementById("sendButton");

  const API_URL = "https://api.google-gemini.com/v1/chat";
  const API_KEY = "your-google-gemini-api-key";

  const appendMessage = (message, sender) => {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;
    const bubbleDiv = document.createElement("div");
    bubbleDiv.className = "bubble";
    bubbleDiv.textContent = message;
    messageDiv.appendChild(bubbleDiv);
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  };

  const fetchBotResponse = async (userMessage) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch the response.");
      }

      const data = await response.json();
      return data.reply || "I'm sorry, I couldn't process your request.";
    } catch (error) {
      console.error(error);
      return "Error: Unable to connect to the chatbot.";
    }
  };

  sendButton.addEventListener("click", async () => {
    const userMessage = userInput.value.trim();
    if (userMessage === "") return;

    appendMessage(userMessage, "user");
    userInput.value = "";

    const botMessage = await fetchBotResponse(userMessage);
    appendMessage(botMessage, "bot");
  });

  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendButton.click();
    }
  });
});
