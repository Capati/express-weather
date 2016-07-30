## Express Weather

Este é apenas um pequeno experimento em [express](https://github.com/expressjs/express) que usa a api do google para obter as coordenadas de uma cidade e a api do [openweather](http://openweathermap.org/) para obter as informações climáticas.

Caso queira testar, comece clonando o repositório do projeto:

```
git clone https://github.com/Capati/express-weather.git && cd express-weather
```

Antes de testar o exemplo você precisa obter as chaves de API do Google Maps e do OpenWeather, por questão de segurança eu não compartilhei as minhas chaves. Após obter a sua, crie uma pasta chamada `config`e dentro um arquivo de configuração chamado `apiKeys.js` da seguinte forma:

```js
const appKeys = {
  google: "sua_chave",
  openweather: "sua_chave",
};

module.exports = appKeys;
```

Se não quiser usar um arquivo de configuração bastar remover o carregamento do módulo no arquivo `app.js` e editar as variáveis `appKeys` diretamente.

Para finalizar:

```
npm install
npm start
```
