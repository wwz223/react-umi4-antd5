import { atom, useAtom } from 'jotai';

const countAtom = atom(0);

const OtherComponent = () => {
  const [count, setCounter] = useAtom(countAtom);
  const onClick = () => setCounter((prev) => prev - 1);
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={onClick}>sub</button>
    </div>
  );
};

export default () => {
  const [count, setCounter] = useAtom(countAtom);
  const onClick = () => setCounter((prev) => prev + 1);
  return (
    <div className="flex ">
      <div>
        <h1>{count}</h1>
        <button onClick={onClick}>add</button>
      </div>

      <OtherComponent />
    </div>
  );
};
