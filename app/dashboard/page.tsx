"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type { Task, TaskStatus } from "@/types/task";
import type { TaskInput } from "@/types/task";
import TaskForm from "@/components/dashboard/TaskForm";
import TaskList from "@/components/dashboard/TaskList";
import {
  createTaskRequest,
  deleteTaskRequest,
  listTasksRequest,
  logoutRequest,
  updateTaskRequest
} from "@/lib/clientApi";

interface TaskFormState {
  title: string;
  description: string;
  status: TaskStatus;
}

const initialForm: TaskFormState = {
  title: "",
  description: "",
  status: "todo"
};

export default function DashboardPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState<TaskFormState>(initialForm);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sortedTasks = useMemo(
    () => [...tasks].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()),
    [tasks]
  );

  async function fetchTasks() {
    setLoading(true);
    setErrorMessage(null);

    try {
      const data = await listTasksRequest();
      setTasks(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Network error while fetching tasks";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  function startEdit(task: Task) {
    setEditingTaskId(task.id);
    setForm({
      title: task.title,
      description: task.description,
      status: task.status
    });
  }

  function resetForm() {
    setEditingTaskId(null);
    setForm(initialForm);
  }

  async function submitTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setErrorMessage(null);

    try {
      const input: TaskInput = {
        title: form.title,
        description: form.description,
        status: form.status
      };

      if (editingTaskId) {
        await updateTaskRequest(editingTaskId, input);
      } else {
        await createTaskRequest(input);
      }

      resetForm();
      await fetchTasks();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Network error while saving task";
      setErrorMessage(message);
    } finally {
      setSaving(false);
    }
  }

  async function removeTask(id: number) {
    setErrorMessage(null);

    try {
      await deleteTaskRequest(id);
      setTasks((current) => current.filter((task) => task.id !== id));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Network error while deleting task";
      setErrorMessage(message);
    }
  }

  async function logout() {
    setErrorMessage(null);

    try {
      await logoutRequest();
      router.push("/login");
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to logout for now";
      setErrorMessage(message);
    }
  }

  return (
    <main style={{ minHeight: "100vh", padding: "2rem", maxWidth: "980px", margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "center" }}>
        <div>
          <h1 style={{ marginBottom: "0.2rem" }}>Dashboard - Gestion des taches</h1>
          <p style={{ marginTop: 0, color: "#52606d" }}>
            Creation, modification et suppression via API REST integree.
          </p>
        </div>
        <button
          onClick={logout}
          style={{ border: "1px solid #c92a2a", color: "#c92a2a", background: "white", padding: "0.5rem 0.8rem" }}
        >
          Se deconnecter
        </button>
      </header>

      <TaskForm
        form={form}
        editingTaskId={editingTaskId}
        saving={saving}
        onSubmit={submitTask}
        onChange={setForm}
        onCancelEdit={resetForm}
      />

      {errorMessage ? <p style={{ color: "#c92a2a" }}>{errorMessage}</p> : null}

      <TaskList tasks={sortedTasks} loading={loading} onEdit={startEdit} onDelete={removeTask} />
    </main>
  );
}