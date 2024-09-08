import React, { useState } from "react";

function UserList({ users, onUserClick, selectedUser }) {
  const [sortOrder, setSortOrder] = useState("asc");

  const sortedUsers = [...users].sort((a, b) => {
    return sortOrder === "asc"
      ? a.public_repos - b.public_repos
      : b.public_repos - a.public_repos;
  });

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div>
      <button className="sort-button" onClick={toggleSortOrder}>
        Sort by Repositories ({sortOrder})
      </button>
      <ul>
        {sortedUsers.map((user) => (
          <li
            className={`user-item ${
              selectedUser && selectedUser.id === user.id ? "active" : ""
            }`}
            key={user.id}
            onClick={() => onUserClick(user)}
          >
            {user.login} - {user.public_repos} repos
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
