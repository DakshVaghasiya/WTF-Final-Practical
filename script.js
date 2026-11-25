let books = JSON.parse(localStorage.getItem("books")) || [
    {
        id: 1,
        name: "Introduction to C++",
        author: "E. Balagurusamy",
        category: "Computer Science",
        total: 5,
        available: 5
    },
    {
        id: 2,
        name: "HTML and CSS",
        author: "Jon Duckett",
        category: "Computer Science",
        total: 4,
        available: 4
    },
    {
        id: 3,
        name: "Mathematics",
        author: "R.S. Aggarwal",
        category: "Mathematics",
        total: 3,
        available: 3
    }
];

let issued = JSON.parse(localStorage.getItem("issued")) || [];

function saveData() {
    localStorage.setItem("books", JSON.stringify(books));
    localStorage.setItem("issued", JSON.stringify(issued));
}

function displayBooks() {
    let list = document.getElementById("bookList");

    let search = document.getElementById("searchBook").value.toLowerCase();

    list.innerHTML = "";

    let filteredBooks = books.filter(function(book) {
        return book.name.toLowerCase().includes(search) ||
               book.author.toLowerCase().includes(search);
    });

    filteredBooks.forEach(function(book) {
        list.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="book-card">
                    <div class="book-icon">📖</div>

                    <h4>${book.name}</h4>

                    <p>Author: ${book.author}</p>

                    <p>Category: ${book.category}</p>

                    <p>Available Copies: ${book.available}</p>

                    <button class="btn btn-primary"
                        onclick="selectBook(${book.id})">
                        Select Book
                    </button>

                </div>
            </div>
        `;
    });

    if (filteredBooks.length === 0) {
        list.innerHTML = "<p class='text-center'>No books found.</p>";
    }

    updateInformation();
    updateBookOptions();
}

function addBook(event) {
    event.preventDefault();

    let name = document.getElementById("bookName").value.trim();

    let author = document.getElementById("authorName").value.trim();

    let category = document.getElementById("category").value;

    let copies = Number(document.getElementById("copies").value);

    if (copies <= 0 || !Number.isInteger(copies)) {
        alert("Enter a valid number of copies.");
        return;
    }

    let newBook = {
        id: Date.now(),
        name: name,
        author: author,
        category: category,
        total: copies,
        available: copies
    };

    books.push(newBook);

    saveData();

    alert("Book Added Successfully!");

    event.target.reset();

    displayBooks();
}

function updateInformation() {
    let total = books.reduce(function(sum, book) {
        return sum + book.total;
    }, 0);

    let available = books.reduce(function(sum, book) {
        return sum + book.available;
    }, 0);

    document.getElementById("totalBooks").innerText = total;

    document.getElementById("availableBooks").innerText = available;

    document.getElementById("issuedBooks").innerText = issued.length;
}

function updateBookOptions() {
    let select = document.getElementById("issueBookName");

    let selectedValue = select.value;

    select.innerHTML = '<option value="">Select Book</option>';

    books.forEach(function(book) {
        if (book.available > 0) {
            let option = document.createElement("option");

            option.value = book.id;

            option.textContent = book.name;

            select.appendChild(option);
        }
    });

    if ([...select.options].some(option => option.value === selectedValue)) {
        select.value = selectedValue;
    }
}

function selectBook(id) {
    document.getElementById("issueBookName").value = id;

    document.getElementById("issueBook").scrollIntoView({
        behavior: "smooth"
    });
}

function issueBook(event) {
    event.preventDefault();

    let student = document.getElementById("studentName").value.trim();

    let bookId = Number(document.getElementById("issueBookName").value);

    let book = books.find(function(item) {
        return item.id === bookId;
    });

    if (!book || book.available <= 0) {
        alert("Book is not available!");
        return;
    }

    book.available--;

    issued.push({
        id: Date.now(),
        student: student,
        bookId: book.id,
        bookName: book.name
    });

    saveData();

    alert("Book Issued Successfully!");

    event.target.reset();

    displayBooks();

    displayIssuedBooks();
}

function displayIssuedBooks() {
    let list = document.getElementById("issuedList");

    list.innerHTML = "";

    if (issued.length === 0) {
        list.innerHTML = `
            <tr>
                <td colspan="3" class="text-center">
                    No books issued yet.
                </td>
            </tr>
        `;

        return;
    }

    issued.forEach(function(item) {
        list.innerHTML += `
            <tr>
                <td>${item.student}</td>

                <td>${item.bookName}</td>

                <td>
                    <button class="btn btn-success btn-sm"
                        onclick="returnBook(${item.id})">
                        Return Book
                    </button>
                </td>

            </tr>
        `;
    });
}

function returnBook(id) {
    let index = issued.findIndex(function(item) {
        return item.id === id;
    });

    if (index === -1) {
        return;
    }

    let book = books.find(function(item) {
        return item.id === issued[index].bookId;
    });

    if (book) {
        book.available++;
    }

    issued.splice(index, 1);

    saveData();

    alert("Book Returned Successfully!");

    displayBooks();

    displayIssuedBooks();
}

function contactUs(event) {
    event.preventDefault();

    alert("Your message has been submitted successfully!");

    event.target.reset();
}

displayBooks();

displayIssuedBooks();