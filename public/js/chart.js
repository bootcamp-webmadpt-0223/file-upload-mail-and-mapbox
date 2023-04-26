const printChart = (labels, data) => {
  const ctx = document.querySelector("#myChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Books rating",
          backgroundColor: "lightblue",
          data
        }
      ]
    }
  });
};

window.addEventListener("load", async () => {
  const { data } = await bookService.getAllBooks();
  const titles = data.map(b => b.title);
  const ratings = data.map(b => b.rating);
  printChart(titles, ratings);
});
