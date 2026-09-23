import React, { useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import useAppStore from "../store/appStore";

const Vscode = () => {
  const getCodes = useAppStore((state) => state.getCodes);
  const codeData = useAppStore((state) => state.codes);

  useEffect(() => {
    let unsubscribe;

    getCodes()
      .then((cleanup) => {
        unsubscribe = cleanup;
      })
      .catch((error) => {
        console.error("Failed to subscribe to code updates:", error);
      });

    return () => unsubscribe?.();
  }, [getCodes]);

  return (
    <div className="w-full overflow-auto rounded-lg">
      <SyntaxHighlighter
        language="javascript"
        style={vscDarkPlus}
        showLineNumbers
        wrapLongLines={false}
        customStyle={{
          margin: 0,
          padding: "20px",
          fontSize: "14px",
          minHeight: "400px",
        }}
      >
        {codeData?.code || "Select a file to view its code."}
      </SyntaxHighlighter>
    </div>
  );
};

export default Vscode;