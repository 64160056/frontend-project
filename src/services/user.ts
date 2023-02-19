import type User from "@/types/User";
import http from "./axios";
function getUsers() {
  return http.get("/users");
}

function saveUser(user: User) {
  return http.post("/users", user);
}

function updateUser(id: number, user: User) {
  return http.patch(`/users/${id}`, user);
}

function deleteUser(id: number) {
  return http.delete(`/users/${id}`);
}

export default { getUsers, saveUser, updateUser, deleteUser };
