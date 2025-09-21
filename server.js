const express = require('express');
const app  = express();
const PORT = 3000;

let books = [
    { id: 1, title: "The Hobbit", author: "J.K Tolkien", genre: "Fiction"},
    { id: 2, title: "Clean Code", author: "Robert C. Martin", genre: "Programming" },
    { id: 3, title: "Atomic Habits", author: "James Clear", genre: "Self-help" },
    { id: 4, title: "The Pragmatic Programmer", author: "Andrew Hunt", genre: "Programming" }
];

app.use(express.json()); 

app.get('/',(req,res) => {
    res.send('Welcom to the Book API');
});

app.get('/search',(req,res)=>{
    const { title, author, genre } = req.query;
    let results = books;

    if (title) results = results. filter(b => b.title.toLowerCase().includes(title.toLowerCase()));
    if (author) results = results.filter(b => b.author.toLowerCase().includes(author.toLowerCase()));
    if (genre) results = results.filter(b => b.genre.toLowerCase() === genre.toLowerCase());
     res.json(results);
});

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}/books`);
});

app.get('/books', (req, res) => {
  res.json(books);
});

app.get('/books/:id', (req, res) => {
    const book = books.find(b=> b.id === parseInt(req.params.id));
    book ? res.json(book) : res.status(404).json({message: 'Book not found'})
});

app.post('/books', (req,res)=>{
    const newBook = {
        id : books.length -1,
        title: req.body.title,
        author:req.body.author,
        genre:req.body.genre
    };
    books.push(newBook);
    res.status(201).json(newBook);
})

app.put('/book/:id',(req,res)=>{
const book = books.find(b=>b.id === parseInt(req.params.id));
if (!book) return res.status(404).json({message: 'Book not found'});

    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.genre = req.body.genre || book.genre;

    res.json(book);
});

app.delete('/books/:id',(req,res) => {
    books = books.filter(b => b.id !== parseInt(rep.params.id));
    res.json({ message: 'Book deleted !'});
});

app.use((err, req,res, next) => {
    console.error(err.stack);
    res.status(500).json({message: "Something went wrong !"})
});