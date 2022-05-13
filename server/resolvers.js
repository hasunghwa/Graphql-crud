import Book from "./models/Book.js";

const resolvers = {
  Query: {
    getBooks: async () => {
      const books = await Book.find();
      return books;
    },
    getBook: async (root, args) => {
      const book = await Book.findById(args.id);
      return book;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const newBook = new Book({
        title: args.title,
        author: args.author,
      });
      await newBook.save();
      return newBook;
    },
    deleteBook: async (root, args) => {
      await Book.findByIdAndDelete(args.id);
      return "Delete Success";
    },
    updateBook: async (root, args) => {
      const { id, title, author } = args;
      const updatedBook = {};
      if (title !== undefined) {
        updatedBook.title = title;
      }
      if (author !== undefined) {
        updatedBook.author = author;
      }
      const book = await Book.findByIdAndUpdate(id, updatedBook, { new: true });
      return book;
    },
  },
};

export default resolvers;
