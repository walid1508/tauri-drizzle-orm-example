import { appConfigDir, join } from "@tauri-apps/api/path";
import { openPath } from "@tauri-apps/plugin-opener";
import { useEffect, useState } from "react";
import { db } from "./db/database";
import * as schema from "./db/schema";

type User = {
  id: number;
  created_at: string | null;
  name: string | null;
};

export default function UserManager() {
  const [appConfigPath, setAppConfigPath] = useState("");
  const [dbPath, setDbPath] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const path = await appConfigDir();
      setAppConfigPath(path);
      const fullPath = await join(path, "test.db");
      setDbPath(fullPath);
      loadUsers();
    })();
  }, []);

  const loadUsers = async () => {
    const results = await db.query.users.findMany().execute();
    console.log("🚀 ~ FindMany response from Drizzle:", results);
    setUsers(results);
  };

  const addUser = async () => {
    await db.insert(schema.users).values({ name: nameInput });
    setNameInput("");
    loadUsers();
  };

  const deleteAllUsers = async () => {
    await db.delete(schema.users).execute();
    loadUsers();
  };

  return (
    <main style={styles.container}>
      <div style={styles.row}>
        <button
          style={styles.linkButton}
          onClick={() =>
            openPath(appConfigPath)
              .then(() => console.log("opened"))
              .catch(console.error)
          }
        >
          {dbPath}
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addUser();
        }}
      >
        <label style={styles.label}>
          <span>Name</span>
          <div style={styles.row}>
            <input
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              type="text"
              placeholder="Enter a name..."
              style={styles.input}
            />
            <button type="submit" style={styles.primaryButton}>
              Add name to the db
            </button>
          </div>
        </label>
      </form>

      <button
        type="button"
        style={styles.dangerButton}
        onClick={deleteAllUsers}
      >
        Delete All Users
      </button>

      <pre style={styles.codeBlock}>{JSON.stringify(users, null, 2)}</pre>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    fontFamily: "sans-serif",
  },
  row: {
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#1d4ed8",
    textDecoration: "underline",
    cursor: "pointer",
    fontFamily: "monospace",
    fontSize: "14px",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    fontSize: "14px",
  },
  input: {
    padding: "0.4rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    flex: 1,
  },
  primaryButton: {
    padding: "0.4rem 0.8rem",
    backgroundColor: "#1d4ed8",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  dangerButton: {
    padding: "0.4rem 0.8rem",
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    alignSelf: "start",
  },
  codeBlock: {
    backgroundColor: "#f3f4f6",
    padding: "1rem",
    borderRadius: "6px",
    fontSize: "13px",
    whiteSpace: "pre-wrap",
  },
};
