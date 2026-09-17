import { useState } from "react";
import { FolderPlus } from "lucide-react";

import Modal from "../ui/Modal";
import Button from "../ui/Button";

const initialForm = {
  name: "",
  path: "",
  language: "JavaScript",
  branch: "main",
};

export default function ConnectProject({ open, onClose, onConnect }) {
  const [form, setForm] = useState(initialForm);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onConnect({
      ...form,
      reviews: 0,
      issues: 0,
      status: "Connected",
      lastReview: "Never",
      filesChanged: 0,
    });

    setForm(initialForm);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Connect a project"
      description="Connect a local project to start reviewing code before you push."
    >
      <form onSubmit={handleSubmit} className="p-5">
        <div className="mb-6 flex items-center gap-3 rounded-xl bg-indigo-50 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
            <FolderPlus size={19} />
          </div>

          <div>
            <p className="text-sm font-medium text-indigo-900">
              VS Code connection
            </p>
            <p className="mt-0.5 text-xs text-indigo-700">
              The local agent will complete the connection later.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              Project name
            </span>

            <input
              required
              value={form.name}
              onChange={(event) =>
                updateField("name", event.target.value)
              }
              placeholder="My React App"
              className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              Local path
            </span>

            <input
              required
              value={form.path}
              onChange={(event) =>
                updateField("path", event.target.value)
              }
              placeholder="~/projects/my-app"
              className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 font-mono text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">
                Language
              </span>

              <select
                value={form.language}
                onChange={(event) =>
                  updateField("language", event.target.value)
                }
                className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                <option>JavaScript</option>
                <option>TypeScript</option>
                <option>Python</option>
                <option>Go</option>
                <option>Java</option>
                <option>PHP</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">
                Default branch
              </span>

              <input
                value={form.branch}
                onChange={(event) =>
                  updateField("branch", event.target.value)
                }
                className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 font-mono text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </label>
          </div>
        </div>

        <div className="mt-7 flex justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button type="submit">
            Connect Project
          </Button>
        </div>
      </form>
    </Modal>
  );
}