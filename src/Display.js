import React from "react";

const Display = (props) => {
  //destructuring dogs from props
  const { dogs } = props;
  //loading function for it dogs exist
  const loaded = () => {
    return (
      <div style={{ textAlign: "center" }}>
        {dogs.map((dog) => {
          return (
            <article key={dog._id}>
              <img src={dog.img} />
              <h1>{dog.name}</h1>
              <h3>{dog.age}</h3>
              <button
                onClick={() => {
                  props.selectDog(dog);
                  props.history.push("/edit");
                }}
              >
                Edit Dog
              </button><button onClick = {() => {props.deleteDog(dog)}}>Delete Dog</button>
            </article>
          );
        })}
      </div>
    );
  };
  const loading = <h1>Loading...</h1>;
  return dogs.length > 0 ? loaded() : loading;
};
export default Display;
