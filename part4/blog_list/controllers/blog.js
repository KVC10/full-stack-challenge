const router = require("express").Router();
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const middleware = require("../utils/middleware");

/* const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
}; */

router.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

router.post(
  "/",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const newBlog = request.body;

    /* const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  } */

    const user = request.user;

    if (!user) {
      return response.status(401).json({ error: "user not found" });
    }

    if (!newBlog.likes) {
      newBlog.likes = 0;
    }

    if (!newBlog.title || !newBlog.url) {
      return response.status(400).json({ error: "title and url are required" });
    }
    const blog = new Blog({
      ...newBlog,
      user: user.id,
    });

    const result = await blog.save();
    response.status(201).json(result);
  },
);

router.delete(
  "/:id",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const id = request.params.id;
    const user = request.user;

    if (!user) {
      return response.status(401).json({ error: "user not found" });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return response.status(404).json({ error: "blog not found" });
    }
    if (blog.user.toString() !== user.id.toString()) {
      return response.status(403).json({ error: "forbidden" });
    }

    await Blog.findByIdAndDelete(id);

    response.status(204).end();
  },
);

router.put(
  "/:id",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const id = request.params.id;
    const updatedBlog = request.body;
    const result = await Blog.findByIdAndUpdate(id, updatedBlog, {
      returnDocument: "after",
    });
    response.json(result);
  },
);

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
