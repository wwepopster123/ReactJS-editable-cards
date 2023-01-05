import personSvg from "./person.svg";
import edit from "./edit.svg";
import done from "./done.svg";
import deleteSvg from "./delete.svg";
import arrow from "./arrow.svg";
import { useEffect, useState } from "react";

export const Card = (props) => {
  const [isEdit, setEditMode] = useState(false);
  const [person, setPerson] = useState({});

  const [inputName, setInputName] = useState("");
  const [inputPost, setInputPost] = useState("");
  const [inputAge, setInputAge] = useState(0);
  const [inputExperience, setInputExperience] = useState(0);

  useEffect(() => {
    setPerson(props.person);
    setInputName(props.person.name);
    setInputPost(props.person.post);
    setInputAge(props.person.age);
    setInputExperience(props.person.experience);
  }, []);

  const handleEditableClick = () => {
    setEditMode(!isEdit);
    if (isEdit) {
      setPerson({
        id: person.id,
        name: inputName,
        post: inputPost,
        age: inputAge <= 16 ? 16 : inputAge,
        experience: inputExperience <= 0 ? 0 : inputExperience,
      });
      props.handleChangePerson(person);
    }
  };

  return (
    <div key={person.id} className="card">
      <img
        onClick={handleEditableClick}
        className="editable"
        src={!isEdit ? edit : done}
      />
      <img
        onClick={() => {
          props.handleDeletePerson(person);
        }}
        className="delete"
        src={deleteSvg}
      />
      <img
        onClick={() => {
          props.handleToupPerson(person);
        }}
        className="toup"
        src={arrow}
      />
      <img
        onClick={() => {
          props.handleTodownPerson(person);
        }}
        className="todown"
        src={arrow}
      />
      <div className="cardLine">
        <img className="person" src={personSvg} />
        {!isEdit ? (
          <p>{person.name}</p>
        ) : (
          <input
            onChange={(e) => {
              setInputName(e.target.value);
            }}
            defaultValue={person.name}
            type="text"
          />
        )}
      </div>
      <div className="cardLine">
        <p>
          Post:{" "}
          {!isEdit ? (
            <p>{person.post}</p>
          ) : (
            <input
              onChange={(e) => {
                setInputPost(e.target.value);
              }}
              defaultValue={person.post}
              type="text"
            />
          )}
        </p>
      </div>
      <div className="cardLine">
        <p>
          Age:{" "}
          {!isEdit ? (
            <p>{person.age}</p>
          ) : (
            <input
              onChange={(e) => {
                setInputAge(e.target.value);
              }}
              defaultValue={person.age}
              type="number"
            />
          )}
        </p>
      </div>
      <div className="cardLine">
        <p>
          Experience:{" "}
          {!isEdit ? (
            <p>{person.experience}</p>
          ) : (
            <input
              onChange={(e) => {
                setInputExperience(e.target.value);
              }}
              defaultValue={person.experience}
              type="number"
            />
          )}{" "}
          years
        </p>
      </div>
    </div>
  );
};
