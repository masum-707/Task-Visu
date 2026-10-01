## How to use

### Requirements

- Node.js and npm
- Access to the Task Visu API at `http://crm.test.local/api/`
- A browser with JavaScript enabled

### Run the project

1. Open a terminal in the project folder.
2. Install the project dependencies:

	```bash
	npm install
	```

3. Serve the project with a local web server. For example, with VS Code, install the Live Server extension and open `index.html` with **Open with Live Server**.
4. Open the displayed local URL in your browser.

The API base URL and page size are configured in `js/config.js`. Make sure the API host is reachable before signing in.

### Sign in

1. Enter your API username and password on the login page.
2. Select **Log in**.
3. After a successful login, the application stores the session and opens the task list.

If the credentials are incorrect or the API cannot be reached, an error message is shown on the page.

### Manage tasks

- Use the search field to filter tasks. Searching is sent to the server after a short delay.
- Select a column heading to sort the task list.
- Select a task row to open and edit its details.
- Select **+ New Task** to create a task.
- Complete the required fields and select **submit** to save a task.
- Use the delete button in a row to remove a task after confirming the prompt.
- Use **Previous** and **Next** to move between pages.
- Select **Refresh** to reload the current task list.
- Select **cancel** or press `Esc` to close the task form.
- Select **Logout** to clear the session and return to the login page.

### Run tests

Run the Jest test suite from the project folder:

```bash
npm test
```

## Completed so far 
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

18. Delete asks "Are you sure?" first, then calls DELETE and removes the row.
19. While saving or deleting, the buttons are disabled so a double click cannot send the request
twice.
20. Clicking a row opens the same form filled with that task, loaded from GET /tasks/{id}.
21. Search box, filtered by the server through search=, wired through your own debounce of about 300
ms.
22. Clicking a column header sorts by it;
23. Save creates (POST) or updates (PATCH) and then refreshes the list without a full page reload.
24. The last search text and sort are remembered in localStorage and restored after a page reload.
25. HighLight sorted head and overDue (in mouse hover)
26. Keyboard support: Esc closes the form,Enter submits(create and update task handle)
27. Added refresh button
28. Jest tests for your pure helper date formatting.