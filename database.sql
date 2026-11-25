CREATE DATABASE LibraryManagement;

USE LibraryManagement;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE Books (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    book_name VARCHAR(150) NOT NULL,
    author_name VARCHAR(100) NOT NULL,
    category VARCHAR(100),
    total_copies INT NOT NULL,
    available_copies INT NOT NULL
);

CREATE TABLE IssueRecords (
    issue_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    book_id INT,
    issue_date DATE,
    return_date DATE,
    status VARCHAR(30),

    FOREIGN KEY (user_id) REFERENCES Users(user_id),

    FOREIGN KEY (book_id) REFERENCES Books(book_id)
);

INSERT INTO Books
(book_name, author_name, category, total_copies, available_copies)

VALUES
('Introduction to C++', 'E. Balagurusamy', 'Computer Science', 5, 5),

('HTML and CSS', 'Jon Duckett', 'Computer Science', 4, 4),

('Mathematics', 'R.S. Aggarwal', 'Mathematics', 3, 3),

('Computer Networks', 'Andrew Tanenbaum', 'Computer Science', 5, 5),

('English Literature', 'William Shakespeare', 'Literature', 2, 2);

SELECT * FROM Users;

SELECT * FROM Books;

SELECT * FROM IssueRecords;

SELECT * FROM Books
WHERE available_copies > 0;