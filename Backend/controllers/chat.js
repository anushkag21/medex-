export const createChat = async (req, res) => {
  try {
    res.status(201).send("chatroom");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
