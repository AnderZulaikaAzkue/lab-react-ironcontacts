import { useEffect, useState } from "react";
import contactsJson from '../../contacts.json'

function ContactList({ name, wonOscar, wonEmmy }) {

  const [contacts, setContacts] = useState([])

  useEffect(() => {
    setContacts(contactsJson.slice(0, 5))
  }, [])

  const handleRandomContact = () => {
    setContacts((prevContacts) => {
      let randomContact

      do {
        randomContact = contactsJson[Math.floor(Math.random() * contactsJson.length)]
      } while (prevContacts.includes(randomContact))

      return [randomContact, ...prevContacts]
    })
  }

  const handleSortName = () => {
    setContacts([...contacts].sort((a, b) => a.name.localeCompare(b.name)));
  };

  function handleSortPopularity() {
    setContacts([...contacts].sort((a, b) => (b.popularity - a.popularity)));
  };

  const handleDeleteContact = (id) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  return (
    <div>
      <button className='m-3' onClick={handleSortName}> Sort by Name</button>
      <button className='m-3' onClick={handleSortPopularity}> Sort by Popularity</button>
      <button className='m-3' onClick={handleRandomContact}>Add Random Contact</button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Picture</th>
            <th scope="col">Name</th>
            <th scope="col">Popularity</th>
            <th scope="col">Won Oscar</th>
            <th scope="col">Won Emmy</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => {
            return (
              <tr key={contact.id}>
                <th scope="row">
                  <img src={contact.pictureUrl} alt={name} />
                </th>
                <td>{contact.name}</td>
                <td>{contact.popularity}</td>
                <td className=''>{contact.wonOscar && <span>🏆</span>}</td>
                <td className=''>{contact.wonEmmy && <span>🏆</span>}</td>
                <td>
                  <button
                    className="btn btn-outline-danger fs-4 m-3"
                    onClick={(event) => handleDeleteContact(contact.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ContactList