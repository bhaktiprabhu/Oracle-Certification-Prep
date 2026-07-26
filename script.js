const flashcards = [
    {
        "topic": "1. DB Architecture",
        "q": "What is the difference between Logical and Physical storage?",
        "a": "Logical = How we view data (Tables/Columns).<br>Physical = How the OS stores it (Datafiles/Blocks).",
        "wrong_a": "Logical = How the OS stores it (Datafiles/Blocks).<br>Physical = How we view data (Tables/Columns).",
        "explanation": "<b>Logical storage</b> is the abstraction provided by the database (Tablespaces, Segments, Extents). It's what developers interact with. <b>Physical storage</b> refers to the actual files on the operating system's disk (Datafiles, OS Blocks) that the database engine manages."
    },
    {
        "topic": "1. DB Architecture",
        "q": "What is the core goal of the Relational Model?",
        "a": "Data Independence! You can query a table without knowing where it physically lives on the disk.",
        "wrong_a": "Hardware Dependence! You must specify the physical track and sector on the disk to query data.",
        "explanation": "<b>Data Independence</b> means the application logic (your SQL queries) is separated from the physical data storage. If a DBA moves a table to a new hard drive, your <code>SELECT * FROM employees;</code> query doesn't need to change."
    },
    {
        "topic": "2. Retrieval & Sorting",
        "q": "What is the strict SQL Execution Order?",
        "a": "1. FROM<br>2. WHERE<br>3. GROUP BY<br>4. HAVING<br>5. SELECT<br>6. ORDER BY",
        "wrong_a": "1. SELECT<br>2. FROM<br>3. WHERE<br>4. GROUP BY<br>5. HAVING<br>6. ORDER BY",
        "explanation": "The database engine processes data differently than we read it. It must first locate the tables (<b>FROM</b>), filter the raw rows (<b>WHERE</b>), group them (<b>GROUP BY</b>), filter the groups (<b>HAVING</b>), and only <i>then</i> can it format the final output columns (<b>SELECT</b>) and sort them (<b>ORDER BY</b>)."
    },
    {
        "topic": "2. Retrieval & Sorting",
        "q": "How do you use q-quotes?",
        "a": "To safely print strings with apostrophes. Example: <code>q'[It's a test]'</code>",
        "wrong_a": "To alias columns safely. Example: <code>\"[It's a test]\"</code>",
        "explanation": "The Alternative Quote (q) operator allows you to use single quotes inside a literal string without confusing the SQL parser. You can use any delimiter like <code>[]</code>, <code>{}</code>, or <code>!!</code>.<br><pre>SELECT q'!Today's date is!' FROM dual;</pre>"
    },
    {
        "topic": "2. Retrieval & Sorting",
        "q": "What is the result of ANY arithmetic operation involving a NULL value?",
        "a": "Always NULL.",
        "wrong_a": "Always 0.",
        "explanation": "NULL represents an 'unknown' value, not a zero. If you add $100 to an unknown amount, the result is still unknown. Therefore, <code>100 + NULL = NULL</code>. You must use functions like <code>NVL()</code> to convert NULLs to zeros before doing math."
    },
    {
        "topic": "2. Retrieval & Sorting",
        "q": "What is the default ORDER BY behavior for NULLs?",
        "a": "ASC places NULLs LAST.<br>DESC places NULLs FIRST.",
        "wrong_a": "ASC places NULLs FIRST.<br>DESC places NULLs LAST.",
        "explanation": "In Oracle, NULL values are treated as the 'largest' possible value for sorting purposes. Therefore, an ascending sort (smallest to largest) will push NULLs to the very bottom by default."
    },
    {
        "topic": "2. Retrieval & Sorting",
        "q": "When do you use Double Quotes vs Single Quotes?",
        "a": "Double Quotes <code>\" \"</code> for column aliases.<br>Single Quotes <code>' '</code> for literal strings.",
        "wrong_a": "Single Quotes <code>' '</code> for column aliases.<br>Double Quotes <code>\" \"</code> for literal strings.",
        "explanation": "<b>Single quotes</b> tell Oracle 'this is literal text data'. <b>Double quotes</b> tell Oracle 'this is a structural identifier' like a column alias with spaces or case-sensitivity.<br><pre>SELECT last_name AS \"Employee Name\" FROM emp WHERE job = 'CLERK';</pre>"
    },
    {
        "topic": "2. Retrieval & Sorting",
        "q": "What is the difference between & and && substitution variables?",
        "a": "<code>&</code> prompts the user every time.<br><code>&&</code> prompts once and stores the value for the session.",
        "wrong_a": "<code>&&</code> prompts the user every time.<br><code>&</code> prompts once and stores the value for the session.",
        "explanation": "The <code>&&</code> double-ampersand tells SQL*Plus/SQL Developer to define the variable after the first prompt. It acts as a temporary constant for that session, avoiding repetitive popups for the same value."
    },
    {
        "topic": "2. Retrieval & Sorting",
        "q": "What does the DEFINE command do?",
        "a": "Hardcodes a substitution variable at the top of a script WITHOUT prompting the user.",
        "wrong_a": "Prompts the user every time the script is executed to define a new value.",
        "explanation": "DEFINE allows you to declare a variable and assign it a value before a script runs. This is useful for batch processing where you don't want the script to pause and wait for user input.<br><pre>DEFINE my_dept = 10;\nSELECT * FROM employees WHERE department_id = &my_dept;</pre>"
    },
    {
        "topic": "2. Retrieval & Sorting",
        "q": "What does SET VERIFY ON do?",
        "a": "Forces the client to print the 'old' and 'new' script lines when variables are executed.",
        "wrong_a": "Validates the syntax of the SQL statement before execution.",
        "explanation": "When using substitution variables, <code>SET VERIFY ON</code> provides debugging output in the console. It shows you the exact SQL statement <i>before</i> substitution and <i>after</i> substitution so you can verify the variable was inserted correctly."
    },
    {
        "topic": "3. Functions & Aggregation",
        "q": "What does TRUNC(SYSDATE, 'YEAR') return?",
        "a": "January 1st of the current year.",
        "wrong_a": "December 31st of the current year.",
        "explanation": "The <code>TRUNC</code> function rounds dates <i>down</i> to the beginning of the specified format model. So, truncating to the 'YEAR' resets the month and day to the very first day of that year."
    },
    {
        "topic": "3. Functions & Aggregation",
        "q": "What is a highly tested use case for the MOD function?",
        "a": "Finding even/odd numbers! (e.g., <code>MOD(salary, 2) = 0</code>)",
        "wrong_a": "Finding the absolute mathematical value of a negative number.",
        "explanation": "<code>MOD(m, n)</code> returns the remainder of <code>m</code> divided by <code>n</code>. If you divide any number by 2 and the remainder is 0, it must be an even number. This is a common exam trick for filtering rows."
    },
    {
        "topic": "3. Functions & Aggregation",
        "q": "What is the strict rule for NVL data types?",
        "a": "Both arguments inside <code>NVL(arg1, arg2)</code> MUST be the exact same data type.",
        "wrong_a": "Arguments can be any data type; Oracle implicitly converts them.",
        "explanation": "Oracle expects the replacement value to match the column type. If <code>commission_pct</code> is a NUMBER, you cannot replace its NULLs with a string like 'None'.<br><pre>-- WRONG: NVL(commission_pct, 'None')\n-- CORRECT: NVL(TO_CHAR(commission_pct), 'None')</pre>"
    },
    {
        "topic": "3. Functions & Aggregation",
        "q": "How does COALESCE differ from NVL?",
        "a": "NVL takes exactly two arguments.<br>COALESCE takes unlimited arguments and returns FIRST non-null.",
        "wrong_a": "COALESCE evaluates all arguments before returning.<br>NVL uses short-circuit evaluation.",
        "explanation": "<code>COALESCE(expr1, expr2, expr3...)</code> is more flexible than NVL. It scans the list from left to right and stops evaluating as soon as it finds a non-null value (short-circuit evaluation)."
    },
    {
        "topic": "3. Functions & Aggregation",
        "q": "What does NULLIF(a, b) return if the values match?",
        "a": "It returns NULL!",
        "wrong_a": "It returns TRUE!",
        "explanation": "<code>NULLIF</code> is designed to create NULLs. If argument 1 equals argument 2, it returns NULL. If they are different, it returns argument 1. It is often used to prevent 'divide by zero' errors.<br><pre>SELECT 100 / NULLIF(divisor, 0) FROM my_table;</pre>"
    },
    {
        "topic": "3. Functions & Aggregation",
        "q": "Which group function does NOT ignore NULL values?",
        "a": "<code>COUNT(*)</code> counts all rows, including NULLs.",
        "wrong_a": "<code>AVG()</code> factors NULLs in as zeros.",
        "explanation": "<code>COUNT(*)</code> counts the physical rows in a table regardless of the data inside them. All other aggregate functions (AVG, SUM, MAX, MIN) completely ignore rows containing NULL values before doing their math."
    },
    {
        "topic": "3. Functions & Aggregation",
        "q": "How does COUNT(column_name) handle NULLs?",
        "a": "It completely ignores NULL values. It only counts rows where that specific column has data.",
        "wrong_a": "It counts all rows in the table, including rows where the column is NULL.",
        "explanation": "Unlike <code>COUNT(*)</code>, if you specify a column name, Oracle only tallies the rows where that column is NOT NULL. If a table has 14 employees but only 4 have a commission, <code>COUNT(commission_pct)</code> returns 4."
    },
    {
        "topic": "3. Functions & Aggregation",
        "q": "What do the AVG() and MAX() functions do?",
        "a": "AVG() calculates the mathematical average. MAX() returns the highest value in a set.",
        "wrong_a": "MAX() calculates the mathematical average. AVG() returns the highest value in a set.",
        "explanation": "<b>AVG()</b> only works on numeric data. <b>MAX()</b> and <b>MIN()</b> are more versatile—they work on numbers, dates (finding the most recent/oldest date), and strings (finding highest alphabetical value)."
    },
    {
        "topic": "3. Functions & Aggregation",
        "q": "What is the strict rule connecting SELECT and GROUP BY?",
        "a": "If a column in your SELECT list is NOT inside an aggregate function, it MUST be listed in your GROUP BY clause.",
        "wrong_a": "If a column is listed in your GROUP BY clause, it MUST be selected in the SELECT list.",
        "explanation": "You cannot select individual row details (like <code>last_name</code>) alongside aggregated group totals (like <code>SUM(salary)</code>) unless you are explicitly grouping by those individual details.<br><pre>SELECT department_id, SUM(salary) FROM emp GROUP BY department_id;</pre>"
    },
    {
        "topic": "3. Functions & Aggregation",
        "q": "What is the difference between WHERE and HAVING?",
        "a": "WHERE filters rows BEFORE grouping.<br>HAVING filters groups AFTER aggregation.",
        "wrong_a": "HAVING filters rows BEFORE grouping.<br>WHERE filters groups AFTER aggregation.",
        "explanation": "You cannot use aggregate functions in a WHERE clause because the groups haven't been formed yet. You must use HAVING to filter based on aggregated results.<br><pre>SELECT dept_id, AVG(sal) FROM emp GROUP BY dept_id HAVING AVG(sal) > 5000;</pre>"
    },
    {
        "topic": "3. Functions & Aggregation",
        "q": "What major GROUP BY upgrade was introduced in Oracle 23ai?",
        "a": "You can now use column aliases inside the GROUP BY and HAVING clauses!",
        "wrong_a": "The GROUP BY clause is now entirely optional for aggregate functions.",
        "explanation": "Historically, column aliases were only allowed in the ORDER BY clause. Oracle 23ai significantly simplifies query writing by allowing you to group by the alias you defined in the SELECT list.<br><pre>SELECT EXTRACT(YEAR FROM hire_date) AS hire_yr FROM emp GROUP BY hire_yr;</pre>"
    },
    {
        "topic": "4. Joins",
        "q": "What causes an ORA-00918 (Ambiguous Column) error?",
        "a": "Joining tables with a shared column name without using a table alias prefix.",
        "wrong_a": "Using a table alias in the SELECT clause that hasn't been defined in the FROM clause.",
        "explanation": "If Table A and Table B both have a <code>department_id</code> column, selecting it without an alias confuses the database because it doesn't know which table's column to retrieve. You must prefix it (e.g., <code>A.department_id</code>)."
    },
    {
        "topic": "4. Joins",
        "q": "What is the strict rule when using the ANSI USING clause?",
        "a": "You are forbidden from putting a table prefix anywhere in the query for the join column.",
        "wrong_a": "You MUST put a table prefix on the join column to avoid ambiguity.",
        "explanation": "When you use <code>JOIN dept USING (dept_id)</code>, Oracle treats the join column as a single merged column. If you try to prefix it in the SELECT or WHERE clause (e.g., <code>emp.dept_id</code>), it will throw an error."
    },
    {
        "topic": "4. Joins",
        "q": "Where does the Oracle (+) operator go in an outer join?",
        "a": "Always on the DEFICIENT side (the table missing the data).",
        "wrong_a": "Always on the DOMINANT side (the table that contains all the data).",
        "explanation": "The <code>(+)</code> acts as a 'create dummy null rows' operator. You place it on the side that doesn't have matching data so that it can join with the table that does.<br><pre>-- Left Outer Join\nSELECT * FROM emp e, dept d WHERE e.dept_id = d.dept_id(+);</pre>"
    },
    {
        "topic": "4. Joins",
        "q": "Why will the query FROM emp SELF JOIN emp fail?",
        "a": "SELF JOIN is not a real keyword! You must use standard JOIN and assign different table aliases.",
        "wrong_a": "It will actually succeed and automatically link identical columns.",
        "explanation": "A self join is a concept, not a syntax. To join a table to itself (e.g., to find an employee's manager), you use standard JOIN syntax and trick the database into thinking it's looking at two different tables via aliases.<br><pre>FROM employees worker JOIN employees manager ON worker.manager_id = manager.emp_id</pre>"
    },
    {
        "topic": "4. Joins",
        "q": "Why can't you use the USING clause in a Non-Equijoin?",
        "a": "Because there are no exactly matching column names. You MUST use the ON clause.",
        "wrong_a": "Because Non-Equijoins require the NATURAL JOIN syntax.",
        "explanation": "A Non-Equijoin uses operators like <code>BETWEEN</code>, <code><</code>, or <code>></code>. The <code>USING</code> clause only works for exact equality matching on identically named columns.<br><pre>JOIN job_grades j ON e.salary BETWEEN j.lowest_sal AND j.highest_sal</pre>"
    },
    {
        "topic": "4. Joins",
        "q": "What causes a Cartesian Product?",
        "a": "Accidentally omitting a join condition or WHERE clause, causing rows to multiply.",
        "wrong_a": "Filtering out unmatched rows from both tables simultaneously.",
        "explanation": "Also known as a CROSS JOIN. If you join a table with 100 rows to a table with 10 rows but forget the ON clause, every row joins to every other row, generating a massive 1,000-row result set."
    },
    {
        "topic": "4. Joins",
        "q": "What is a NATURAL JOIN?",
        "a": "An automatic join that links two tables using ALL columns that have the exact same name and compatible data types.",
        "wrong_a": "A join that exclusively links tables using their defined Primary Key and Foreign Key constraints.",
        "explanation": "NATURAL JOIN is risky. It doesn't look at primary keys; it blindly joins on matching column names. If both tables happen to have an unrelated column named 'status', the query will join on it and return incorrect data."
    },
    {
        "topic": "4. Joins",
        "q": "What does a FULL OUTER JOIN do?",
        "a": "Returns all matched rows, PLUS all unmatched rows from the left table, PLUS all unmatched rows from the right.",
        "wrong_a": "Returns only the rows that have a perfect match in both tables.",
        "explanation": "It combines the results of a LEFT OUTER JOIN and a RIGHT OUTER JOIN. It guarantees that no data is left behind from either table, filling in the gaps with NULLs where matches don't exist."
    },
    {
        "topic": "4. Joins",
        "q": "What happens in an INNER JOIN if no rows match the condition?",
        "a": "It simply returns an empty result set (zero rows).",
        "wrong_a": "It throws an ORA-01403: No Data Found error.",
        "explanation": "An INNER JOIN only returns rows where the join condition is true. If there are no matches, the database successfully executes the query but returns 0 rows. It is not considered a failure or an error."
    },
    {
        "topic": "5. Subqueries",
        "q": "What causes a Subquery ORA-01427 Error?",
        "a": "Occurs when a single-row subquery using standard comparison operators (=, <) accidentally returns multiple rows.",
        "wrong_a": "Occurs when a multiple-row subquery using IN accidentally returns a single row.",
        "explanation": "If you write <code>WHERE salary = (SELECT salary FROM emp)</code>, the database expects one salary. If the subquery returns 10 salaries, it crashes because it cannot mathematically compute <code>WHERE salary = {10 items}</code>. You must use <code>IN</code>."
    },
    {
        "topic": "5. Subqueries",
        "q": "What is a Multiple-Column Subquery?",
        "a": "A subquery that returns more than one column. It requires comparing multiple columns simultaneously: <code>WHERE (c1, c2) IN (SELECT...)</code>",
        "wrong_a": "A subquery that selects only one column, but queries it from multiple joined tables.",
        "explanation": "Used for pairwise comparison. You compare a tuple (multiple values) on the left side to the tuple returned by the subquery.<br><pre>WHERE (manager_id, department_id) IN (SELECT manager_id, department_id FROM emp WHERE first_name = 'John')</pre>"
    },
    {
        "topic": "5. Subqueries",
        "q": "What is the NOT IN and NULL Trap?",
        "a": "If a multiple-row subquery using NOT IN returns even a single NULL value, the outer query returns zero rows.",
        "wrong_a": "If a subquery returns NULL, it is ignored and matches the remaining valid values.",
        "explanation": "The math behind <code>NOT IN</code> relies on the <code>!=</code> operator and the <code>AND</code> operator. Because <code>value != NULL</code> evaluates to UNKNOWN, the entire <code>NOT IN</code> condition fails for every row."
    },
    {
        "topic": "5. Subqueries",
        "q": "What is the synonym for the = ANY operator?",
        "a": "The <code>= ANY</code> operator is mathematically identical to the <code>IN</code> operator.",
        "wrong_a": "The <code>= ANY</code> operator is mathematically identical to the <code>EXISTS</code> operator.",
        "explanation": "Both operators check if a value exists within a provided list. <code>WHERE id IN (1,2,3)</code> is processed the exact same way as <code>WHERE id = ANY (1,2,3)</code>."
    },
    {
        "topic": "5. Subqueries",
        "q": "What is the UPDATE SET Alias Trap?",
        "a": "Oracle strictly forbids prefixing the target column in the SET clause with a table alias.",
        "wrong_a": "Oracle requires prefixing the target column in the SET clause with a table alias.",
        "explanation": "While aliases are encouraged everywhere else, you cannot use them on the left side of the equals sign in an UPDATE statement.<br><pre>-- WRONG: UPDATE emp e SET e.sal = 100\n-- CORRECT: UPDATE emp e SET sal = 100</pre>"
    },
    {
        "topic": "5. Subqueries",
        "q": "What is the MERGE Statement used for?",
        "a": "A modern alternative to correlated subqueries for modifying data. It avoids row-by-row looping.",
        "wrong_a": "Used exclusively for combining multiple SELECT statements into one result set.",
        "explanation": "MERGE (also known as Upsert) allows you to insert rows if they don't exist, or update them if they do, in a single efficient statement. It compares a target table against a source table/query."
    },
    {
        "topic": "5. Subqueries",
        "q": "What are Updatable Inline Views?",
        "a": "Oracle proprietary syntax allowing you to directly UPDATE the result of a SELECT statement joining two tables.",
        "wrong_a": "Views that can only be updated if they contain zero joins or functions.",
        "explanation": "Instead of a traditional UPDATE, you write an UPDATE statement against a subquery (inline view) in the FROM clause. This only works if the join preserves the primary key of the table being updated (Key-Preserved Table)."
    },
    {
        "topic": "6. Set Operators",
        "q": "What is the rule for columns in Set Operators?",
        "a": "The number of columns and their data types must match exactly across all queries being combined.",
        "wrong_a": "Only the number of columns must match; data types are implicitly converted.",
        "explanation": "If query 1 selects <code>(name, age)</code>, query 2 MUST select two columns, and the second column MUST be a number type. Oracle will not let you union an age with a hire_date."
    },
    {
        "topic": "6. Set Operators",
        "q": "How are output column names determined in Set Operators?",
        "a": "The column names in the final output are strictly determined by the FIRST SELECT statement.",
        "wrong_a": "The column names in the final output are strictly determined by the LAST SELECT statement.",
        "explanation": "Any column aliases used in the second, third, or fourth SELECT statements are completely ignored by the database. Only aliases in the topmost SELECT appear in the result header."
    },
    {
        "topic": "6. Set Operators",
        "q": "What is the difference between UNION and UNION ALL?",
        "a": "UNION removes duplicates and implicitly sorts.<br>UNION ALL retains duplicates and skips sorting.",
        "wrong_a": "UNION ALL removes duplicates and implicitly sorts.<br>UNION retains duplicates and skips sorting.",
        "explanation": "Because <b>UNION ALL</b> skips the deduplication and sorting phases, it is significantly faster. If you know your result sets are distinct, always use UNION ALL for better performance."
    },
    {
        "topic": "6. Set Operators",
        "q": "What is the difference between INTERSECT and INTERSECT ALL?",
        "a": "INTERSECT returns only unique rows in BOTH result sets.<br>'INTERSECT ALL' does not exist in Oracle SQL!",
        "wrong_a": "INTERSECT ALL returns duplicate rows that exist in both result sets.",
        "explanation": "This is a classic exam trap. There is no such thing as INTERSECT ALL or MINUS ALL in Oracle. <b>INTERSECT</b> simply finds the common rows between two queries and returns a distinct list of them."
    },
    {
        "topic": "6. Set Operators",
        "q": "How do Set Operators handle NULLs?",
        "a": "Set Operators treat two NULL values as mathematically EQUAL when comparing rows for duplicates/matches.",
        "wrong_a": "Set Operators treat two NULL values as mathematically UNEQUAL.",
        "explanation": "In standard SQL, <code>NULL = NULL</code> is FALSE. However, Set Operators have a special exemption. When evaluating uniqueness for a UNION or INTERSECT, if two rows both have a NULL in the same column, Oracle considers them a match."
    },
    {
        "topic": "6. Set Operators",
        "q": "What is the ANSI standard synonym for the MINUS operator?",
        "a": "MINUS is Oracle proprietary. The ANSI standard equivalent is <code>EXCEPT</code>.",
        "wrong_a": "MINUS is Oracle proprietary. The ANSI standard equivalent is <code>DIFFERENCE</code>.",
        "explanation": "<b>MINUS</b> (or EXCEPT) returns all distinct rows from the first query that are NOT present in the second query. It effectively subtracts the second result set from the first."
    },
    {
        "topic": "6. Set Operators",
        "q": "What are Dummy Columns in Set Operators?",
        "a": "Used to balance the column count. Example: <code>SELECT name, age FROM A MINUS SELECT name, NULL FROM B</code>.",
        "wrong_a": "Used to generate random alphanumeric data for testing purposes.",
        "explanation": "If table A has 3 columns and table B only has 2, you cannot use a Set Operator. You must inject a literal (like 'N/A', 0, or NULL) into the second query to satisfy the 'matching column count' rule."
    },
    {
        "topic": "6. Set Operators",
        "q": "What is the ORDER BY rule in Set Operators?",
        "a": "Only one ORDER BY clause allowed, at the very end of the statement, referencing the first query's columns.",
        "wrong_a": "Each individual SELECT statement in the set operation can have its own ORDER BY clause.",
        "explanation": "You cannot sort the individual queries before combining them. The <b>ORDER BY</b> must appear after the very last query and it applies to the final combined result set."
    },
    {
        "topic": "6. Set Operators",
        "q": "What is the Implicit Sort Trap?",
        "a": "UNION implicitly sorts, but you MUST use explicit ORDER BY if strict sorting is required.",
        "wrong_a": "UNION guarantees the output sort order permanently without an ORDER BY.",
        "explanation": "UNION, INTERSECT, and MINUS all perform an internal sort to find duplicates. However, relying on this for your final output is bad practice. If execution plans change in future Oracle versions, the implicit sort order could break. Always use <code>ORDER BY</code>."
    },
    {
        "topic": "7. DML Statements",
        "q": "What is the difference between Explicit and Implicit INSERT?",
        "a": "Explicit lists the columns. Implicit skips columns but requires exact table order.",
        "wrong_a": "Implicit lists the columns. Explicit skips columns but requires exact table order.",
        "explanation": "<b>Explicit:</b> <code>INSERT INTO t (col1, col2) VALUES (1, 2)</code> (Safest, prevents breaking if table structure changes).<br><b>Implicit:</b> <code>INSERT INTO t VALUES (1, 2)</code> (Risky, strictly relies on physical column order)."
    },
    {
        "topic": "7. DML Statements",
        "q": "How do you use the DEFAULT keyword in INSERT?",
        "a": "Literally type the word DEFAULT in the VALUES list to trigger the column's default value.",
        "wrong_a": "Leave the column completely out of the VALUES list to trigger the default value.",
        "explanation": "If a column was created with a default (e.g., <code>hire_date DATE DEFAULT SYSDATE</code>), you can invoke it directly during an explicit insert.<br><pre>INSERT INTO emp (id, hire_date) VALUES (100, DEFAULT);</pre>"
    },
    {
        "topic": "7. DML Statements",
        "q": "What triggers an Implicit Commit?",
        "a": "Running any DDL (CREATE, ALTER) or DCL (GRANT) statement automatically commits pending DML.",
        "wrong_a": "Running standard SELECT queries automatically commits pending DML.",
        "explanation": "If you perform 50 UPDATEs, and then run <code>CREATE TABLE my_tab...</code>, Oracle immediately issues a COMMIT for your 50 UPDATEs before building the table. You can no longer rollback those changes."
    },
    {
        "topic": "7. DML Statements",
        "q": "What is Read Consistency in Oracle?",
        "a": "Before a COMMIT, only you can see your DML changes. Others see the original data.",
        "wrong_a": "Before a COMMIT, others can see your uncommitted changes (Dirty Read).",
        "explanation": "Oracle uses Undo segments to guarantee Read Consistency. If you update a salary but don't commit, other sessions querying that table will be served the old, pre-update salary data from the Undo segments. No 'dirty reads' are allowed."
    },
    {
        "topic": "7. DML Statements",
        "q": "How does UNIQUE handle NULL values?",
        "a": "A UNIQUE constraint allows multiple NULL values (unknowns are mathematically distinct).",
        "wrong_a": "A UNIQUE constraint allows one and only one NULL value.",
        "explanation": "Because <code>NULL != NULL</code> in SQL, the database considers every NULL value to be a unique, distinct entity. Therefore, a column with a UNIQUE constraint can hold thousands of NULLs without violating the rule."
    },
    {
        "topic": "7. DML Statements",
        "q": "What is the PRIMARY KEY rule?",
        "a": "NOT NULL + UNIQUE. A table can only have exactly ONE Primary Key.",
        "wrong_a": "UNIQUE only. A table can have multiple Primary Keys.",
        "explanation": "A Primary Key is the ultimate row identifier. It strictly forbids NULLs and enforces uniqueness. While a table can have multiple UNIQUE constraints, it can legally only possess one defined PRIMARY KEY constraint."
    },
    {
        "topic": "7. DML Statements",
        "q": "Why is constraint naming a best practice?",
        "a": "Always explicitly name constraints (e.g., <code>emp_id_pk</code>) so error messages are readable.",
        "wrong_a": "Let Oracle auto-generate <code>SYS_C###</code> names to improve indexing speed.",
        "explanation": "If an INSERT violates a rule, Oracle throws an error with the constraint name. <code>ORA-0001: unique constraint (HR.EMP_ID_PK) violated</code> is infinitely easier to debug than <code>ORA-0001: unique constraint (HR.SYS_C00543) violated</code>."
    },
    {
        "topic": "8. DDL",
        "q": "What is a Foreign Key?",
        "a": "A column that establishes a relationship by referencing the Primary/Unique Key of another table.",
        "wrong_a": "A column that establishes a relationship by referencing any column in another table.",
        "explanation": "Also known as Referential Integrity. It ensures you cannot insert a row in a child table (e.g., placing an employee in Dept 90) unless that value legally exists in the parent table (Dept 90 exists in the Departments table)."
    },
    {
        "topic": "8. DDL",
        "q": "What does a CHECK Constraint do?",
        "a": "Verifies column values satisfy a specific condition before allowing an INSERT or UPDATE.",
        "wrong_a": "Automatically fixes invalid data upon INSERT to match table requirements.",
        "explanation": "It acts as a data quality gatekeeper. You can define custom rules. For example: <code>CONSTRAINT chk_sal CHECK (salary > 0)</code>. Any DML attempting to set salary to 0 or negative will be instantly rejected."
    },
    {
        "topic": "8. DDL",
        "q": "What is the CLOB Data Type?",
        "a": "Character Large Object. Used to store massive amounts of text exceeding 4,000 bytes.",
        "wrong_a": "Used to store massive binary files like images and videos (BLOB).",
        "explanation": "Standard <code>VARCHAR2</code> maxes out at 4,000 bytes (or 32k in extended mode). A <b>CLOB</b> can hold gigabytes or even terabytes of plain text data, such as entire XML files, JSON documents, or book transcripts."
    },
    {
        "topic": "8. DDL",
        "q": "What is the difference between VARCHAR2 and CHAR?",
        "a": "VARCHAR2 is variable-length. CHAR is fixed-length and pads empty space with invisible blanks.",
        "wrong_a": "CHAR is variable-length. VARCHAR2 is fixed-length and pads empty space.",
        "explanation": "If you insert 'Dog' into <code>CHAR(10)</code>, Oracle stores 'Dog       ' (wasting 7 bytes). If you insert 'Dog' into <code>VARCHAR2(10)</code>, Oracle only stores 'Dog'. Always prefer VARCHAR2."
    },
    {
        "topic": "8. DDL",
        "q": "What are the size rules for VARCHAR2 vs CHAR?",
        "a": "VARCHAR2 strictly requires a size. If you omit the size for CHAR, it defaults to CHAR(1).",
        "wrong_a": "CHAR strictly requires a size. If you omit the size for VARCHAR2, it defaults to VARCHAR2(1).",
        "explanation": "<code>CREATE TABLE t (name VARCHAR2)</code> will fail with a syntax error. You must define a length (e.g., <code>VARCHAR2(50)</code>). Conversely, <code>CREATE TABLE t (gender CHAR)</code> perfectly succeeds, defaulting to 1 character."
    },
    {
        "topic": "8. DDL",
        "q": "What is the Namespace Rule in Oracle?",
        "a": "Tables and Views share the same namespace. You cannot have a table and view with the exact same name.",
        "wrong_a": "Tables and Views are in separate namespaces. You can have a table and view with the exact same name.",
        "explanation": "Because a view is designed to look and act exactly like a table to downstream applications, Oracle puts them in the same naming registry. Synonyms and sequences also share this namespace."
    },
    {
        "topic": "8. DDL",
        "q": "What is the NOT NULL constraint rule?",
        "a": "The NOT NULL constraint is the only constraint that MUST be defined at the column level.",
        "wrong_a": "The NOT NULL constraint is the only constraint that MUST be defined at the table level.",
        "explanation": "Most constraints (PK, FK, UNIQUE) can be defined inline next to the column, or at the very bottom of the CREATE TABLE statement (table-level). <b>NOT NULL</b> can ONLY be defined inline next to the column definition."
    },
    {
        "topic": "8. DDL",
        "q": "How do you define a Composite Key constraint?",
        "a": "If a constraint requires multiple columns, it MUST be defined using table-level syntax.",
        "wrong_a": "If a constraint requires multiple columns, it MUST be defined using column-level syntax.",
        "explanation": "A composite key combines two columns to create uniqueness. You cannot define this inline. It must go at the end of the script.<br><pre>CONSTRAINT pk_emp_dept PRIMARY KEY (emp_id, dept_id)</pre>"
    },
    {
        "topic": "8. DDL",
        "q": "What is the difference between a View and a Sequence?",
        "a": "A View is a logical window based on a SELECT. A Sequence auto-generates unique numbers.",
        "wrong_a": "A Sequence is a logical window based on a SELECT. A View auto-generates unique numbers.",
        "explanation": "A <b>View</b> stores no data; it is just a saved query that executes when referenced. A <b>Sequence</b> is a database object specifically engineered to generate fast, unique integers for Primary Key columns."
    },
    {
        "topic": "8. DDL",
        "q": "What is the difference between DROP COLUMN and SET UNUSED?",
        "a": "DROP physically removes data (slow). SET UNUSED logically hides the column instantly.",
        "wrong_a": "SET UNUSED physically removes data (slow). DROP logically hides the column instantly.",
        "explanation": "Dropping a column on a multi-billion row table will lock the table for hours. <code>SET UNUSED</code> simply flips a bit in the data dictionary, hiding the column instantly. You can then physically drop it during off-hours."
    },
    {
        "topic": "8. DDL",
        "q": "What are the rules for TRUNCATE TABLE?",
        "a": "DDL statement (cannot rollback). Deletes all rows instantly and releases storage space.",
        "wrong_a": "DML statement (can rollback). Deletes rows slowly row-by-row.",
        "explanation": "TRUNCATE resets the table's high-water mark. Unlike DELETE, it bypasses the Undo segments entirely. Because it doesn't log the row deletions, it executes almost instantly, but the data is gone forever."
    },
    {
        "topic": "8. DDL",
        "q": "How do Global Temporary Tables (GTT) work?",
        "a": "Structure is permanent and visible to all, but the data is private to the session.",
        "wrong_a": "Structure and data are private to the session and deleted on disconnect.",
        "explanation": "The <code>CREATE GLOBAL TEMPORARY TABLE</code> command creates a permanent definition in the data dictionary. However, if User A inserts rows, User B cannot see them. The data is wiped when User A's transaction or session ends."
    },
    {
        "topic": "8. DDL",
        "q": "What does ON COMMIT PRESERVE ROWS do?",
        "a": "Used in GTTs to keep private data alive through commits until the session ends.",
        "wrong_a": "Used in GTTs to completely wipe data after every commit.",
        "explanation": "By default, GTTs use <code>ON COMMIT DELETE ROWS</code> (wiping data immediately upon commit). Changing it to <code>PRESERVE ROWS</code> allows your transaction to span multiple commits, only wiping the data when you log off."
    },
    {
        "topic": "8. DDL",
        "q": "What are the restrictions on External Tables?",
        "a": "They are strictly read-only. You cannot run DML (INSERT, UPDATE) or create indexes on them.",
        "wrong_a": "They support standard DML operations, but the data is stored outside the database.",
        "explanation": "External Tables allow you to query a flat file (like a .csv) sitting on the OS server as if it were a real database table. Because the database doesn't manage the file, it forbids any DML modifications."
    },
    {
        "topic": "8. DDL",
        "q": "What is ORGANIZATION EXTERNAL?",
        "a": "Clause mapping a table to an operating system flat file using an access driver.",
        "wrong_a": "Clause mapping a table to a remote schema in a different Oracle database.",
        "explanation": "This mandatory clause in the <code>CREATE TABLE</code> statement tells Oracle not to allocate physical database segments, but instead to use drivers like <code>ORACLE_LOADER</code> or <code>ORACLE_DATAPUMP</code> to parse an external file."
    },
    {
        "topic": "8. DDL",
        "q": "What does WITH CHECK OPTION do on a view?",
        "a": "Prevents users from running DML statements that would cause the row to violate the view's WHERE clause.",
        "wrong_a": "Allows users to run DML statements that completely bypass the view's WHERE clause.",
        "explanation": "If a view is defined as <code>SELECT * FROM emp WHERE dept = 10</code>, applying <code>WITH CHECK OPTION</code> ensures that a user cannot run <code>UPDATE my_view SET dept = 20</code>, because that row would disappear from the view."
    },
    {
        "topic": "9. Indexes, Synonyms & Sequences",
        "q": "What is the primary purpose of a Synonym?",
        "a": "Provides an alternative name (alias) for an object to hide the schema owner. Stores no data.",
        "wrong_a": "Creates a physical copy of a table to improve query performance.",
        "explanation": "Synonyms abstract away complexity. Instead of forcing developers to write <code>SELECT * FROM hr_schema.us_payroll_employees_v;</code>, you can create a synonym so they just query <code>SELECT * FROM employees;</code>."
    },
    {
        "topic": "9. Indexes, Synonyms & Sequences",
        "q": "What is the rule for Sequence CURRVAL?",
        "a": "You MUST call NEXTVAL at least once in your current session before querying CURRVAL.",
        "wrong_a": "You can call CURRVAL at any time to see the current absolute database value.",
        "explanation": "<code>CURRVAL</code> is bound to your specific session to guarantee consistency. If you log in and immediately query CURRVAL, Oracle throws an error because your session hasn't generated a number yet. You must establish a session baseline with <code>NEXTVAL</code>."
    },
    {
        "topic": "9. Indexes, Synonyms & Sequences",
        "q": "What does Identity Column Strict Mode do?",
        "a": "<code>GENERATED ALWAYS AS IDENTITY</code> forces the database to reject manual user inserts.",
        "wrong_a": "<code>GENERATED BY DEFAULT AS IDENTITY</code> forces the database to reject manual user inserts.",
        "explanation": "An identity column auto-generates sequential IDs. If defined as <code>ALWAYS</code>, Oracle takes complete control; if a user tries to insert a custom ID, the query crashes. If defined as <code>BY DEFAULT</code>, Oracle generates an ID only if the user leaves the field blank."
    },
    {
        "topic": "10. Controlling User Access",
        "q": "What is the difference between System and Object privileges?",
        "a": "System = DB-wide powers (CREATE TABLE). Object = specific targets, requires ON keyword.",
        "wrong_a": "Object = DB-wide powers (CREATE TABLE). System = specific targets, requires ON keyword.",
        "explanation": "<b>System Privileges</b> authorize administrative tasks (e.g., <code>GRANT CREATE VIEW TO admin;</code>). <b>Object Privileges</b> authorize DML on existing structures (e.g., <code>GRANT SELECT, UPDATE ON hr.employees TO staff;</code>)."
    },
    {
        "topic": "10. Controlling User Access",
        "q": "What is the difference between WITH GRANT OPTION and WITH ADMIN OPTION?",
        "a": "GRANT OPTION is for Object privileges (revokes cascade). ADMIN OPTION is for System privileges.",
        "wrong_a": "ADMIN OPTION is for Object privileges (revokes cascade). GRANT OPTION is for System privileges.",
        "explanation": "Both allow the grantee to pass the privilege down to other users. However, if a DBA revokes an Object privilege (GRANT OPTION), the revocation <b>cascades</b> down the chain. If a System privilege (ADMIN OPTION) is revoked, it does <b>not</b> cascade."
    },
    {
        "topic": "10. Controlling User Access",
        "q": "What is the 3-Step Process for Roles?",
        "a": "1) Create the role. 2) Grant privileges to the role. 3) Grant the role to the users.",
        "wrong_a": "1) Create user. 2) Grant privileges to user. 3) Convert user into a role.",
        "explanation": "Roles exist to make security manageable. Instead of granting 50 table privileges to 100 different users, you create a single 'Manager' role, grant the 50 privileges to that role, and then simply assign the 'Manager' role to the users."
    },
    {
        "topic": "11. Data Dictionary & Time Zones",
        "q": "What do the Data Dictionary prefixes (USER_, ALL_, DBA_) mean?",
        "a": "USER_ = Objects you own. ALL_ = Objects you have access to. DBA_ = Every object in the database.",
        "wrong_a": "ALL_ = Objects you own. DBA_ = Objects you have access to. USER_ = Every object in the database.",
        "explanation": "The Data Dictionary is metadata about the database. <code>USER_TABLES</code> shows tables in your schema. <code>ALL_TABLES</code> shows your tables + tables others granted you access to. <code>DBA_TABLES</code> requires sysadmin privileges and shows everything."
    },
    {
        "topic": "11. Data Dictionary & Time Zones",
        "q": "What is the difference between Session and Server time zone functions?",
        "a": "CURRENT_/LOCAL = session's time. SYS functions (SYSDATE) = server's OS time.",
        "wrong_a": "SYS functions (SYSDATE) = session's time. CURRENT_/LOCAL = server's OS time.",
        "explanation": "If the physical database server is in London, but you are logged in via a session located in Tokyo, <code>SYSDATE</code> will return London time. <code>CURRENT_DATE</code> will return Tokyo time."
    },
    {
        "topic": "11. Data Dictionary & Time Zones",
        "q": "What does CURRENT_TIMESTAMP return?",
        "a": "The session's date, fractional seconds, AND the explicit time zone offset (e.g., +02:00).",
        "wrong_a": "The server's date, fractional seconds, but NO time zone offset.",
        "explanation": "Unlike <code>CURRENT_DATE</code> (which only shows day and basic time) or <code>LOCALTIMESTAMP</code> (which drops the offset), <code>CURRENT_TIMESTAMP</code> returns the most verbose, exact moment in time including the specific timezone differential."
    },
    {
        "topic": "11. Data Dictionary & Time Zones",
        "q": "What are the two INTERVAL Data Types?",
        "a": "<code>INTERVAL YEAR TO MONTH</code> and <code>INTERVAL DAY TO SECOND</code>.",
        "wrong_a": "<code>INTERVAL YEAR TO DAY</code> and <code>INTERVAL MONTH TO SECOND</code>.",
        "explanation": "Intervals represent a span of time, not a specific date. They are used for highly accurate date math.<br><pre>-- Adds exactly 2 years and 6 months to today\nSELECT SYSDATE + INTERVAL '2-6' YEAR TO MONTH FROM dual;</pre>"
    }
];

let currentDeck = [];
let currentIndex = 0;
let scores = {};
let totalCorrect = 0;
let totalAnswered = 0;
let timerInterval;
let timeLeft = 30;
let isAnswered = false;

const cardEl = document.getElementById('flashcard');
const frontEl = document.getElementById('card-front');
const backEl = document.getElementById('card-back');
const topicEl = document.getElementById('topic-badge');
const optionsGrid = document.getElementById('options-grid');
const btnNext = document.getElementById('btn-next');
const btnFlip = document.getElementById('btn-flip');
const timerEl = document.getElementById('timer');
const scoreboardList = document.getElementById('scoreboard-list');
const totalScoreEl = document.getElementById('total-score');

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function initApp() {
    currentDeck = shuffle([...flashcards]);
    const uniqueTopics = [...new Set(currentDeck.map(c => c.topic))].sort();
    uniqueTopics.forEach(t => {
        scores[t] = { correct: 0, wrong: 0 };
    });
    updateScoreboardUI();
    loadQuestion();
}

function loadQuestion() {
    isAnswered = false;
    cardEl.classList.remove('is-flipped');
    btnNext.style.display = 'none';
    btnFlip.style.display = 'none';
    clearInterval(timerInterval);

    const currentCard = currentDeck[currentIndex];
    frontEl.innerHTML = currentCard.q;
    backEl.innerHTML = `${currentCard.a}<br><br>${currentCard.explanation}`;
    topicEl.innerHTML = `<i class="fas fa-folder-open"></i> ${currentCard.topic}`;

    let options = [
        { text: currentCard.a, isCorrect: true },
        { text: currentCard.wrong_a, isCorrect: false }
    ];
    options = shuffle(options);

    optionsGrid.innerHTML = '';
    options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `<b>${index === 0 ? 'A.' : 'B.'}</b> ${opt.text}`;
        btn.onclick = () => handleAnswer(btn, opt.isCorrect, currentCard.topic);
        optionsGrid.appendChild(btn);
    });

    startTimer();
}

function startTimer() {
    timeLeft = 30;
    timerEl.innerHTML = `<i class="fas fa-clock"></i> ${timeLeft}s`;
    timerEl.classList.remove('warning');

    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.innerHTML = `<i class="fas fa-clock"></i> ${timeLeft}s`;

        if (timeLeft <= 5) {
            timerEl.classList.add('warning');
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeOut();
        }
    }, 1000);
}

function handleTimeOut() {
    if (isAnswered) return;
    const currentTopic = currentDeck[currentIndex].topic;
    scores[currentTopic].wrong++;
    totalAnswered++;
    updateScoreboardUI();

    const buttons = optionsGrid.querySelectorAll('.option-btn');
    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.innerHTML.includes(currentDeck[currentIndex].a)) {
            btn.classList.add('correct');
        }
    });
    showPostAnswerControls();
}

function handleAnswer(selectedBtn, isCorrect, topic) {
    if (isAnswered) return;
    isAnswered = true;
    clearInterval(timerInterval);
    timerEl.classList.remove('warning');

    const buttons = optionsGrid.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.disabled = true);

    totalAnswered++;
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        scores[topic].correct++;
        totalCorrect++;
    } else {
        selectedBtn.classList.add('wrong');
        scores[topic].wrong++;
        buttons.forEach(btn => {
            if (btn.innerHTML.includes(currentDeck[currentIndex].a)) {
                btn.classList.add('correct');
            }
        });
    }

    updateScoreboardUI();
    showPostAnswerControls();
}

function showPostAnswerControls() {
    btnFlip.style.display = 'inline-block';
    btnNext.style.display = 'inline-block';
}

function flipCard() {
    cardEl.classList.toggle('is-flipped');
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex >= currentDeck.length) {
        frontEl.innerHTML = "🎉 Quiz Complete!";
        backEl.innerHTML = `You answered ${totalCorrect} correctly out of ${totalAnswered}!`;
        optionsGrid.innerHTML = '';
        btnNext.style.display = 'none';
        btnFlip.style.display = 'none';
        timerEl.innerHTML = '';
        topicEl.innerHTML = 'Finished';
        cardEl.classList.remove('is-flipped');
    } else {
        loadQuestion();
    }
}

function updateScoreboardUI() {
    scoreboardList.innerHTML = '';
    for (const [topic, score] of Object.entries(scores)) {
        if (score.correct > 0 || score.wrong > 0) {
            const row = document.createElement('div');
            row.className = 'topic-score';
            const cleanName = topic.split('. ')[1] || topic;
            row.innerHTML = `
                <div class="topic-name" title="${cleanName}">${cleanName}</div>
                <div class="score-badges">
                    <span class="badge badge-correct"><i class="fas fa-check"></i> ${score.correct}</span>
                    <span class="badge badge-wrong"><i class="fas fa-times"></i> ${score.wrong}</span>
                </div>
            `;
            scoreboardList.appendChild(row);
        }
    }
    totalScoreEl.innerHTML = `Total Score: ${totalCorrect} / ${totalAnswered}`;
}

initApp();