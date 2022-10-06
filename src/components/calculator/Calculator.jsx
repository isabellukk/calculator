import React, {
  useRef,
  useEffect,
  useState,
} from "react";
import { btns, BTN_ACTIONS } from "./btnConfig";
import "./calculator.css";

function Calculator() {
  const btnsRef = useRef(null);
  const expRef = useRef(null);

  const [expression, setExpression] = useState("");

  useEffect(() => {
    const btns = Array.from(btnsRef.current.querySelectorAll("button"));
    btns.forEach((e) => (e.style.height = e.offsetWidth + "px"));
  }, []);

  const btnClick = (item) => {
    const curDiv = expRef.current;

    if (item.action === BTN_ACTIONS.THEME)
      document.body.classList.toggle("dark");

    if (item.action === BTN_ACTIONS.ADD) {
      addAnimSpan(item.display);
      const oper = item.display !== "x" ? item.display : "*";

      setExpression(expression + oper);
    }

    if (item.action === BTN_ACTIONS.DELETE) {
      curDiv.parentNode.querySelector("div:last-child").innerHTML = "";
      curDiv.innerHTML = "";

      setExpression("");
    }

    if (item.active && item.action === BTN_ACTIONS.ADD) {
      return null;
    }

    if (item.action === BTN_ACTIONS.CALC) {
      if (expression.trim().length <= 0) return;

      curDiv.parentNode.querySelector("div:last-child").remove();

      const cloneNode = curDiv.cloneNode(true);
      curDiv.parentNode.appendChild(cloneNode);

      const transform = `translateY(${
        -(curDiv.offsetHeight + 10) + "px"
      }) scale(0.4)`;

      try {
        let res = eval(expression);

        setExpression(res.toString());
        setTimeout(() => {
          cloneNode.style.transform = transform;
          curDiv.innerHTML = "";
          addAnimSpan(Math.floor(res * 100000000) / 100000000);
        }, 200);
      } catch (error) {
        setTimeout(() => {
          cloneNode.style.transform = transform;
          cloneNode.innerHTML = "num num err";
        }, 200);
      } finally {
        console.log("Count Calcula Done");
      }
    }
  };

  const addAnimSpan = (content) => {
    const curDiv = expRef.current;
    const span = document.createElement("span");

    span.innerHTML = content;
    span.style.opacity = "0";
    curDiv.appendChild(span);

    const width = span.offsetWidth + "px";
    span.style.width = "0";

    setTimeout(() => {
      span.style.opacity = "1";
      span.style.width = width;
    }, 100);
  };

  return (
    <div className="calculator">
      <div className="calculator__result">
        <div ref={expRef} className="calculator__result__exp"></div>
        <div className="calculator__result__exp"></div>
      </div>
      <div ref={btnsRef} className="calculator__btns">
        {btns.map((item, index) => (
          <button
            key={index}
            className={item.class}
            onClick={() => btnClick(item)}
          >
            {item.display}
          </button>
        ))}
        <div className="button-glow"></div>
      </div>
    </div>
  );
}

export default Calculator;
