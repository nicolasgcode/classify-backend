import { CoursePurchaseRecord } from '../entities/coursePurchaseRecord.entity.js';
import { User } from '../entities/user.entity.js';
import { Course } from '../entities/course.entity.js';
import { orm } from './../shared/orm.js';

const em = orm.em;

interface PurchaseData {
  userId: number;
  data: { id: number; name: string; price: number }[]; // Datos de los cursos a comprar
}

export async function handlePurchase({ userId, data }: PurchaseData) {
  try {
    const user = await em.findOne(User, { id: userId });

    if (!user) {
      throw new Error('User not found');
    }

    const courses = await em.find(
      Course,
      {
        id: { $in: data.map((item) => item.id) },
      },
      {
        populate: ['topics', 'units'],
      }
    );

    // Create new purchase record
    const purchaseRecord = new CoursePurchaseRecord();
    purchaseRecord.user = user; // Asocia al usuario que está comprando los cursos
    purchaseRecord.purchaseAt = new Date(); // Fecha de la compra
    purchaseRecord.totalAmount = data.reduce(
      (total, item) => total + item.price,
      0
    );

    // Añadir los cursos al registro de compra
    courses.forEach((course) => {
      purchaseRecord.courses.add(course);
    });

    // Persistir el registro de compra y los cursos asociados
    await em.persistAndFlush(purchaseRecord);

    console.log('Compra registrada con éxito');
    console.log('Cursos comprados:', courses);
    console.log('Usuario:', user);
  } catch (error) {
    console.error('Error al procesar la compra:', error);
    throw error;
  }
}
