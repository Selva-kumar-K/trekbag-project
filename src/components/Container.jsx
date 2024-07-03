import { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import { Items } from "../constant";

export default function Container() {
  const [input, setInput] = useState("");
  const [data, setData] = useState(() => {
    return JSON.parse(localStorage.getItem('items')) || Items
  });
  const ref = useRef();
  const handleClick = (e) => {
    e.preventDefault();
    if (!input) {
      alert("Text Box shouldn't be empty!");
      ref.current.focus();
      return;
    }
    const newItem = {
      id: new Date().getTime(),
      name: input,
      packed: false,
    };
    setData((prev) => [...prev, newItem]);
    setInput("");
  };

  const handleRemove = (buttonId) => {
    const n = data.filter((item) => {
      return item.id !== buttonId;
    });

    setData(n);
  };

  const handleToggleItem = (id) => {
    const newItem = data.map((item) => {
      if (item.id === id) {
        return { ...item, packed: !item.packed };
      }

      return item;
    });

    setData(newItem);
  };

  const handleSort = (e) => {
    const sortedItems = [...data].sort((a,b) => {
      if(e === 'packed'){
        return b.packed - a.packed
      }else if (e === 'unpacked'){
        return a.packed - b.packed
      }
      return
    })

    setData(sortedItems)
  }

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(data))
  }, [data])

  return (
    <div className="relative bg-[#dfc489bf] h-screen">
      <h1 className="text-[30px] text-[#9a8989] opacity-30 text-center md:text-[80px] lg:text-[120px]">
        TREKBAG
      </h1>

      <div className="absolute w-[90%] top-10 left-0 right-0 mx-auto md:w-[75%] md:top-18 lg:top-24 lg:w-[65%]">
        <div className="bg-[#f6f6f4e2] rounded-xl overflow-hidden">
          <div className="flex justify-between items-center p-2 border-b-2 border-[#dcdbdb] bg-[#f3e9c9]">
            <div className="hidden md:flex">
              <Logo />
              <Logo />
              <Logo />
            </div>
            <div className="">
              <small>
                <b>{data.filter((item) => item.packed).length} </b>/{" "}
                {data.length} items packed
              </small>
            </div>
          </div>
          <div className="flex flex-col md:flex-row h-[500px] md:h-[440px]">
            {data.length === 0 ? (
              <div className="md:w-4/6 flex justify-center items-center md:border-r-2 md:border-[#dcdbdb]">
                <div className="flex flex-col w-[300px] text-center h-[100px] mt-4">
                  <h2 className="font-semibold md:text-xl">
                    Empty Packaging List
                  </h2>
                  <p className="text-slate-700 text-md">
                    Start by adding some items you absolutely don't want to
                    forget{" "}
                  </p>
                </div>
              </div>
            ) : (
              <div className="md:w-4/6 md:h-full p-2 border-r-2 border-[#dcdbdb] overflow-auto">
                <select
                  name=""
                  id=""
                  className="w-full mt-2 py-2 rounded-md border-2 focus:outline-none"
                  onChange={(e) => handleSort(e.target.value)}
                >
                  <option value="">Sort by Default</option>
                  <option value="packed">Sort by packed</option>
                  <option value="unpacked">Sort by unpacked</option>
                </select>
                <div className="mt-4">
                  {data.map((data, index) => (
                    <div className="my-2 flex justify-between" key={index}>
                      <label htmlFor={data.id} className="flex space-x-2">
                        <input
                          className="accent-[#cead41]"
                          onChange={() => handleToggleItem(data.id)}
                          type="checkbox"
                          name=""
                          id={data.id}
                          checked={data.packed}
                        />
                        <p className="text-[16px]">{data.name}</p>
                      </label>
                      <button onClick={() => handleRemove(data.id)}>❌</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="md:w-2/6 md:h-full flex flex-col justify-between md:overflow-hidden">
              <div className="flex flex-col space-y-3 p-4">
                <p className="font-semibold">Add an item</p>
                <input
                  ref={ref}
                  type="text"
                  value={input}
                  placeholder="Toothbrush.."
                  className="rounded-sm p-2 placeholder:font-thin focus:outline-gray-600"
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  className="bg-[#9d6333] lg:px-4 lg:py-2 md:py-2 p-2 rounded-md text-white"
                  onClick={handleClick}
                >
                  Add to list
                </button>
              </div>

              <div className="flex flex-col space-y-1 md:space-y-3 p-4">
                <button
                  className="bg-[#876141] lg:px-4 lg:py-2 rounded-md text-white cursor-pointer py-1 px-1 md:text-sm"
                  onClick={() => {
                    setData(
                      data.map((item) => {
                        return { ...item, packed: true };
                      })
                    );
                    console.log(data);
                  }}
                >
                  Mark all as complete
                </button>
                <button
                  className="bg-[#876141] lg:px-4 lg:py-2 rounded-md text-white cursor-pointer py-1 px-1 md:text-sm"
                  onClick={() => {
                    setData(
                      data.map((item) => {
                        return { ...item, packed: false };
                      })
                    );
                  }}
                >
                  Mark all as incomplete
                </button>
                <button
                  className="bg-[#876141] lg:px-4 lg:py-2 rounded-md text-white cursor-pointer py-1 px-1 md:text-sm"
                  onClick={() => {
                    setData(Items);
                  }}
                >
                  Reset to initial
                </button>
                <button
                  className="bg-[#876141] lg:px-4 lg:py-2 rounded-md text-white cursor-pointer py-1 px-1 md:text-sm"
                  onClick={() => setData([])}
                >
                  Remove all items
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

const Logo = () => {
  return (
    <svg
      width=""
      height=""
      className="w-8"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>circle</title>
      <circle cx="512" cy="512" r="256" fill="#c6bdbd" fill-rule="evenodd" />
    </svg>
  );
};
