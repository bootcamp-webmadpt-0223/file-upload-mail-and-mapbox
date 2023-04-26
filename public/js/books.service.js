class BooksService {
  constructor() {
    this.api = axios.create({ baseURL: "http://localhost:3000/books" });
  }

  getAllBooks() {
    return this.api.get("/json-list");
  }

  deleteBook(id) {
    return this.api.delete(`/${id}`);
  }
}

const bookService = new BooksService();
