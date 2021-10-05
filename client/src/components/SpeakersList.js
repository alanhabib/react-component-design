import { useContext, useEffect, useState } from "react";
import Speaker from "./Speaker";
import ReactPlaceHolder from "react-placeholder";
// import useRequestRest, { REQUEST_STATUS } from "../hooks/useRequestRest";
import { data } from "../SpeakerData";
import { SpeakerFilterContext } from "../context/SpeakerFilterContext";
import SpeakerAdd from "./SpeakerAdd";
import axios from "axios";

const restUrl = "http://localhost:9000/api";

function SpeakersList() {
  const [person, setPerson] = useState("");
  const [contacts, setContacts] = useState([]);

  const onInputChange = (event) => {
    setPerson({ ...person, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    async function delayFunc() {
      try {
        const result = await axios.get(restUrl);
        setContacts(result.data);
      } catch (e) {
        console.log(e);
      }
    }
    delayFunc();
  }, []);
  // const {
  //   data: speakersData,
  //   requestStatus,
  //   error,
  //   updateRecord,
  //   insertRecord,
  //   deleteRecord,
  // } = useRequestRest();

  const { searchQuery, eventYear } = useContext(SpeakerFilterContext);

  // if (requestStatus === REQUEST_STATUS.FAILURE) {
  //   return (
  //     <div className="text-danger">
  //       ERROR: <b>loading Speaker Data Failed {error}</b>
  //     </div>
  //   );
  // }

  //if (isLoading === true) return <div>Loading...</div>
  const onSubmit = async (e) => {
    e.preventDefault();
    const newPerson = {
      name: person?.name,
      position: person?.position,
      level: person?.level,
    };
    await axios.post(restUrl + "/add", newPerson);
    console.log(person);
    setPerson({
      name: "",
      level: "",
      position: "",
    });
  };

  const onDelete = async (id) => {
    axios.delete(`${restUrl}/${id}`);
    setContacts((contacts) => contacts.filter((contact) => contact._id !== id));
  };

  return (
    <div>
      {/* <ReactPlaceHolder
        type="media"
        rows={15}
        className="speakerslist-placeholder"
        ready={requestStatus === REQUEST_STATUS.SUCCESS}
      > */}
      {/* insertRecord={insertRecord} */}
      {/* <SpeakerAdd eventYear={eventYear} />

      <div className="row">
        {data
          .filter(function (speaker) {
            return (
              speaker.first.toLowerCase().includes(searchQuery) ||
              speaker.last.toLowerCase().includes(searchQuery)
            );
          })
          .filter(function (speaker) {
            return speaker.sessions.find((session) => {
              return session.eventYear === eventYear;
            });
          })
          .map(function (speaker) {
            return (
              <Speaker
                key={speaker.id}
                speaker={speaker}
                // updateRecord={updateRecord}
                // insertRecord={insertRecord}
                // deleteRecord={deleteRecord}
              />
            );
          })}
      </div> */}
      <div style={{ marginTop: 20 }}>
        <h3>Create New Record</h3>
        <form onSubmit={onSubmit}>
          <div>
            <label>Name of the person: </label>
            <input
              type="text"
              value={person?.name}
              onChange={onInputChange}
              name="name"
            />
          </div>
          <div>
            <label>Person's position: </label>
            <input
              type="text"
              value={person?.position}
              onChange={onInputChange}
              name="position"
            />
          </div>
          <div>
            <div>
              <input
                type="text"
                name="level"
                value={person?.level}
                onChange={onInputChange}
              />
              <label>Intern</label>
            </div>
          </div>
          <div>
            <input type="submit" value="Create person" />
          </div>
        </form>
      </div>
      {contacts?.map(({ name, position, level, _id }) => {
        return (
          <div key={_id}>
            <h1>{name}</h1>
            <h3>{position}</h3>
            <h3>{level} </h3>
            <div style={{ cursor: "pointer" }} onClick={() => onDelete(_id)}>
              DELETE
            </div>
          </div>
        );
      })}
      {/* </ReactPlaceHolder> */}
    </div>
  );
}

export default SpeakersList;
