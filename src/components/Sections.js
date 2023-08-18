import React, { useReducer, useEffect } from "react";
import axios from "axios";
import Section from "./Section";
import style from "../styles/style.module.css";

const initState = {
  chairs: [],
  errorMessage: "",
  count: 0,
  sum: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "success":
      return {
        ...state,
        chairs: action.chairs,
      };
    case "failed":
      return { ...state, errorMessage: action.error };
    case "change-state":
      return { ...state, chairs: action.chairs };
    case "calc":
      return { ...state, count: action.count, sum: action.sum };
    default:
      return state;
  }
};



const Sections = () => {
  
  const [data, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    axios
      .get("chairs.json")
      .then((response) => {
        dispatch({
          type: "success",
          chairs: response.data,
        });
      })
      .catch((error) =>
        dispatch({ 
          type: "failed", 
          error: error.message 
        }));
  }, []);


  const clickHandler = (number) => {

    switch (data.chairs[number - 1].state) {
      case "unselected":
        data.chairs[number - 1].state = "selected";
        break;
      case "selected":
        data.chairs[number - 1].state = "pending";
        break;
      case "pending":
        data.chairs[number - 1].state = "reserved";
        break;
      case "reserved":
        alert("قبلا رزرو شده");
        break;
    }


    dispatch({ 
      type: "change-state",
      chairs: data.chairs 
    });




    if (data.chairs[number - 1].state === "reserved") {
      const reservedChairs = data.chairs.filter(
        (chair) => chair.state === "reserved"
      );
      const count = reservedChairs.length;
      let sum = 0;
      for (let i = 0; i < count; i++) {
        sum += reservedChairs[i].price;
      }

      dispatch({
        type: "calc",
        count: count,
        sum: sum,
      });
    }
  };


  return (
    <div>
      <div className={style["stage"]}>Stage</div>
      <div className={style["calc-box"]}>
        <div>Count : {data.count}</div>
        <div>Sum : {data.sum}</div>
      </div>


      <div className={style["section-container"]}>

        <Section data={data.chairs.filter((chair) => chair.section === "B")} 
                 clickHandler={clickHandler} 
                 sectionStyle={style["section-b"]} />


        <Section 
                 data={data.chairs.filter((chair) => chair.section === "A")} 
                 clickHandler={clickHandler} 
                 sectionStyle={style["section-a"]} />



        <Section 
                 data={data.chairs.filter((chair) => chair.section === "C")} 
                 clickHandler={clickHandler} 
                 sectionStyle={style["section-c"]} />
      </div>
      <div>
        <Section 
                 data={data.chairs.filter((chair) => chair.section === "D")} 
                 clickHandler={clickHandler} 
                 sectionStyle={style["section-d"]} />
      </div>
    </div>
  );
};

export default Sections;
