/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/list', (req, res) => {
  let query = req.query.searchIndex;
  if (query) query = `?searchIndex=${encodeURI(query)}`;
  else query = '';
  fetch(`http://10.13.16.80:4444/list${query}`)
    .then((response) => response.json())
    .then((result) => res.json(result))
    .then(() => res.end());
  // eslint-disable-next-line no-console
  // .catch((e) => console.log(e));
});

app.get('/search', (req, res) => {
  fetch(`http://10.13.16.80:4444/search?id=${encodeURI(req.query.id)}`)
    .then((response) => response.json())
    .then((result) => res.json(result))
    .then(() => res.end());
  // eslint-disable-next-line no-console
  // .catch((e) => console.log(e));
});

app.listen(4444);

/*
POST /create-tab -> возвращает id таба или ошибку если их уже 6
DELETE /delete-tab на вход в бади ожидает айди таба { id: <id> }
POST /create-order-row на вход в бади ожидает айди таба { id: <id> }
PATCH /update-order-row в бади ожидает айди ордера и в свойстве дата обновленный обьект товара { id: <id>, data: <data> }
DELETE /delete-order-row на вход в бади ожидает айди ордера { id: <id> }
GET /tab/:id получить все товары в табе по айди в параметрах
GET /tab/list получить все табы
*/
