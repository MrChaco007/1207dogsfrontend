import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {
  const url = "https://dogsac-1207.herokuapp.com";
  const [dogs, setDogs] = React.useState([])
  
  const emptyDog = {
    name: "", 
    age: 0, 
    img: ""
  }
const [selectedDog, setSelectedDog] = React.useState(emptyDog);
const getDogs = () => {
  fetch(url + "/dog/")
    .then((response) => response.json())
    .then((data) => {
      setDogs(data);
    });
}
React.useEffect(() => getDogs(), []);
//handleCreate function for creating dogs

const handleCreate = (newDog) => {
  fetch(url + "/dog", {method: "post", headers: {"Content-Type": 
"application/json"}, body:JSON.stringify(newDog)}).then(()=> {
  getDogs()
})
}

const selectDog = (dog) => {
  setSelectedDog(dog)
}

 const handleUpdate = (dog) => {
   fetch(url + "/dog/" + dog._id, {method: "put", headers: {"Content-Type": "application/json"}, body: JSON.stringify(dog)}).then(()=> {getDogs()})
 }

 const deleteDog = (dog) => {
   fetch(url + "/dog/" + dog._id, {
     method: "delete"
   })
   .then(() => {getDogs()})
 }
  return (
    <div className="App">
      <h1>DOG LISTING SITE</h1>
      <Link to ="/create"><button>Create a Dog</button></Link>
      <hr />
      <main>
        <Switch>
          <Route exact path="/" render={(rp) => <Display deleteDog = {deleteDog} selectDog={selectDog}dogs={dogs} {...rp} />} />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" dog={emptyDog} handleSubmit={handleCreate} />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" dog={selectedDog} handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
