import { useState } from "react";
import returnCards from "./logics/returnCards";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Hi there</h1>
      <p>Already forgot how to do it</p>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      {console.log(returnCards("hiragana"))}
    </>
  );
}

export default App;
