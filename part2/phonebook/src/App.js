import React, { useState, useEffect } from 'react';
import phoneService from './services/phones';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filtered, setFiltered] = useState('');
  const [errorMessage, setErrorMessage] = useState({
    message: null,
    type: 'error',
  });

  useEffect(() => {
    phoneService.getAll().then((initialPhones) => {
      setPersons(initialPhones);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFiltered(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    if (persons.some((person) => person.name === newName)) {
      const confirmed = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`,
      );
      const { id } = persons.filter((person) => person.name === newName)[0];
      if (confirmed) {
        phoneService
          .updateOne(id, newPerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : updatedPerson,
              ),
            );
            setErrorMessage({
              message: `${newPerson.name} is updated.`,
              type: 'success',
            });
            setTimeout(() => {
              setErrorMessage({
                message: null,
                type: 'error',
              });
            }, 5000);
          })
          .catch((error) => {
            setErrorMessage({
              message: `Error occured while trying to update ${newPerson.name}`,
              type: 'error',
            });
          });
      }
    } else {
      phoneService
        .addOne(newPerson)
        .then((returnedPhones) => {
          setPersons(persons.concat(returnedPhones));
          setErrorMessage({
            message: `${newPerson.name} is added.`,
            type: 'success',
          });
          setTimeout(() => {
            setErrorMessage({
              message: null,
              type: 'error',
            });
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage({
            message: `Error occured while trying to add ${newPerson.name}`,
            type: 'error',
          });
        });
    }
    setNewName('');
    setNewNumber('');
  };

  const deletePerson = (person) => {
    const confirmed = window.confirm(`Delete ${person.name} ?`);
    if (confirmed) {
      phoneService
        .deleteOne(person.id)
        .then((newPhones) => {
          phoneService.getAll().then((initialPhones) => {
            setPersons(initialPhones);
            setErrorMessage({
              message: `${person.name} is deleted.`,
              type: 'success',
            });
            setTimeout(() => {
              setErrorMessage({
                message: null,
                type: 'error',
              });
            }, 5000);
          });
        })
        .catch((error) => {
          setErrorMessage({
            message: `Error occured while trying to delete ${person.name}`,
            type: 'error',
          });
        });
    }
  };

  let filteredPersons = filtered
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filtered.toLowerCase()),
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={errorMessage.message} type={errorMessage.type} />

      <Filter filtered={filtered} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>

      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
