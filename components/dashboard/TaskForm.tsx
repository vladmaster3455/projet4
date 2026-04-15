import type { FormEvent } from "react";

import type { TaskStatus } from "@/types/task";

interface TaskFormState {
  title: string;
  description: string;
  status: TaskStatus;
}

interface TaskFormProps {
  form: TaskFormState;
  editingTaskId: number | null;
  saving: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onChange: (next: TaskFormState) => void;
  onCancelEdit: () => void;
}

export default function TaskForm({
  form,
  editingTaskId,
  saving,
  onSubmit,
  onChange,
  onCancelEdit
}: TaskFormProps) {
  return (
    <section
      style={{
        marginTop: "1.2rem",
        background: "#ffffff",
        border: "1px solid #d9e2ec",
        borderRadius: "12px",
        padding: "1rem"
      }}
    >
      <h2 style={{ marginTop: 0 }}>{editingTaskId ? "Modifier une tache" : "Ajouter une tache"}</h2>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: "0.7rem" }}>
        <input
          placeholder="Titre"
          value={form.title}
          onChange={(event) => onChange({ ...form, title: event.target.value })}
          required
          minLength={3}
          maxLength={120}
          style={{ padding: "0.6rem" }}
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(event) => onChange({ ...form, description: event.target.value })}
          required
          minLength={5}
          maxLength={1000}
          rows={3}
          style={{ padding: "0.6rem", resize: "vertical" }}
        />
        <select
          value={form.status}
          onChange={(event) => onChange({ ...form, status: event.target.value as TaskStatus })}
          style={{ padding: "0.6rem" }}
        >
          <option value="todo">A faire</option>
          <option value="in_progress">En cours</option>
          <option value="done">Terminee</option>
        </select>

        <div style={{ display: "flex", gap: "0.6rem" }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              border: "none",
              background: "#0b7285",
              color: "white",
              padding: "0.6rem 0.9rem",
              borderRadius: "8px"
            }}
          >
            {saving ? "Sauvegarde..." : editingTaskId ? "Mettre a jour" : "Creer"}
          </button>
          {editingTaskId ? (
            <button type="button" onClick={onCancelEdit} style={{ padding: "0.6rem 0.9rem" }}>
              Annuler
            </button>
          ) : null}
        </div>
      </form>
    </section>
  );
}