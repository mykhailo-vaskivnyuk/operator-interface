/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/tab/:par', (req, res) => {
  fetch(`http://10.13.16.80:4445/tab/${req.params.par}`)
    .then((response) => response.json())
    .then((result) => res.json(result))
    .then(() => res.end())
    // eslint-disable-next-line no-console
    .catch((e) => console.log(e));
});

app.all('/:operation', (req, res) => {
  const { operation } = req.params;
  const options = {
    method: req.method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body),
  };
  fetch(`http://10.13.16.80:4445/${operation}`, options)
    .then((response) => response.json())
    .then((result) => res.json(result))
    .then(() => res.end())
    // eslint-disable-next-line no-console
    .catch((e) => console.log(e));
});

app.listen(4445);

/*
POST /create-tab -> возвращает id таба или ошибку если их уже 6
DELETE /delete-tab на вход в бади ожидает айди таба { id: <id> }
POST /create-order-row на вход в бади ожидает айди таба { id: <id> }
PATCH /update-order-row в бади ожидает айди ордера и в свойстве дата обновленный обьект товара { id: <id>, data: <data> }
DELETE /delete-order-row на вход в бади ожидает айди ордера { id: <id> }
GET /tab/:id получить все товары в табе по айди в параметрах
GET /tab/list получить все табы
*/
