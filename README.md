API

http://localhost:8000/api/user/signup - POST request, request body = object, type { email, password } , purpose ==> create new user, return JsonWebToken;

http://localhost:8000/api/user/login - POST request, request body = object, type { email, password}, purpose ==> find user by email, return JsonWebToken;

http://localhost:8000/api/todos - GET request, request header => headers: { 'Authorization': Bearer ${token} }, returns <Todo[]>

http://localhost:8000/api/todos/:id - GET request, request header => headers: { 'Authorization': Bearer ${token} }, returns <Todo>

http://localhost:8000/api/todos - POST request, request header => headers: { 'Authorization': Bearer ${token} }, request body => {title, text, completed},
returns <Todo>

http://localhost:8000/api/todos/:id - DELETE request, request header => headers: { 'Authorization': Bearer ${token} }, request params => id, finds specific todo by id, deletes, returns deleted todo.

http://localhost:8000/api/todos/:id - PUT request, request header => headers: { 'Authorization': Bearer ${token} }, request params => id, request body => {title?, text?, completed? }, return updated Todo.