import { Response } from 'express';
import { Course } from '../entities/course.entity.js';
import { Order } from '../entities/order.entity.js';
import { OrderLine } from '../entities/orderLine.entity.js';
import { User } from '../entities/user.entity.js';
import { orm } from '../shared/orm.js';

const em = orm.em;

async function generateOrder(data: Course[], userId: number, res: Response) {
  try {
    const user = await em.findOne(User, { id: userId });

    if (!user) {
      throw new Error('User not found');
    }

    let totalAmount = 0;

    const order = em.create(Order, {
      user: user,
      status: 'pending',
      orderDate: new Date(),
      total: 0,
    });

    const courses = await em.find(
      Course,
      {
        id: { $in: data.map((item: Course) => item.id) },
      },
      {
        populate: ['topics', 'units'],
      }
    );

    courses.forEach((course: Course) => {
      const subTotal = course.price;
      totalAmount += subTotal;
      const orderLine = em.create(OrderLine, {
        orderDate: new Date(),
        course: course,
        subTotal: course.price,
        order: order,
      });
      order.orderLines.add(orderLine);
    });

    order.total = totalAmount;

    await em.persistAndFlush(order);

    return order;
  } catch (error: any) {
    console.log('Error creating order:', error);
    res.status(500).json({ message: error.message });
  }
}

export { generateOrder };
