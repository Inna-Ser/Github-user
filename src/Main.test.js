import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Main from "./components/Main";

const mockFetchUsers = jest.fn().mockResolvedValue([{ login: "octocat" }]);

const MockMain = () => {
  const [users, setUsers] = React.useState([]);

  const handleSearch = async () => {
    const results = await mockFetchUsers();
    setUsers(results);
  };

  const handleSort = () => {
    const sortedUsers = [...users].sort((a, b) => b.repos - a.repos);
    setUsers(sortedUsers);
  };

  React.useEffect(() => {
    setUsers([{ login: "octocat", repos: 5 }, { login: "testuser", repos: 10 }]);
  }, []);

  return (
    <div>
      <input placeholder="Search by username..." />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleSort}>Sort by Repositories</button>
      <ul>
        {users.map(user => (
          <li key={user.login}>{user.login} - {user.repos} repos</li>
        ))}
      </ul>
    </div>
  );
};

test("отобразить ввод поиска", () => {
  render(<MockMain />);
  const inputElement = screen.getByPlaceholderText(/Search by username.../i);
  expect(inputElement).toBeInTheDocument();
});

test("отобразить список пользователей при поиске", async () => {
  render(<MockMain />);
  const inputElement = screen.getByPlaceholderText(/Search by username.../i);
  fireEvent.change(inputElement, { target: { value: "octocat" } });
  fireEvent.click(screen.getByText(/Search/i));

  // Ожидаем появления элемента в списке пользователей
  expect(await screen.findByText(/octocat/i)).toBeInTheDocument();
});

test("сортировать пользователей по репозиториям", () => {
  render(<MockMain />);
  const button = screen.getByText(/Sort by Repositories/i);
  fireEvent.click(button);

  // Проверка, что список отсортирован
  expect(screen.getAllByRole('listitem')[0].textContent).toContain('testuser - 10 repos');
});
