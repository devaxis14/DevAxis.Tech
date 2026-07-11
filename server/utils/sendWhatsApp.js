/**
 * Send a WhatsApp alert using a configured API.
 * Placeholder — requires WhatsApp Business API or Twilio credentials.
 *
 * Gracefully skips if API credentials are not configured.
 *
 * @param {string} message - The alert message text
 */
const sendWhatsApp = async (message) => {
  const apiUrl = process.env.WHATSAPP_API_URL;
  const apiToken = process.env.WHATSAPP_API_TOKEN;
  const adminNumber = process.env.WHATSAPP_ADMIN_NUMBER;

  if (!apiUrl || !apiToken || !adminNumber) {
    console.warn("⚠️  Skipping WhatsApp alert — API not configured");
    return null;
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: adminNumber,
        type: "text",
        text: { body: message },
      }),
    });

    if (!response.ok) {
      throw new Error(`WhatsApp API responded with status ${response.status}`);
    }

    const data = await response.json();
    console.log(`💬 WhatsApp alert sent: ${data.messages?.[0]?.id || "OK"}`);
    return data;
  } catch (error) {
    console.error("WhatsApp send failed:", error.message);
    throw error;
  }
};

module.exports = sendWhatsApp;
