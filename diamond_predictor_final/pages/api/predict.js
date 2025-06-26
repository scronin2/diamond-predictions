export default async function handler(req, res) {
  const { message } = req.body;

  // Mock response from AI for now
  const mockReply = `You asked: "${message}". Here's a basic betting tip: Look at the pitching matchups and line movement.`;

  res.status(200).json({ reply: mockReply });
}
