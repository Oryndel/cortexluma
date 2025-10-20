// Replace this with your own Gemini API key
const API_KEY = "AIzaSyCgYBGsRsS4_Plkl15coCSUE4IWxuHsrFc";

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

async function getGeminiResponse(prompt) {
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response found.";
}

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", async () => {
  const text = userInput.value.trim();
  if (!text) return;
  addMessage("🧑 " + text, "user");
  userInput.value = "";

  addMessage("🤔 Thinking...", "bot");

  const response = await getGeminiResponse(text);
  chatBox.lastChild.remove();
  addMessage("🤖 " + response, "bot");
});

userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});
