import { Repository } from '../shared/repository.js';
import { Topic } from './topic.entity.js';

const topics = [new Topic('1',  'topic 1')];

export class TopicRepository implements Repository<Topic> {
  public findAll(): Topic[] | undefined {
    return topics;
  }
  public findOne(item: { id: string }): Topic | undefined {
    return topics.find((topic) => topic.id === item.id);
  }

  public add(item: Topic): Topic | undefined {
    topics.push(item);
    return item;
  }

  public update(item: Topic): Topic | undefined {
    const topicIdx = topics.findIndex((topic) => topic.id === item.id);

    if (topicIdx !== -1) {
      topics[topicIdx] = { ...topics[topicIdx], ...item };
    }
    return topics[topicIdx];
  }

  public delete(item: { id: string }): Topic | undefined {
    const topicIdx = topics.findIndex((topic) => topic.id === item.id);
    if (topicIdx !== -1) {
      const deletedTopics = topics[topicIdx];
      topics.splice(topicIdx, 1);
      return deletedTopics;
    }
  }
}
