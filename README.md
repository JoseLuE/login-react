Gestión de Rutas:
En este código, se utiliza react-router-dom para manejar la navegación entre diferentes componentes basada en la URL.
Se utiliza createBrowserRouter para definir las rutas y los componentes asociados con esas rutas.
Cada objeto en la matriz pasada a createBrowserRouter especifica una ruta y el componente que se debe renderizar cuando se visita esa ruta.

  {path: "/", element: <Home />},
  {path: "/register",element: <Register />},
  {path: "/login",element: <Login />,},
  {path: "/user",element: <User />,},
  {path: "/moderator",element: <Moderator />,},
  {path: "/admin",element: <Admin />,},

En el componente Login, después de que el usuario envía el formulario de inicio de sesión y la solicitud es exitosa, se utiliza useNavigate para navegar a diferentes rutas dependiendo del rol del usuario devuelto por el servidor.

Si el usuario tiene el rol de "ROLE_USER", se navega a "/user".
Si el usuario tiene el rol de "ROLE_MODERATOR", se navega a "/moderator".
Si el usuario tiene el rol de "ROLE_ADMIN", se navega a "/admin".
En el componente Register, cuando el usuario envía el formulario de registro y la solicitud es exitosa, no hay una navegación automática, pero se muestra un mensaje de alerta indicando que el usuario ha sido creado con éxito.

Gestión del Estado:
En este código, se utiliza el hook useState para manejar el estado de las variables username, password, email, y role en los componentes Login y Register.
useState permite definir variables de estado y funciones para actualizarlas.
Cada vez que cambia el valor de una de estas variables de estado, React se encarga de volver a renderizar el componente para reflejar el nuevo estado en la interfaz de usuario.