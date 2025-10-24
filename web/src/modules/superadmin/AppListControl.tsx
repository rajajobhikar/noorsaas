"use client";
import { useEffect, useState } from "react";

interface App {
  _id: string;
  name: string;
  status: string;
  role: string;
  visible: boolean;
}

export default function AppListControl() {
  const [showNewModal, setShowNewModal] = useState(false);
  const [newApp, setNewApp] = useState({
    name: "",
    status: "active",
    role: "user",
    visible: true,
  });
  const [editingApp, setEditingApp] = useState<App | null>(null);
  const [form, setForm] = useState({
    name: "",
    status: "",
    role: "",
    visible: true,
  });
  const [apps, setApps] = useState<App[]>([]);

  const toggleVisibility = async (id: string) => {
    await fetch("/api/superadmin/apps/toggle", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });
  };

  const editApp = (app: App) => {
    setEditingApp(app);
    setForm({
      name: app.name,
      status: app.status,
      role: app.role,
      visible: app.visible,
    });
  };

  const deleteApp = async (id: string) => {
    if (!confirm("Are you sure you want to delete this app?")) return;

    await fetch("/api/superadmin/apps/delete", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });

    // Optionally refresh list
    setApps((prev) => prev.filter((a) => a._id !== id));
  };

  useEffect(() => {
    fetch("/api/superadmin/apps")
      .then((res) => res.json())
      .then((data) => setApps(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📦 AppList Control</h1>
      <button
        onClick={() => setShowNewModal(true)}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        ➕ Add New App
      </button>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>Name</th>
            <th>Status</th>
            <th>Visible</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {apps.map((app: App, i) => (
            <tr key={i} className="border-t">
              <td>{app.name}</td>
              <td>{app.status}</td>
              <td>{app.visible ? "✅" : "❌"}</td>
              <td>{app.role}</td>
              <td className="space-x-2">
                <button
                  onClick={() => toggleVisibility(app._id)}
                  className="text-yellow-600 hover:underline"
                >
                  Toggle
                </button>
                <button
                  onClick={() => editApp(app)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteApp(app._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              ✏️ Edit App: {editingApp.name}
            </h2>

            <label className="block mb-2">
              Name:
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border p-2 rounded"
              />
            </label>

            <label className="block mb-2">
              Status:
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full border p-2 rounded"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>

            <label className="block mb-2">
              Role:
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full border p-2 rounded"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Superadmin</option>
              </select>
            </label>

            <label className="block mb-4">
              Visible:
              <input
                type="checkbox"
                checked={form.visible}
                onChange={(e) =>
                  setForm({ ...form, visible: e.target.checked })
                }
                className="ml-2"
              />
            </label>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingApp(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await fetch("/api/superadmin/apps/update", {
                    method: "POST",
                    body: JSON.stringify({ id: editingApp._id, ...form }),
                    headers: { "Content-Type": "application/json" },
                  });
                  setEditingApp(null);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {showNewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">➕ Add New App</h2>

            <label className="block mb-2">
              Name:
              <input
                type="text"
                value={newApp.name}
                onChange={(e) => setNewApp({ ...newApp, name: e.target.value })}
                className="w-full border p-2 rounded"
              />
            </label>

            <label className="block mb-2">
              Status:
              <select
                value={newApp.status}
                onChange={(e) =>
                  setNewApp({ ...newApp, status: e.target.value })
                }
                className="w-full border p-2 rounded"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>

            <label className="block mb-2">
              Role:
              <select
                value={newApp.role}
                onChange={(e) => setNewApp({ ...newApp, role: e.target.value })}
                className="w-full border p-2 rounded"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Superadmin</option>
              </select>
            </label>

            <label className="block mb-4">
              Visible:
              <input
                type="checkbox"
                checked={newApp.visible}
                onChange={(e) =>
                  setNewApp({ ...newApp, visible: e.target.checked })
                }
                className="ml-2"
              />
            </label>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowNewModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await fetch("/api/superadmin/apps/create", {
                    method: "POST",
                    body: JSON.stringify(newApp),
                    headers: { "Content-Type": "application/json" },
                  });
                  setShowNewModal(false);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
