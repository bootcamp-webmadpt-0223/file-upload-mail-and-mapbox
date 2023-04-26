window.addEventListener("load", () => {
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach(button => {
    button.addEventListener("click", async event => {
      // Getting the id of the book
      const id = event.currentTarget.children[0].innerHTML;
      // Delete element from DOM (currentTarget only exists before executing async functions)
      event.currentTarget.closest(".book-row").remove();
      // Deleting the book from DB
      await bookService.deleteBook(id);
    });
  });
});
