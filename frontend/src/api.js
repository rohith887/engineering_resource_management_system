import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3100", // Backend URL
});

export const getEngineers = () => api.get("/api/engineers");
export const getProjects = () => api.get("/api/projects");
export const getAssignments = () => api.get("/api/assignments");
export const createAssignment = (assignmentData) =>
  api.post("/api/assignments", assignmentData);