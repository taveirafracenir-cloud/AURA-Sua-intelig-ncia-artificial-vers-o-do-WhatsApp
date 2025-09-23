// Importa a biblioteca whatsapp-web.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Cria uma nova instância do cliente, com suporte a sessão local
const client = new Client({
    authStrategy: new LocalAuth()
});

// Quando o QR Code for gerado, exiba-o no terminal
client.on('qr', (qr) => {
    console.log('QR Code recebido. Por favor, escaneie com seu celular:');
    qrcode.generate(qr, { small: true });
});

// Quando a conexão estiver pronta, exiba uma mensagem
client.on('ready', () => {
    console.log('Cliente está pronto!');
});

// Escuta por novas mensagens
client.on('message', message => {
    // Verifica se a mensagem é exatamente "//começar"
    if (message.body === '//começar') {
        // Se for, a AURA responde com a saudação
        message.reply('Olá! Eu sou a AURA, sua inteligência artificial.');
    }
});

// Inicia o cliente
client.initialize();
