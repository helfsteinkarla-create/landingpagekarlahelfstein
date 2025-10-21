const { google } = require('googleapis');

exports.handler = async (event) => {
  // Apenas aceitar POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { nome, email, whatsapp, produtos } = data;

    // Validação básica
    if (!nome || !email || !whatsapp || !produtos) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Dados incompletos' }),
      };
    }

    // Configurar credenciais do Google Sheets
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '14GSJih_l4_Ih1O-gBJMkhup5ukrLDdEpAgWCjJRFGMs';

    // Adicionar linha na planilha
    const timestamp = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Página1!A:E',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[timestamp, nome, email, whatsapp, produtos.join(', ')]],
      },
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        success: true,
        message: 'Lead salvo com sucesso!' 
      }),
    };
  } catch (error) {
    console.error('Erro ao salvar lead:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        error: 'Erro ao salvar lead',
        details: error.message 
      }),
    };
  }
};

