import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { orm, syncSchema } from './shared/orm.js';
import { RequestContext } from '@mikro-orm/core';

import { subscriptionRouter } from './routes/subscription.routes.js';
import { subsPurchaseRecordRouter } from './routes/subsPurchaseRecord.routes.js';
import { courseRouter } from './routes/course.routes.js';
import { coursePurchaseRecordRouter } from './routes/coursePurchaseRecord.routes.js';
import { topicRouter } from './routes/topic.routes.js';
import { levelRouter } from './routes/level.routes.js';
import { memberRouter } from './routes/member.routes.js';
import { adminRouter } from './routes/admin.routes.js';
import { unitRouter } from  './routes/unit.routes.js'; 
dotenv.config();

const app = express();

const PORT = 3000; //process.env.PORT;

//configurarlo con el puerto que usa el frotend
//para activarlo hay que ir en la terminal a "PORTS" y poner add port y elegir el puerto donde se ejecuta el back
// y poner click derecho en Visibility y poner public
// o mirar https://www.youtube.com/shorts/QGl_DnUDB4w
app.use(cors({
  origin: 'http://localhost:5173', // Permitir solicitudes solo desde tu aplicación frontend
}));

// luego de los middlewares base


app.use((req, res, next) => {
  RequestContext.create(orm.em, next);
});

// antes de las rutas y middlewares de negocio

//Middlewares
app.use(express.json());

app.use('/api/subscriptions', subscriptionRouter);
app.use('/api/subscriptions/purchaseRecords', subsPurchaseRecordRouter);
app.use('/api/members', memberRouter);
app.use('/api/admins', adminRouter);
app.use('/api/levels', levelRouter);
app.use('/api/courses', courseRouter);
app.use('/api/course/purchaseRecords', coursePurchaseRecordRouter);
app.use('/api/topics', topicRouter);
app.use('/api/unities', unitRouter);

app.use((_, res) => {
  res.status(404).send({ message: 'Resource not found' });
});

await syncSchema();

//Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
