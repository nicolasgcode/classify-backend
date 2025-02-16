import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { orm, syncSchema } from './shared/orm.js';
import { courseRouter } from './routes/course.routes.js';
import { coursePurchaseRecordRouter } from './routes/coursePurchaseRecord.routes.js';
import { topicRouter } from './routes/topic.routes.js';
import { RequestContext } from '@mikro-orm/core';
import { userRouter } from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import { fileRouter } from './routes/file.routes.js';
import { unitRouter } from './routes/unit.routes.js';
import { checkoutRouter } from './routes/checkout.routes.js';
import { webhookRouter } from './routes/webhook.routes.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT;

// luego de los middlewares base

app.use(
  cors({
    origin: `${process.env.CLIENT_URL}`,
    credentials: true,
  })
);

app.use((req, res, next) => {
  RequestContext.create(orm.em, next);
});

// antes de las rutas y middlewares de negocio
app.use('/api/webhook', webhookRouter);

//Middlewares
app.use(express.json());

app.use(authRoutes);

app.use('/api/users', userRouter);
app.use('/api/files', fileRouter);
app.use('/api/units', unitRouter);

app.use('/api/courses', courseRouter);
app.use('/api/coursesPurchaseRecords', coursePurchaseRecordRouter);
app.use('/api/topics', topicRouter);
app.use('/api/checkout', checkoutRouter);

app.use((_, res) => {
  res.status(404).send({ message: 'Resource not found' });
});

await syncSchema();

//Server
app.listen(PORT, () => {
  console.log(`Server running on ${process.env.SERVER_URL}`);
});
