import { Repository } from '../shared/repository.js';
import { User } from './user.entity.js';

const users = [new User('1', '1828347', 'Matt', 'Tuck', 'bfmv@gmail.com')];

export class UserRepository implements Repository<User> {
  public findAll(): User[] | undefined {
    return users;
  }
  public findOne(item: { id: string }): User | undefined {
    return users.find((user) => user.id === item.id);
  }

  public add(item: User): User | undefined {
    users.push(item);
    return item;
  }

  public update(item: User): User | undefined {
    const userIdx = users.findIndex((user) => user.id === item.id);

    if (userIdx !== -1) {
      users[userIdx] = { ...users[userIdx], ...item };
    }
    return users[userIdx];
  }

  public delete(item: { id: string }): User | undefined {
    const userIdx = users.findIndex((user) => user.id === item.id);
    if (userIdx !== -1) {
      const deletedUsers = users[userIdx];
      users.splice(userIdx, 1);
      return deletedUsers;
    }
  }
}
