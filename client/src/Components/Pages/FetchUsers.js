// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// function FetchUsers() {
//      const [users, setusers] = useState([]);
//      const [error, setError] = useState("");

//      const dataFetch = async () => {
//              try {
//                  const response = await axios.get("http://localhost:5000/api/users");
//                  setusers(response.data);
//                  console.log(response);
                 
//              } catch (err) {
//                  setError(err.message);
//              }
//          };
     
//          useEffect(() => {
//              dataFetch();
//          }, []);
//   return (


//    <div>
//         {error && <p>Error: {error}</p>}
//      <div>
//         FetchUsers
//         <div>
//                 {users.length > 0 ? (
//                     users.map((item, index) => (
//                         <ul key={index}>
                           
//                             <li>{item.name}</li>
//                             <li>{item._id}</li>
//                         </ul>
//                     ))
//                 ) : (
//                     <p>No users available.</p>
//                 )}
//             </div>

//     </div>
//    </div>
//   )
// }

// export default FetchUsers

// json webtoken fetch users
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function FetchUsers() {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState("");

//   const dataFetch = async (token) => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/users", {
//         headers: {
//           Authorization: `Bearer ${token}` //Send token in header
//         }
//       });
//       setUsers(response.data);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message);
//     }
//   };

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser?.token) {
//       dataFetch(storedUser.token);
//     } else {
//       setError("No token found.");
//     }
//   }, []);

//   return (
//     <div>
//       <h3>Fetch Users</h3>
//       {error && <p style={{ color: 'red' }}>Error: {error}</p>}
//       <ul>
//         {users.map(user => (
//           <li key={user._id}>{user.name} - {user.email}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default FetchUsers;

// delete for admin
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FetchUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = storedUser?.token;
  const isAdmin = storedUser?.isAdmin;

  const fetchData = async () => {
    try {
      const response = await axios.get("https://qxp-mern.onrender.com/api/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(prev => prev.filter(u => u._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    if (token && isAdmin) {
      fetchData();
    } else {
      setError("You are not authorized to view this page");
    }
  }, []);

  return (
    <div>
      <h3>All Users (Admin Only)</h3>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name} ({user.email})
            {isAdmin && (
              <button style={{ marginLeft: '10px' }} onClick={() => deleteUser(user._id)}>
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FetchUsers;

