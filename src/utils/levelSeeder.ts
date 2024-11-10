import { orm } from '../shared/orm.js';
import { Level } from '../entities/level.entity.js';

const em = orm.em.fork();

async function seedLevels() {
  const levels = [
    {
      id: 1,
      name: 'Principiante',
      description: 'Nivel adecuado para quienes están comenzando en el tema.',
    },
    {
      id: 2,
      name: 'Intermedio',
      description:
        'Nivel para quienes tienen algo de experiencia y desean profundizar.',
    },
    {
      id: 3,
      name: 'Avanzado',
      description:
        'Nivel para expertos que buscan dominar el tema en profundidad.',
    },
  ];

  // Insertar los niveles
  for (const level of levels) {
    const newLevel = em.create(Level, level);
    await em.persistAndFlush(newLevel);
  }

  console.log('Niveles insertados correctamente con los IDs 1, 2 y 3');
}

seedLevels().catch((err) => console.error('Error al poblar niveles:', err));
