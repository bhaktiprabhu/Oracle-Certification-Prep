# Oracle Certification Prep - Study Data

This Markdown file is an export of the flashcard data from `script.js` for use as a source document in Gemini Notebook or similar AI-based study workflows.

---

## 1. DB Architecture

### 1. What is the difference between Logical and Physical storage?

- Answer: Logical = How we view data (Tables/Columns). Physical = How the OS stores it (Datafiles/Blocks).
- Explanation: Logical storage is the abstraction provided by the database (Tablespaces, Segments, Extents). It is what developers interact with. Physical storage refers to the actual files on the operating system's disk (Datafiles, OS Blocks) managed by the database engine.

### 2. What is the core goal of the Relational Model?

- Answer: Data Independence. You can query a table without knowing where it physically lives on the disk.
- Explanation: Data Independence means the application logic (your SQL queries) is separated from the physical data storage. If a DBA moves a table to a new hard drive, your query does not need to change.

---

## 2. Retrieval & Sorting

### 3. What is the strict SQL Execution Order?

- Answer: 1. FROM, 2. WHERE, 3. GROUP BY, 4. HAVING, 5. SELECT, 6. ORDER BY
- Explanation: The database engine processes rows before formatting output. It must locate tables, filter raw rows, group them, filter the groups, then select final columns and sort them.

### 4. How do you use q-quotes?

- Answer: To safely print strings with apostrophes. Example: `q'[It's a test]'`
- Explanation: The Alternative Quote (q) operator allows you to use single quotes inside a literal string without confusing the SQL parser.

### 5. What is the result of ANY arithmetic operation involving a NULL value?

- Answer: Always NULL.
- Explanation: NULL represents an unknown value, not zero. Therefore, `100 + NULL = NULL`.

### 6. What is the default ORDER BY behavior for NULLs?

- Answer: ASC places NULLs LAST; DESC places NULLs FIRST.
- Explanation: In Oracle, NULL values are treated as the largest possible value for sorting.

### 7. When do you use Double Quotes vs Single Quotes?

- Answer: Double Quotes for column aliases; Single Quotes for literal strings.
- Example: `SELECT last_name AS "Employee Name" FROM emp WHERE job = 'CLERK';`

### 8. What is the difference between `&` and `&&` substitution variables?

- Answer: `&` prompts the user every time; `&&` prompts once and stores the value for the session.
- Explanation: `&&` acts as a temporary constant for that session.

### 9. What does the DEFINE command do?

- Answer: Hardcodes a substitution variable at the top of a script without prompting the user.
- Example: `DEFINE my_dept = 10; SELECT * FROM employees WHERE department_id = &my_dept;`

### 10. What does SET VERIFY ON do?

- Answer: Forces the client to print the old and new script lines when variables are executed.
- Explanation: It shows the exact SQL before and after substitution to help debugging.

### 11. What does the FETCH FIRST ... WITH TIES clause do?

- Answer: Returns the exact row limit plus any extra rows that share the same sort value as the final row.
- Example: `SELECT last_name, salary FROM emp ORDER BY salary DESC FETCH FIRST 3 ROWS WITH TIES;`

### 12. What is the purpose of the OFFSET clause?

- Answer: It skips a specified number of rows before beginning to return the result set.
- Example: `SELECT last_name FROM emp ORDER BY salary DESC OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY;`

### 13. In the Row Limiting clause, can you use FETCH FIRST after an OFFSET?

- Answer: Yes. `FIRST` and `NEXT` are exact synonyms.
- Explanation: `OFFSET 5 ROWS FETCH FIRST 10 ROWS` is valid.

### 14. Can you use the keyword LAST to fetch the bottom rows?

- Answer: No. The `LAST` keyword does not exist in the Row Limiting Clause.
- Explanation: To get the bottom records, reverse your `ORDER BY` logic and use `FETCH FIRST`.

---

## 3. Functions & Aggregation

### 15. What does TRUNC(SYSDATE, 'YEAR') return?

- Answer: January 1st of the current year.

### 16. What is a highly tested use case for the MOD function?

- Answer: Finding even/odd numbers; for example, `MOD(salary, 2) = 0`.

### 17. What is the strict rule for NVL data types?

- Answer: Both arguments inside `NVL(arg1, arg2)` must be the exact same data type.
- Explanation: `NVL(commission_pct, 'None')` is invalid if `commission_pct` is a number.

### 18. How does COALESCE differ from NVL?

- Answer: `NVL` takes exactly two arguments; `COALESCE` takes unlimited arguments and returns the first non-null value.

### 19. What does NULLIF(a, b) return if the values match?

- Answer: It returns NULL.
- Example: `SELECT 100 / NULLIF(divisor, 0) FROM my_table;`

### 20. Which group function does NOT ignore NULL values?

- Answer: `COUNT(*)` counts all rows, including NULLs.

### 21. How does COUNT(column_name) handle NULLs?

- Answer: It ignores NULL values and counts only rows where that column is not null.

### 22. What do the AVG() and MAX() functions do?

- Answer: AVG calculates the mathematical average; MAX returns the highest value in a set.

### 23. What is the strict rule connecting SELECT and GROUP BY?

- Answer: If a column in your SELECT list is not inside an aggregate function, it must be listed in the GROUP BY clause.

### 24. What is the difference between WHERE and HAVING?

- Answer: WHERE filters rows before grouping; HAVING filters groups after aggregation.
- Example: `SELECT dept_id, AVG(sal) FROM emp GROUP BY dept_id HAVING AVG(sal) > 5000;`

### 25. What major GROUP BY upgrade was introduced in Oracle 23ai?

- Answer: You can now use column aliases inside the GROUP BY and HAVING clauses.

---

## 4. Joins

### 26. What causes an ORA-00918 (Ambiguous Column) error?

- Answer: Joining tables with a shared column name without using a table alias prefix.

### 27. What is the strict rule when using the ANSI USING clause?

- Answer: You are forbidden from putting a table prefix anywhere in the query for the join column.

### 28. Where does the Oracle `(+)` operator go in an outer join?

- Answer: Always on the deficient side—the table missing the data.

### 29. Why will the query `FROM emp SELF JOIN emp` fail?

- Answer: SELF JOIN is not a real keyword. Use standard JOIN with aliases.

### 30. Why can't you use the USING clause in a Non-Equijoin?

- Answer: Because there are no exactly matching column names; use ON instead.

### 31. What causes a Cartesian Product?

- Answer: Accidentally omitting a join condition or WHERE clause.

### 32. What is a NATURAL JOIN?

- Answer: An automatic join that links tables using all columns with the same name and compatible data type.
- Warning: This can join on unrelated columns by accident.

### 33. What does a FULL OUTER JOIN do?

- Answer: Returns all matched rows, plus all unmatched rows from both left and right tables.

### 34. What happens in an INNER JOIN if no rows match the condition?

- Answer: It returns an empty result set with zero rows.

---

## 5. Subqueries

### 35. What causes a Subquery ORA-01427 Error?

- Answer: A single-row subquery using standard comparison operators returns multiple rows.

### 36. What is a Multiple-Column Subquery?

- Answer: A subquery that returns more than one column, requiring simultaneous comparison of multiple values.

### 37. What is the NOT IN and NULL Trap?

- Answer: If a multiple-row subquery using NOT IN returns a single NULL value, the outer query returns zero rows.

### 38. What is the synonym for the `= ANY` operator?

- Answer: It is mathematically identical to `IN`.

### 39. What is the UPDATE SET Alias Trap?

- Answer: Oracle strictly forbids prefixing the target column in the SET clause with a table alias.

### 40. What is the MERGE statement used for?

- Answer: It is a modern alternative to correlated subqueries for modifying data, useful for upsert operations.

### 41. What are Updatable Inline Views?

- Answer: Oracle proprietary syntax that allows updating the result of a SELECT statement joining two tables.

---

## 6. Set Operators

### 42. What is the rule for columns in Set Operators?

- Answer: The number of columns and their data types must match exactly across all queries being combined.

### 43. How are output column names determined in Set Operators?

- Answer: The column names in the final output are determined by the first SELECT statement only.

### 44. What is the difference between UNION and UNION ALL?

- Answer: UNION removes duplicates and implicitly sorts; UNION ALL keeps duplicates and avoids sorting.

### 45. What is the difference between INTERSECT and INTERSECT ALL?

- Answer: INTERSECT returns unique common rows; `INTERSECT ALL` does not exist in Oracle.

### 46. How do Set Operators handle NULLs?

- Answer: Two NULL values are treated as equal when comparing rows for duplicates and matches.

### 47. What is the ANSI standard synonym for the MINUS operator?

- Answer: `EXCEPT`.

### 48. What are Dummy Columns in Set Operators?

- Answer: They are used to balance column counts when different queries have a different number of columns.

### 49. What is the ORDER BY rule in Set Operators?

- Answer: Only one ORDER BY clause is allowed, and it must appear only at the end of the final statement.

### 50. What is the Implicit Sort Trap?

- Answer: UNION implicitly sorts, but you should still use explicit ORDER BY when strict ordering matters.

---

## 7. DML Statements

### 51. What is the difference between Explicit and Implicit INSERT?

- Answer: Explicit lists columns; implicit inserts values in table order.

### 52. How do you use the DEFAULT keyword in INSERT?

- Answer: Type `DEFAULT` directly in the VALUES list.
- Example: `INSERT INTO emp (id, hire_date) VALUES (100, DEFAULT);`

### 53. What triggers an Implicit Commit?

- Answer: Running any DDL or DCL statement automatically commits pending DML.

### 54. What is Read Consistency in Oracle?

- Answer: Before a COMMIT, only your session sees your uncommitted changes; others see the old data.

### 55. How does UNIQUE handle NULL values?

- Answer: A UNIQUE constraint allows multiple NULL values because NULL is treated as distinct.

### 56. What is the PRIMARY KEY rule?

- Answer: NOT NULL + UNIQUE. A table can have exactly one primary key.

### 57. Why is constraint naming a best practice?

- Answer: It creates readable, debuggable error messages.

---

## 8. DDL

### 58. What is a Foreign Key?

- Answer: A column that references the primary or unique key of another table.

### 59. What does a CHECK constraint do?

- Answer: Verifies column values satisfy a condition before insert or update.

### 60. What is the CLOB data type?

- Answer: Character Large Object, used for very large text data.

### 61. What is the difference between VARCHAR2 and CHAR?

- Answer: VARCHAR2 is variable length; CHAR is fixed length and pads with spaces.

### 62. What are the size rules for VARCHAR2 vs CHAR?

- Answer: VARCHAR2 requires a size; CHAR can omit a size and default to `CHAR(1)`.

### 63. What is the Namespace Rule in Oracle?

- Answer: Tables and Views share the same namespace; you cannot create both with the same name.

### 64. What is the NOT NULL constraint rule?

- Answer: It must be defined at the column level.

### 65. How do you define a Composite Key constraint?

- Answer: Use table-level syntax with multiple columns.
- Example: `CONSTRAINT pk_emp_dept PRIMARY KEY (emp_id, dept_id)`

### 66. What is the difference between a View and a Sequence?

- Answer: A view is a saved query; a sequence auto-generates unique numbers.

### 67. What is the difference between DROP COLUMN and SET UNUSED?

- Answer: DROP physically removes data and is slower; SET UNUSED hides the column logically without immediate physical deletion.

### 68. What are the rules for TRUNCATE TABLE?

- Answer: It is a DDL statement; it deletes all rows instantly and cannot be rolled back.

### 69. How do Global Temporary Tables (GTT) work?

- Answer: The table structure is permanent, but row data is private to the session.

### 70. What does ON COMMIT PRESERVE ROWS do?

- Answer: It keeps private GTT data alive through commits until the session ends.

### 71. What are the restrictions on External Tables?

- Answer: They are read-only and do not support standard DML or index creation.

### 72. What is ORGANIZATION EXTERNAL?

- Answer: It maps a table to an OS flat file using an access driver.

### 73. What does WITH CHECK OPTION do on a view?

- Answer: It prevents DML that would make a row disappear from the view.

---

## 9. Indexes, Synonyms & Sequences

### 74. What is the primary purpose of a Synonym?

- Answer: To provide an alternative name for an object and hide the schema owner.

### 75. What is the rule for Sequence CURRVAL?

- Answer: You must call NEXTVAL at least once in the current session before CURRVAL is valid.

### 76. What does Identity Column Strict Mode do?

- Answer: `GENERATED ALWAYS AS IDENTITY` forces the database to reject manual user inserts.

---

## 10. Controlling User Access

### 77. What is the difference between System and Object privileges?

- Answer: System privileges are database-wide; Object privileges are for specific objects and require the `ON` keyword.

### 78. What is the difference between WITH GRANT OPTION and WITH ADMIN OPTION?

- Answer: GRANT OPTION is for object privileges; ADMIN OPTION is for system privileges.

### 79. What is the 3-Step Process for Roles?

- Answer: 1) Create the role, 2) Grant privileges to it, 3) Grant the role to users.

---

## 11. Data Dictionary & Time Zones

### 80. What do the Data Dictionary prefixes USER_, ALL_, DBA_ mean?

- Answer: USER_= objects you own; ALL_ = objects you can access; DBA_ = every object in the database.

### 81. What is the difference between Session and Server time zone functions?

- Answer: CURRENT_/LOCAL functions use the session time zone; SYS functions like SYSDATE use the server OS time.

### 82. What does CURRENT_TIMESTAMP return?

- Answer: The session date, fractional seconds, and time zone offset.

### 83. What are the two INTERVAL Data Types?

- Answer: `INTERVAL YEAR TO MONTH` and `INTERVAL DAY TO SECOND`.

---

## Study Summary

This set of Oracle SQL flashcards covers the most important testable topics, including:

- DB architecture and data independence
- Retrieval, sorting, and row limiting
- Numeric/date functions and aggregation
- Joins and subqueries
- Set operators and DML/DDL rules
- Security, metadata, and timezone behavior

This document is structured for AI-assisted study, summarization, and question generation in Gemini Notebook.
