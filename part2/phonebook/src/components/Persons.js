import Person from "./Person";

const Persons = ({ filteredPersons }) => (
  <div>
    {filteredPersons.map((person) => (
      <Person key={person.name} person={person}></Person>
    ))}
  </div>
);

export default Persons;
