import React, { Fragment, useEffect, useState } from "react";

export function AnalogClock() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  var s = new Date().getSeconds().toString();

  const getTime = () => {
    var d = new Date();
    var h = d.getHours() * 30;
    var m = d.getMinutes() * 6;
    var s = d.getSeconds() * 6;

    setHour(h + m / 12);
    setMinute(m);
    setSecond(s);
  };

  setInterval(getTime, 1000);
  useEffect(getTime, []);

  return (
    <Fragment>
      <div className="size-96 rounded-full relative p-10">
       
        <div className="relative bg-slate-800 border-4 border-slate-400 shadow-xl shadow-black w-full h-full grid place-items-center rounded-full">
          {[...Array(12)].map((_, i) => (
            <div
              className={`absolute inset-4 text-center text-3xl font-bold`}
              style={{ transform: `rotate(${(i + 1) * 30}deg)` }}
              key={i}
            >
              <span
                className={`${
                  s / 5 === i + 1 || s / 5 === 0
                    ? "!text-slate-300"
                    : "text-slate-500"
                } bg-whites inline-block z-50`}
                style={{ transform: `rotate(-${30 * (i + 1)}deg)` }}
              >
                {i + 1}
              </span>
            </div>
          ))}

          <div className="absolute">
            <div className="absolute size-6 bg-yellow-500 blur-md rounded-full" />
            <div className="relative size-6 bg-yellow-500 rounded-full z-50" />
          </div>
          <div className="absolute">
            <div
              className="w-2 h-[80px] origin-bottom bg-indigo-500 absolute bottom-0 left-1/2 -translate-x-1/2"
              style={{ transform: `rotate(${hour}deg)` }}
            >
              <div className="size-4 bg-indigo-500 blur absolute -top-2 left-1/2 -translate-x-1/2 rounded-full"></div>
              <div className="size-4 bg-indigo-500 absolute -top-2 left-1/2 -translate-x-1/2 rounded-full"></div>
            </div>
            <div
              className="w-1 h-[100px] origin-bottom bg-purple-500 transition-all duration-1000 ease-linear absolute bottom-0 left-1/2 -translate-x-1/2"
              style={{ transform: `rotate(${minute}deg)` }}
            >
              <div className="size-3 bg-purple-500 absolute blur -top-2 left-1/2 -translate-x-1/2 rounded-full"></div>
              <div className="size-3 bg-purple-500 absolute -top-2 left-1/2 -translate-x-1/2 rounded-full"></div>
            </div>
            <div
              className="w-0.5 h-[120px] origin-bottom bg-pink-500 transition-all duration-1000 ease-linear absolute bottom-0 left-1/2 -translate-x-1/2"
              style={{ transform: `rotate(${second}deg)` }}
            >
              <div className="size-2 bg-pink-500 absolute blur -top-2 left-1/2 -translate-x-1/2 rounded-full"></div>
              <div className="size-2 bg-pink-500 absolute -top-2 left-1/2 -translate-x-1/2 rounded-full">
                <span className="text-white hidden">
                  {s.length < 2 ? `${s}0` : s}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </Fragment>
  );
}