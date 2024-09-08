import React from "react";

function UserDetail({ user }) {
  if (!user) return null;

  return (
    <div className="container-detail">
      <div>
        <h2>{user.login}</h2>
        <img src={user.avatar_url} alt={user.login} width={100} />
        <p>ID: {user.id}</p>
        <p>
          Profile:{" "}
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">
            {user.html_url}
          </a>
        </p>
        <p>Repositories: {user.public_repos || "N/A"}</p>
      </div>
    </div>
  );
}


export default UserDetail;
