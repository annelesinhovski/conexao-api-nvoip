// // SETANDO O HEADER DA REQUISIÇÃO
const defaultHeaders = { 'Content-Type': 'application/json' };
const authorizationHeaders = {
  Authorization: 'Basic TnZvaXBBcGlWMjpUblp2YVhCQmNHbFdNakl3TWpFPQ==',
  'Content-Type': 'application/x-www-form-urlencoded',
};

// SETANDO O BODY DA REQUISIÇÃO
const number_ip = '1234567890'; // gerar esse número na plataforma da NVoip
const user_token = 'xxx'; // gerar esse número na plataforma da NVoip

const credentials = `username=${number_ip}&password=${user_token}&grant_type=password`;

// CONECTANDO COM A PLATAFORMA DA NVOIP

function conectApi() {
  fetch('https://api.nvoip.com.br/v2/oauth/token', {
    method: 'POST',
    headers: { ...defaultHeaders, ...authorizationHeaders },
    body: credentials,
  })
    .then((res) => res.json()) //  retorna a resposta da requisição em formato JSON
    .then((data) => {
      access_token = data['access_token']; //  acessa o access_token
      alert('Conectado com a Nvoip!');
    })
    .catch((error) => console.log(error)); //  caso ocorra um erro na requisição
}

// OBTER INFORMAÇÕES DE TOKEN

function getToken() {
  const options = {
    method: 'POST',
    headers: { ...defaultHeaders, ...authorizationHeaders },
    body: `token=${access_token}`,
  };

  fetch('https://api.nvoip.com.br/v2/oauth/check_token', options).then((res) =>
    res.json()
  );
}

// SETUP PARA ENVIAR SMS

function sendSms(numberPhone, message, flashSms = false) {
  const oAuthHeaders = { Authorization: `Bearer ${access_token}` };

  fetch('https://api.nvoip.com.br/v2/sms', {
    method: 'POST',
    headers: { ...defaultHeaders, ...oAuthHeaders },
    body: JSON.stringify({
      numberPhone,
      message,
      flashSms,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}
