import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const Vscode = () => {
  const code = `
import React from "react";

function App() {
  const users = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Mike" },
  ];

  const handleClick = () => {
    console.log("Button clicked");
  };

  return (
    <div>
      <h1>Hello World</h1>

      <button onClick={handleClick}>
        Click me
      </button>

      {users.map((user) => (
        <div key={user.id}>
          {user.name}
        </div>
      ))}
    </div>
  );
}

export default App;
`;

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
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default Vscode;