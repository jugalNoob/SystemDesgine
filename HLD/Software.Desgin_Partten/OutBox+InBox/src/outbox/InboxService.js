inboxService.js


import Inbox from './inboxModel.js';

export const checkAndProcessInbox = async (event) => {
  const exists = await Inbox.findOne({ messageId: event.id });
  if (exists) return; // already processed

  // 🔹 Business logic
  console.log('Processing event:', event);

  // Mark as processed
  await Inbox.create({ messageId: event.id, processedAt: new Date() });
};
// ⚠️ Things to keep in mind

// Add indexes on Outbox.status, Inbox.eventId, and createdAt for performance.