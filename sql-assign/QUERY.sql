-- =========================================================================
-- SYSTEM: Football Ticket Booking System Database Setup Template
-- DESCRIPTION: Pseudo-DDL Template for Table Creation & Data Insertion
-- INSTRUCTIONS: Replace 'TYPE' and the constraint placeholders with your own
--               actual data types, relational keys, and check criteria.
-- =========================================================================
-- DROP TABLES IF THEY ALREADY EXIST TO PREVENT CONFLICTS
DROP TABLE IF EXISTS Bookings;

DROP TABLE IF EXISTS Matches;

DROP TABLE IF EXISTS Users;

-- =========================================================================
-- 1. CREATE USERS TABLE
-- =========================================================================
CREATE TABLE
    Users (
        user_id INT,
        full_name VARCHAR(16) NOT NULL,
        email VARCHAR(32) NOT NULL,
        role VARCHAR(16) NOT NULL,
        phone_number VARCHAR(20) NULL,
        PRIMARY KEY (user_id),
        UNIQUE (email),
        CHECK (role IN ('Football Fan', 'Ticket Manager'))
    );

-- =========================================================================
-- 2. CREATE MATCHES TABLE
-- =========================================================================
CREATE TABLE
    Matches (
        match_id INT,
        fixture VARCHAR(32) NOT NULL,
        tournament_category VARCHAR(16) NOT NULL,
        base_ticket_price DECIMAL(10, 2) NOT NULL,
        match_status VARCHAR(16) NOT NULL,
        PRIMARY KEY (match_id),
        CHECK (base_ticket_price >= 0),
        CHECK (
            match_status IN (
                'Available',
                'Sold Out',
                'Selling Fast',
                'Postponed'
            )
        )
    );

-- =========================================================================
-- 3. CREATE BOOKINGS TABLE
-- =========================================================================
CREATE TABLE
    Bookings (
        booking_id INT,
        user_id INT NOT NULL,
        match_id INT NOT NULL,
        seat_number VARCHAR(10),
        payment_status VARCHAR(10),
        total_cost DECIMAL(10, 2) NOT NULL,
        -- Write your constraint to make 'booking_id' the Primary Key
        PRIMARY KEY (booking_id),
        -- Write your Foreign Key constraint linking 'user_id' to the Users table
        FOREIGN KEY (user_id) REFERENCES Users (user_id),
        -- Write your Foreign Key constraint linking 'match_id' to the Matches table
        FOREIGN KEY (match_id) REFERENCES Matches (match_id),
        -- Write your check constraint to ensure 'total_cost' is non-negative
        CHECK (total_cost >= 0),
        -- Write your check constraint to restrict 'payment_status' values
        CHECK (
            payment_status IN ('Pending', 'Confirmed', 'Cancelled', 'Refunded')
        )
    );

-- =========================================================================
-- DATA SEEDING: INSERT SAMPLE DATA INTO USERS
-- =========================================================================
INSERT INTO
    Users (user_id, full_name, email, role, phone_number)
VALUES
    (
        1,
        'Tanvir Rahman',
        'tanvir@mail.com',
        'Football Fan',
        '+8801711111111'
    ),
    (
        2,
        'Asif Haque',
        'asif@mail.com',
        'Football Fan',
        '+8801722222222'
    ),
    (
        3,
        'Sajjad Rahman',
        'sajjad@mail.com',
        'Ticket Manager',
        '+8801733333333'
    ),
    (
        4,
        'Jannat Ara',
        'jannat@mail.com',
        'Football Fan',
        NULL
    );

-- =========================================================================
-- DATA SEEDING: INSERT SAMPLE DATA INTO MATCHES
-- =========================================================================
INSERT INTO
    Matches (
        match_id,
        fixture,
        tournament_category,
        base_ticket_price,
        match_status
    )
VALUES
    (
        101,
        'Real Madrid vs Barcelona',
        'Champions League',
        150.00,
        'Available'
    ),
    (
        102,
        'Man City vs Liverpool',
        'Premier League',
        120.00,
        'Selling Fast'
    ),
    (
        103,
        'Bayern Munich vs PSG',
        'Champions League',
        130.00,
        'Available'
    ),
    (
        104,
        'AC Milan vs Inter Milan',
        'Serie A',
        90.00,
        'Sold Out'
    ),
    (
        105,
        'Juventus vs Roma',
        'Serie A',
        80.00,
        'Available'
    );

-- =========================================================================
-- DATA SEEDING: INSERT SAMPLE DATA INTO BOOKINGS
-- =========================================================================
INSERT INTO
    Bookings (
        booking_id,
        user_id,
        match_id,
        seat_number,
        payment_status,
        total_cost
    )
VALUES
    (501, 1, 101, 'A-12', 'Confirmed', 150.00),
    (502, 1, 102, 'B-04', 'Confirmed', 120.00),
    (503, 2, 101, 'A-13', 'Confirmed', 150.00),
    (504, 2, 101, NULL, NULL, 150.00),
    (505, 3, 102, 'C-20', 'Pending', 120.00);

-- Query 1: Retrieve all upcoming football matches belonging to the 'Champions League' where the match status is 'Available'.

SELECT
    m.match_id,
    m.fixture,
    m.base_ticket_price
FROM
    Matches m
WHERE
    m.tournament_category = 'Champions League'
    AND m.match_status = 'Available';

-- Query 2: Search for all users whose full names start with 'Tanvir' or contain the phrase 'Haque' (case-insensitive).

SELECT
    u.user_id,
    u.full_name,
    u.email
FROM
    Users u
WHERE
    u.full_name LIKE 'Tanvir%'
    OR u.full_name LIKE '%Haque%';

-- Query 3: Retrieve all booking records where the payment status is missing (`NULL`), replacing the empty result with 'Action Required'.

SELECT
    booking_id,
    user_id,
    match_id,
    seat_number,
    COALESCE(payment_status, 'Action Required') AS payment_status,
    total_cost
FROM
    Bookings
WHERE
    payment_status IS NULL;

-- Query 4: Retrieve match booking details along with the User's full name and the scheduled Match fixture teams.

SELECT
    b.booking_id,
    u.full_name,
    m.fixture,
    b.total_cost
FROM
    Bookings b
    JOIN Users u ON b.user_id = u.user_id
    JOIN Matches m ON b.match_id = m.match_id;

-- Query 5: Display a comprehensive list of all users and their booking IDs, ensuring that fans who have *never* bought a ticket are still listed.

SELECT
    u.user_id,
    u.full_name,
    b.booking_id
FROM
    Users u
    LEFT JOIN Bookings b ON u.user_id = b.user_id;

-- Query 6: Find all ticket bookings where the total cost is strictly higher than the average cost of all ticket bookings.

SELECT
    b.booking_id,
    b.match_id,
    b.total_cost
FROM
    Bookings b
WHERE
    b.total_cost > (
        SELECT
            AVG(total_cost)
        FROM
            Bookings
    );

-- Query 7: Retrieve the top 2 most expensive matches sorted by base ticket price, skipping the absolute highest premium match.

SELECT
    m.match_id,
    m.fixture,
    m.base_ticket_price
FROM
    Matches m
WHERE
    m.base_ticket_price < (
        SELECT
            MAX(base_ticket_price)
        FROM
            Matches
    )
ORDER BY
    m.base_ticket_price DESC
LIMIT
    2;