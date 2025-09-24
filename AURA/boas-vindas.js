// Importa as bibliotecas necessárias
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    console.log('QR Code recebido. Escaneie com seu celular:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Cliente está pronto!');
});

// Armazena os IDs dos chats que já receberam a primeira mensagem
const greetedChats = {};

client.on('message', async message => {
    // Obtenha o ID do chat atual
    const chat = await message.getChat();
    const chatId = chat.id._serialized;

    // Se a mensagem for "começar" ou se for a primeira vez que o bot fala com o usuário
    if (message.body === '//começar' || !greetedChats[chatId]) {
        // Marque este chat como já cumprimentado
        greetedChats[chatId] = true;

        // Adiciona um atraso de 2 segundos
        setTimeout(() => {
            message.reply('Olá, tudo bem? Com o que eu posso te ajudar?');
        }, 2000);
    }
});

client.initialize();
