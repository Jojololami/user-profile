import React from 'react';
import { useEffect, useState } from 'react';
import Card from './Card';

const AllCards = () => {

    const [users, setUsers] = useState([]);

    //To handle loading and error states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   //For theme toggling
    const [theme, setTheme] = useState('light');

     //Search users by name or username
     const [searchName, setSearchName] = useState('');

     //Search users by city or company
     const [cityOrCompany, setCityOrCompany] = useState('');

      useEffect(( ) => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch users');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(`${theme}-mode`);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

   const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchName.toLowerCase()) ||
    user.username.toLowerCase().includes(searchName.toLowerCase())
  );

  const filteredByCityOrCompany = users.filter(user =>
    user.address.city.toLowerCase().includes(cityOrCompany.toLowerCase()) ||
    user.company.name.toLowerCase().includes(cityOrCompany.toLowerCase())
  );

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
   <>
   <div> 
    <h1 className="directory_heading">User Directory</h1>
        <div className='change_theme blinking-text'><button className='text-xs' onClick={toggleTheme}><em>Click to change theme!</em></button>
        </div>
       <div style={{ justifyContent: 'center', alignItems: 'center', display:'flex', gap:'10px'  }}>
         <input
          type="text"
          placeholder="Search by name or username"
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
        />

          <input
          type="text"
          placeholder="Search by city or company"
          value={cityOrCompany}
          onChange={e => setCityOrCompany(e.target.value)}
        />
        
       </div>
   </div>
   {/* Cards filtered by name/username */}
       <main className='all_cards_container'>
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => <Card key={user.id} user={user} />)
        ) : (
          <p>No users found.</p>
        )}
      </main>

      {/* Cards filtered by city/company */}
      <main className='all_cards_container'>
        {filteredByCityOrCompany.length > 0 ? (
          filteredByCityOrCompany.map(user => <Card key={user.id} user={user} />)
        ) : (
          <p>No users found for this city or company.</p>
        )}
      </main>
      
      </>
  )
}

export default AllCards