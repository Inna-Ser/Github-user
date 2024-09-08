import React, { useState } from "react";
import UserSearch from "./UserSearch";
import UserList from "./UserList";
import UserDetail from "./UserDetail";
import "../App.css";

function Main() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const usersPerPage = 10;

  const handleSearch = async (query) => {
    if (query === "") {
      setUsers([]);
      setError(null);
      return;
    }
    try {
      const response = await fetch(`https://api.github.com/search/users?q=${query}`);
  
      if (!response.ok) {
        throw new Error("Ошибка запроса к API");
      }
  
      const data = await response.json();
  
      if (!data.items || data.items.length === 0) {
        setUsers([]);
        setError("Пользователь не найден");
      } else {
        setUsers(data.items);
        setError(null);
      }
  
      setCurrentPage(1);
    } catch (error) {
      setUsers([]);
      setError(error.message || "Произошла ошибка при выполнении запроса");
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * usersPerPage;
  const selectedUsers = users.slice(startIndex, startIndex + usersPerPage);

  return (
    <div className="main">
      <div className="menu">
        <UserSearch onSearch={handleSearch} />
        {error && <div className="error-message">{error}</div>}
        {users.length > 1 && (
          <div className="container-list">
            <UserList
              users={selectedUsers}
              onUserClick={handleUserClick}
              selectedUser={selectedUser}
            />

            <div className="pagination">
              {Array.from(
                { length: Math.ceil(users.length / usersPerPage) },
                (_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={currentPage === i + 1 ? "active" : ""}
                  >
                    {i + 1}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
      {selectedUser && <UserDetail user={selectedUser} />}
    </div>
  );
}

export default Main;
