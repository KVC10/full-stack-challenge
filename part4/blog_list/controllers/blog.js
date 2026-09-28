const router = require("express").Router();
const Blog = require("../models/blog");

router.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

router.post("/", async (request, response) => {
  const newBlog = request.body;
  if (!newBlog.likes) {
    newBlog.likes = 0;
  }

  if (!newBlog.title || !newBlog.url) {
    return response.status(400).json({ error: "title and url are required" });
  }
  const blog = new Blog(newBlog);

  const result = await blog.save();
  response.status(201).json(result);
});

router.delete("/:id", async (request, response) => {
  const id = request.params.id;
  await Blog.findByIdAndDelete(id);
  response.status(204).end();
});

router.put("/:id", async (request, response) => {
  const id = request.params.id;
  const updatedBlog = request.body;
  const result = await Blog.findByIdAndUpdate(id, updatedBlog, {
    returnDocument: "after",
  });
  response.json(result);
});

/* const updatedUser = await User.findOneAndUpdate(
  { email: 'test@example.com' },
  { $set: { name: 'Nouveau Nom' } },
  { returnDocument: 'after' } // Renvoie le document mis à jour
); */

/* const userId = '60d5ec49f123456789abcdef';
const updateData = { status: 'actif', Age: 30 };

const updatedUser = await User.findByIdAndUpdate(
  userId, 
  updateData, 
  { returnDocument: 'after' } // Indique à Mongoose de renvoyer la version modifiée
);

console.log(updatedUser); // Affiche le document avec le statut 'actif' et l'âge 30 */

/* 
const jwt = require('jsonwebtoken')

// ...

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

notesRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(400).json({ error: 'UserId missing or not valid' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user._id
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  response.status(201).json(savedNote)
})

*/

module.exports = router;
