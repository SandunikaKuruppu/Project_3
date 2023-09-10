const express = require("express");

// Importing Routes
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

const app = express();

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res)=>{
    res.status(200).json({
        message: "Server is up and running sucessfully",
    });
});

app.use("/users", usersRouter);
app.use("/books", booksRouter)



app.get("*",(req, res)=>{
    res.status(404).json({
        message: "This route doesn't exist",
    });
})

app.listen(PORT, ()=>{
    console.log(`Server is up and running at PORT ${PORT}`);
})