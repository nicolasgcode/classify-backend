import { CoursePurchaseRecord } from '../entities/coursePurchaseRecord.entity.js';
import { User } from '../entities/user.entity.js';
import { Course } from '../entities/course.entity.js';
import { orm } from './../shared/orm.js';

const em = orm.em;

interface PurchaseData {
  userId: number;
  data: { id: number; name: string; price: number }[];
}

export async function handlePurchase({ userId, data }: PurchaseData) {
  try {
    const user = await em.findOne(User, { id: userId });

    const courses = await em.find(Course, {
      id: { $in: data.map((item) => item.id) },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const purchaseRecord = new CoursePurchaseRecord();
    purchaseRecord.user = user;
    purchaseRecord.totalAmount = data.reduce(
      (total, item) => total + item.price,
      0
    );

    purchaseRecord.courses.add(courses);

    user.CoursePurchaseRecords.add(purchaseRecord);

    console.log('Hey', purchaseRecord);

    await em.persistAndFlush(purchaseRecord);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
