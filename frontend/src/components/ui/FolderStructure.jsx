import React, { useEffect, useState } from "react";
import axios from "axios";

const FolderTreeItem = ({
  item,
  level = 0,
  onItemClick = () => {},
  itemPath = [],
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const isFolder = item.type === "folder";

  return (
    <div className="w-full">
      <div
        onClick={() => {
          onItemClick(item, itemPath);
          if (isFolder) {
            setIsOpen(!isOpen);
          }
        }}
        className={`
          flex items-center gap-2
          py-1 px-2
          rounded-md
          text-sm
          text-gray-300
          hover:bg-gray-800
          cursor-pointer
          select-none
        `}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        {/* Arrow */}
        {isFolder ? (
          <span className="w-4 text-gray-500">
            {isOpen ? "⌄" : "›"}
          </span>
        ) : (
          <span className="w-4" />
        )}

        {/* Icon */}
        <span className="text-sm">
          {isFolder ? (isOpen ? "📂" : "📁") : "📄"}
        </span>

        {/* Name */}
        <span className="truncate">{item.name}</span>
      </div>

      {/* Children */}
      {isFolder && isOpen && item.children && (
        <div>
          {item.children.map((child, index) => (
            <FolderTreeItem
              key={`${child.name}-${index}`}
              item={child}
              level={level + 1}
              onItemClick={onItemClick}
              itemPath={[...itemPath, child.name]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FolderStructure = () => {
  const [folderStructure, setFolderStructure] = useState(null);
  const [error, setError] = useState(null);

  const onItemClick = (item, itemPath) => {
    const path = itemPath.join("/");
    console.log(`Selected ${item.type}: ${path}`);
  };
  useEffect(() => {
    const getFolderStructure = async () => {
      try {
        const result = await axios.get("http://localhost:8000/file-creator/folder-structure");
        setFolderStructure(result.data.structure);
      } catch (fetchError) {
        setError("Unable to load folder structure.");
      }
    };

    getFolderStructure();
  }, []);

  return (
    <div className="w-full max-w-md rounded-lg border border-gray-800 bg-gray-950 p-3">
      {/* Header */}
      <div className="mb-3 flex items-center gap-2 border-b border-gray-800 pb-3">
        <span className="text-lg">📁</span>

        <h2 className="text-sm font-semibold text-gray-200">
          Explorer
        </h2>
      </div>

      {/* Folder Tree */}
      <div className="space-y-0.5">
        {error ? (
          <p className="px-2 text-sm text-red-400">{error}</p>
        ) : folderStructure ? (
          <FolderTreeItem
            item={folderStructure}
            onItemClick={onItemClick}
            itemPath={[folderStructure.name]}
          />
        ) : (
          <p className="px-2 text-sm text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default FolderStructure;
