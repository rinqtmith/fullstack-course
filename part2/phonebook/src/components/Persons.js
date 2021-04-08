import Person from "./Person";

const Persons = ({ filteredPersons, deletePerson }) => (
  <div>
    {filteredPersons.map((person) => (
      <Person
        key={person.id}
        person={person}
        deletePerson={deletePerson}
      ></Person>
    ))}
  </div>
);

export default Persons;
