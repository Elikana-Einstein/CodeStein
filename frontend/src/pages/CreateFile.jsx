import { useEffect, useMemo, useState } from "react";
import { FilePlus2, FolderOpen, X } from "lucide-react";

import PageHeader from "../components/layout/PageHeader";
import Button from "../components/ui/Button";
import { createFiles, getWorkspacePath } from "../services/api";

const inputClassName =
  "mt-1.5 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

export default function CreateFile() {
  const [folderPath, setFolderPath] = useState("");
  const [fileInput, setFileInput] = useState("");
  const [submittedFiles, setSubmittedFiles] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    getWorkspacePath()
      .then((workspacePath) => {
        if (active && workspacePath) {
          setFolderPath(workspacePath);
        }
      })
      .catch(() => {
        // The input remains editable when the extension is offline.
      });

    return () => {
      active = false;
    };
  }, []);

  const fileNames = useMemo(
    () => [...new Set(fileInput.split(/[\n,]/).map((name) => name.trim()).filter(Boolean))],
    [fileInput]
  );

  const removeFile = (fileName) => {
    setFileInput((current) =>
      current
        .split(/[\n,]/)
        .map((name) => name.trim())
        .filter((name) => name && name !== fileName)
        .join("\n")
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!folderPath.trim()) {
      setError("Enter the folder path where the files should be created.");
      return;
    }

    if (fileNames.length === 0) {
      setError("Add at least one file name.");
      return;
    }

    setLoading(true);

    try {
      await createFiles({ path: folderPath.trim(), names: fileNames });
      setSubmittedFiles(fileNames);
      setSuccess(`${fileNames.length} file${fileNames.length === 1 ? "" : "s"} added to the creation queue.`);
      setFileInput("");
    } catch (requestError) {
      setError(requestError.message || "Could not send the file creation request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Create files"
        description="Queue files for the connected VS Code workspace to create."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex items-center gap-3 rounded-xl bg-indigo-50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
              <FilePlus2 size={19} />
            </div>
            <div>
              <p className="text-sm font-medium text-indigo-900">VS Code file creation</p>
              <p className="mt-0.5 text-xs text-indigo-700">The connected extension will create each queued file.</p>
            </div>
          </div>

          <div className="space-y-5">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Folder path</span>
              <input
                required
                value={folderPath}
                onChange={(event) => setFolderPath(event.target.value)}
                placeholder="src/pages"
                className={`${inputClassName} h-10 font-mono`}
              />
              <span className="mt-1.5 block text-xs text-slate-500">Loaded from VS Code when available. You can change it before submitting.</span>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">File names</span>
              <textarea
                required
                value={fileInput}
                onChange={(event) => setFileInput(event.target.value)}
                placeholder={"Dashboard.jsx\nSettings.jsx\nProfile.jsx\nHelp.jsx"}
                rows={8}
                className={`${inputClassName} resize-y py-3 font-mono`}
              />
              <span className="mt-1.5 block text-xs text-slate-500">Add one name per line. Commas are also supported.</span>
            </label>
          </div>

          {error && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          {success && <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</p>}

          <div className="mt-7 flex justify-end">
            <Button type="submit" icon={FilePlus2} loading={loading}>
              Queue files
            </Button>
          </div>
        </form>

        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-slate-900">
            <FolderOpen size={17} className="text-indigo-600" />
            <h2 className="font-semibold">Queue preview</h2>
          </div>
          <p className="mt-1 text-xs text-slate-500">{folderPath.trim() || "your-folder"}</p>

          <div className="mt-4 space-y-2">
            {fileNames.length === 0 ? (
              <p className="rounded-lg border border-dashed border-slate-200 px-3 py-5 text-center text-sm text-slate-400">Your files will appear here.</p>
            ) : (
              fileNames.map((fileName) => (
                <div key={fileName} className="flex items-center justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  <span className="truncate font-mono">{fileName}</span>
                  <button type="button" onClick={() => removeFile(fileName)} aria-label={`Remove ${fileName}`} className="shrink-0 text-slate-400 hover:text-slate-700">
                    <X size={15} />
                  </button>
                </div>
              ))
            )}
          </div>

          {submittedFiles.length > 0 && (
            <p className="mt-4 border-t border-slate-100 pt-4 text-xs text-slate-500">Last queued: {submittedFiles.join(", ")}</p>
          )}
        </aside>
      </div>
    </>
  );
}