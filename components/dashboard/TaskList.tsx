import type { Task } from "@/types/task";

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export default function TaskList({ tasks, loading, onEdit, onDelete }: TaskListProps) {
  return (
    <section style={{ marginTop: "1.2rem" }}>
      <h2>Liste des taches</h2>
      {loading ? <p>Chargement...</p> : null}
      {!loading && tasks.length === 0 ? <p>Aucune tache pour le moment.</p> : null}

      <div style={{ display: "grid", gap: "0.8rem" }}>
        {tasks.map((task) => (
          <article
            key={task.id}
            style={{
              background: "#ffffff",
              border: "1px solid #d9e2ec",
              borderRadius: "10px",
              padding: "1rem"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
              <div>
                <h3 style={{ marginTop: 0, marginBottom: "0.35rem" }}>{task.title}</h3>
                <p style={{ marginTop: 0 }}>{task.description}</p>
                <small style={{ color: "#52606d" }}>
                  Statut: {task.status} | Derniere mise a jour: {new Date(task.updatedAt).toLocaleString("fr-FR")}
                </small>
              </div>
              <div style={{ display: "grid", gap: "0.4rem", alignContent: "start" }}>
                <button type="button" onClick={() => onEdit(task)}>
                  Modifier
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(task.id)}
                  style={{ borderColor: "#c92a2a", color: "#c92a2a", background: "white" }}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}