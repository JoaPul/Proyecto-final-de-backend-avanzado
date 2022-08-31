import express from 'express';

const api = express();
api.use(express.json());

// PRUEBA DE CONECCIÓN
api.get('/status', (_, res) => {
  return res.json({
    msg: 'API funcionando',
  })
});



export default api;