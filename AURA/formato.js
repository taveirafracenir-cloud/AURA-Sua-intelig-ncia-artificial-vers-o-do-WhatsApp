// Importa as bibliotecas necessárias
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
// Supondo que a sua função para a IA já está importada e funcionando
const { getAuraResponse } = require('./ai_integration'); 

const client = new Client({
    authStrategy: new LocalAuth()
});

const greetedChats = {};

client.on('message', async message => {
    const chat = await message.getChat();
    const chatId = chat.id._serialized;
    const body = message.body.trim().toLowerCase();

    // Lógica para a mensagem de boas-vindas na primeira vez
    if (!greetedChats[chatId]) {
        greetedChats[chatId] = true;
        setTimeout(() => {
            message.reply('Olá, tudo bem? Com o que eu posso te ajudar?');
        }, 2000);
        return; 
    }

    // A Aura responde apenas para os comandos
    if (body.startsWith('//')) {
        const command = body.substring(2); // Remove o "//"

        if (command === 'começar') {
            message.reply('Olá, eu sou a AURA, sua inteligência artificial.');
        } else if (command === 'criar código') {
            const prompt = message.body.substring(body.indexOf('criar código') + 'criar código'.length).trim();
            
            // Aqui, a Aura chama a IA para gerar o código
            const generatedCode = await getAuraResponse(`Gere um código em JavaScript que faz o seguinte: ${prompt}.`);
            
            // Formata o código com blocos de código
            const formattedCode = "```javascript\n" + generatedCode + "\n```";
            
            message.reply(formattedCode);
        } else {
            // Lógica para outros comandos
        }
    }
});

client.initialize();
