const express = require("express");

// Data import
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");
// const { route } = require("./users");

// Local Router
const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Decsription: Get All Books
 * Access: Public
 * Paramaters: None
 */
router.get("/", (req, res)=>{
    res.status(200).json({success: true, data: books});
})


/**
 * Route: /books/:id
 * Method: GET
 * Decsription: Get Book By Its Id
 * Access: Public
 * Paramaters: ID
 */
router.get("/:id", (req, res)=>{
    const {id} = req.params;
    const book = books.find((each)=>each.id === id);

    if(!book){
        return res.status(404).json({
            success: false,
            message: "Book Does Not Exist"
        })
    }
    return res.status(200).json({
        success: true,
        data: book
    })
})


/**
 * Route: /books/issued/by-user
 * Method: GET
 * Decsription: Get all issued books
 * Access: Public
 * Paramaters: None
 */
router.get("/issued/by-user", (req, res)=>{
    const usersWithIssuedBooks = users.filter((each)=>{
        if(each.issuedBook) return each;
    });

    const issuedBooks = [];

    usersWithIssuedBooks.forEach((each)=>{
        const book = books.find((book)=> book.id === each.issuedBook);


        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);
    });
    if(issuedBooks.length === 0){
        return res.status(404).json({success: false, message: "No books issued yet."});
    }
    return res.status(200).json({success: true, data: issuedBooks})

})


/**
 * Route: /books
 * Method: POST
 * Decsription: Create/Add a new Book
 * Access: Public
 * Paramaters: None
 * Data: Author, Name, Genre, Price, Publisher, Id
 */
router.post("/", (req, res)=>{
    const {data} = req.body;

    if(!data){
        return res.status(400).json({
            success: false,
            message: "No data provided to add a book"
        })
    }

    const book = books.find((each)=> each.id === data.id);

    if(book){
        return res.status(404).json({success: false, message: "Book with the given ID already exists"})
    }

    const allBooks = [...books, data];
    return res.status(200).json({success: true, data: allBooks})
})


/**
 * Route: /books/:id
 * Method: PUT
 * Decsription: Update a Bookk By Its ID
 * Access: Public
 * Paramaters: Id
 */
router.put("/:id", (req, res)=>{
    const {id} = req.params;
    const {data} = req.body;

    const book = books.find((each)=> each.id === id);

    if(!book){
        return res.status(400).json({success: false, message: "Book with the given Id doesn't exist"});
    }

    const updatedBook = books.map((each)=>{
        if(each.id===id){
            return {
                ...each,
                ...data,
            }
        }
        return each;
    })
    return res.status(200).json({
        success: true,
        data: updatedBook
    })
})

// Default Export
module.exports = router;