const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
    name: "4k",
    version: "1.0.0",
    role: 0,
    credits: "aesther",
    description: "Enhance an image",
    hasPrefix: false,
    aliases: ["enhanceImage","remini"],
    usage: "[4k]",
    cooldown: 5
};

module.exports.run = async function({ api, event }) {
    try {
        
        if (!event.messageReply || !event.messageReply.attachments || event.messageReply.attachments.length === 0) {
            return api.sendMessage("‼️‼️ | Reply with a 𝗣𝗜𝗖𝗧𝗨𝗥𝗘 or provide a 𝗨𝗥𝗟.\n\nThen type 4𝗞 or 𝗥𝗘𝗠𝗜𝗡𝗜", event.threadID);
        }

        const attachment = event.messageReply.attachments[0];

        // mag procces lng pag may attachment
        if (attachment.type !== 'photo') {
            return api.sendMessage("‼️‼️ | Reply with a 𝗣𝗜𝗖𝗧𝗨𝗥𝗘 or provide a 𝗨𝗥𝗟.\n\nThen type 4𝗞 or 𝗥𝗘𝗠𝗜𝗡𝗜.", event.threadID);
        }

        const imageUrl = attachment.url;
        const apiUrl = `https://api.sanzy.co/api/upscale-image?imageUrl=${encodeURIComponent(imageUrl)}`;

        api.sendMessage("🕟 | 𝙐𝙋𝙎𝘾𝘼𝙇𝙀 𒊹︎︎︎𒊹︎︎︎𒊹︎︎︎", event.threadID);

        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
        const enhancedImagePath = path.join(__dirname, "enhancedImage.png");

        fs.writeFileSync(enhancedImagePath, response.data);

        api.sendMessage({
            body: "🟢 | 𝙎𝙐𝘾𝘾𝙀𝙎𝙎",
            attachment: fs.createReadStream(enhancedImagePath)
        }, event.threadID, () => {
            fs.unlinkSync(enhancedImagePath);
        });

    } catch (error) {
        console.error('Error:', error);
        api.sendMessage("An error occurred while processing the request.", event.threadID);
    }
};
