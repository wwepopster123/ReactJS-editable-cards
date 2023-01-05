import "./App.css";
import plus from "./plus.svg";
import { Card } from "./Card";
import { useState, useEffect } from "react";

function App() {
  function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const preloadData = {
    names: ["Jon", "Miron", "Anton", "Daniel", "Jony", "Filip"],
    positions: [
      "Handyman",
      "Shop foreman",
      "Animal breeder",
      "Programmer",
      "1C writer",
    ],
  };
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    handleAddCard();
  }, []);

  const handleChangePerson = (editPreson) => {
    const updatedPersons = persons.map((person) => {
      if (person.id === editPreson.id) {
        return {
          ...person,
          name: editPreson.name,
          post: editPreson.post,
          age: editPreson.age,
          experience: editPreson.experience,
        };
      }
      return person;
    });

    setPersons(updatedPersons);
  };

  const handleDeletePerson = (personDelete) => {
    setPersons(
      persons.filter((fPerson) => {
        if (fPerson.id !== personDelete.id) return fPerson;
      })
    );
  };

  const handleAddCard = () => {
    const rndNameNumber = randomNumberInRange(0, preloadData.names.length - 1);
    const rndPostNumber = randomNumberInRange(
      0,
      preloadData.positions.length - 1
    );

    console.log(preloadData.names[rndNameNumber]);
    setPersons([
      ...persons,
      {
        id: Date.now() + randomNumberInRange(-100000, 100000),
        name: preloadData.names[rndNameNumber],
        post: preloadData.positions[rndPostNumber],
        age: randomNumberInRange(18, 40),
        experience: randomNumberInRange(0.5, 5),
      },
    ]);
  };

  const handleToupPerson = (replacePerson) => {
    var indexFindPerson;
    const tempPersonList = persons.map((fPerson, index) => {
      if (fPerson.id === replacePerson.id) {
        indexFindPerson = index;
      }
      return fPerson;
    });
    if (indexFindPerson <= 0) return;

    console.log(indexFindPerson);

    const tempPerson = tempPersonList[indexFindPerson - 1];
    tempPersonList[indexFindPerson - 1] = tempPersonList[indexFindPerson];
    tempPersonList[indexFindPerson] = tempPerson;

    setPersons(tempPersonList);
  };

  const handleTodownPerson = (replacePerson) => {
    var indexFindPerson;
    const tempPersonList = persons.map((fPerson, index) => {
      if (fPerson.id === replacePerson.id) {
        indexFindPerson = index;
      }
      return fPerson;
    });
    if (indexFindPerson >= tempPersonList.length - 1) return;

    console.log(indexFindPerson);

    const tempPerson = tempPersonList[indexFindPerson + 1];
    tempPersonList[indexFindPerson + 1] = tempPersonList[indexFindPerson];
    tempPersonList[indexFindPerson] = tempPerson;

    setPersons(tempPersonList);
  };

  return (
    <div className="App">
      {persons.map((person) => (
        <Card
          key={person.id}
          person={person}
          handleDeletePerson={handleDeletePerson}
          handleChangePerson={handleChangePerson}
          handleToupPerson={handleToupPerson}
          handleTodownPerson={handleTodownPerson}
        />
      ))}
      <img onClick={handleAddCard} className="addCard" src={plus} />
    </div>
  );
}

export default App;
