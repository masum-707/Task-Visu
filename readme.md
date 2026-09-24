##Completed so far 
☐ Login page with username and password inputs and a submit button.
☐ Empty username or password is rejected in the browser, before any request is sent.
☐ On success: save the token and the user's name in localStorage, then go to the task list.
☐ On 403: show "Wrong username or password" on the page. Not an alert(), not only in the
console.
☐ While the request runs: the button is disabled and shows that something is happening.
☐ Opening the task list without a token sends you back to the login page.
☐ A Logout button clears the token and returns to the login page.
☐ Any 401 from any request is handled the same way as logout
☐ The logged-in user's name is visible in the header.
☐ A table built from JavaScript with these columns: ID, Name, Responsible, Priority, End date,
Progress %, and a delete button.
☐ Dates are shown readable (for example 12.09.2025), not as the raw UTC string.
☐ Missing values show -, never undefined or null.
☐ Paging: Prev / Next buttons, the current page, and the total number of tasks. Buttons are
disabled on the first / last page.
☐ Three visible states: loading, error with a Retry button, and empty ("No tasks found").
☐ Exactly one click listener on the table body handles both "open row" and "delete row" (event
delegation).
☐+ New Task opens a form with: Name, Responsible (dropdown), Priority (dropdown), Start, End,
Progress %, Active.
☐ Validation before sending: Name is required; Responsible is required; Progress is a whole number
between 0 and 100; End cannot be before Start. Each error is shown next to its own input.

☐ Delete asks "Are you sure?" first, then calls DELETE and removes the row.
☐ While saving or deleting, the buttons are disabled so a double click cannot send the request
twice.



??What remaining ....
☐ Search box, filtered by the server through search=, wired through your own debounce of about 300
ms.
☐ Clicking a column header sorts by it; clicking again flips the direction. The active column shows
an arrow.
☐ The last search text and sort are remembered in localStorage and restored after a page reload.
☐ Clicking a row opens the same form filled with that task, loaded from GET /tasks/{id}.
☐ Save creates (POST) or updates (PATCH) and then refreshes the list without a full page reload.
☐ Server validation errors (422) are shown on the matching fields.