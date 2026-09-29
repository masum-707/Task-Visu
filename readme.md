##Completed so far 
1. Login page with username and password inputs and a submit button.
2. Empty username or password is rejected in the browser, before any request is sent.
3. On success: save the token and the user's name in localStorage, then go to the task list.
4. On 403: show "Wrong username or password" on the page. Not an alert(), not only in the
console.
5. While the request runs: the button is disabled and shows that something is happening.
6. Opening the task list without a token sends you back to the login page.
7. A Logout button clears the token and returns to the login page.
8. Any 401 from any request is handled the same way as logout
9. The logged-in user's name is visible in the header.
10. A table built from JavaScript with these columns: ID, Name, Responsible, Priority, End date,
Progress %, and a delete button.
11. Dates are shown readable (for example 12.09.2025), not as the raw UTC string.
12. Missing values show -, never undefined or null.
13. Paging: Prev / Next buttons, the current page, and the total number of tasks. Buttons are
disabled on the first / last page.
14. Three visible states: loading, error with a Retry button, and empty ("No tasks found").
15. Exactly one click listener on the table body handles both "open row" and "delete row" (event
delegation).
16. + New Task opens a form with: Name, Responsible (dropdown), Priority (dropdown), Start, End,
Progress %, Active.
17. Validation before sending: Name is required; Responsible is required; Progress is a whole number
between 0 and 100; End cannot be before Start. Each error is shown next to its own input.

17. Delete asks "Are you sure?" first, then calls DELETE and removes the row.
18. While saving or deleting, the buttons are disabled so a double click cannot send the request
twice.
19. Clicking a row opens the same form filled with that task, loaded from GET /tasks/{id}.
20. Search box, filtered by the server through search=, wired through your own debounce of about 300
ms.
21. Clicking a column header sorts by it;
22. Save creates (POST) or updates (PATCH)
23. The last search text and sort are remembered in localStorage and restored after a page reload.
24.HighLight sorted head
??What remaining ....



3. Save creates (POST) or updates (PATCH) and then refreshes the list without a full page reload.