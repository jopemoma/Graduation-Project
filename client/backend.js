import { ip } from './ip.json';

const ipAdress = `http://${ip}:3000`;

const options = (id, name) => ({ method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ facebookId: id, name }) });

function updateUser(id, name) {
  fetch(`${ipAdress}/users`, options(id, name));
}

function fetchEvents(cb) {
  fetch(`${ipAdress}/events`)
    .then(res => res.json())
    .then(data => cb(data))
    .catch(console.error);
}

export { updateUser, fetchEvents };
