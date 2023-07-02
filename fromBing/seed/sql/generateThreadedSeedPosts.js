const { v4: uuidv4 } = require("uuid");

const threads = [];

for (let i = 0; i < 10; i++) {
  const thread = {
    id: uuidv4(),
    title: `Thread ${i + 1}`,
    content: `Content for thread ${i + 1}`,
    user_id: uuidv4(),
    parent_id: null,
  };
  threads.push(thread);

  const repliesCount = Math.floor(Math.random() * (10 - 4 + 1)) + 4;
  for (let j = 0; j < repliesCount; j++) {
    const reply = {
      id: uuidv4(),
      title: `Reply ${j + 1} to thread ${i + 1}`,
      content: `Content for reply ${j + 1} to thread ${i + 1}`,
      user_id: uuidv4(),
      parent_id: thread.id,
    };
    threads.push(reply);
  }
}

module.exports = threads;
