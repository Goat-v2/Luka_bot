const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
    name: "dalle",
    version: "1.0.0",
    credits: "chill",
    description: "Generate images",
    hasPrefix: false,
    cooldown: 5,
    aliases: ["dalle"]
};

module.exports.run = async function ({ api, event, args }) {
    try {
        let chilli = args.join(" ");
        if (!chilli) {
            return api.sendMessage("**𝗛𝗆𝗆𝗆, 𝗐𝗁𝖺𝗍 𝗐𝗈𝗎𝗅𝖽 𝗒𝗈𝗎 𝗅𝗂𝗄𝖾 𝗆𝖾 𝗍𝗈 𝖼𝗋𝖾𝖺𝗍𝖾?** 💫 ...", event.threadID, event.messageID);
        }

        api.sendMessage("🕟 | 𒊹︎︎︎𒊹︎︎︎𒊹︎︎︎", event.threadID, async (err, info) => {
            if (err) {
                console.error(err);
                return api.sendMessage("An error occurred while processing your request.", event.threadID);
            }

            try {
                const models = "12";  // Replace with your model if needed
                const pogi = await axios.get(`https://smfahim.onrender.com/prodia?prompt=${encodeURIComponent(chilli)}&model=${models}`, { responseType: 'arraybuffer' });
                const imagePath = path.join(__dirname, "dalle_image.png");
                
                fs.writeFileSync(imagePath, pogi.data);

                const poganda = await api.getUserInfo(event.senderID);
                const requesterName = poganda[event.senderID].name;

                // Prepare image for sending
                const attachment = fs.createReadStream(imagePath);

                api.sendMessage({
                    body: `🔵🔴⚪ 𝗚𝗘𝗡𝗘𝗥𝗔𝗧𝗘𝗗 𝗣𝗜𝗖 :\n${chilli}\n\nRequested by: ${requesterName}`,
                    attachment: attachment
                }, event.threadID, () => {
                    fs.unlinkSync(imagePath);  // Clean up the image file
                });

            } catch (mantika) {
                console.error(mantika);
                api.sendMessage("An error occurred while processing your request.", event.threadID);
            }
        });
    } catch (mantika) {
        console.error("Error in DALL-E command:", mantika);
        api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
};
