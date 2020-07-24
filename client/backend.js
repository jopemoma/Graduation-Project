import { ip } from './ip.json';

const ipAdress = `http://${ip}:3000`;

const options = (id, name) => ({ method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ facebookId: id, name }) });
const authenticateOptions = (username, password) => ({ method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) });
const genericOptions = (data) => ({ method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });

function updateUser(id, name) {
  fetch(`${ipAdress}/users`, options(id, name));
}

async function fetchOrgEvent(orgId, cb) {
  const events = await (await fetch(`${ipAdress}/orgs/${orgId}/events`)).json();
  cb(events);
}

async function fetchEvents(cb) {
  const events = await (await fetch(`${ipAdress}/events`)).json();
  const orgs = await (await fetch(`${ipAdress}/orgs`)).json();
  const eventData = events.map((event) => ({
    ...event,
    orgName: orgs.filter((org) => (org.organizationId === event.organizationId))[0].name,
  }));
  cb(eventData);
}

async function authenticateUser(username, password) {
  const response = await (await fetch(`${ipAdress}/authenticate`, authenticateOptions(username, password))).json(); // object
  return response;
}

async function createEvent(eventData) {
  const response = await (await fetch(`${ipAdress}/events`, genericOptions(eventData))).json();
  return response;
}

async function addUserToEvent(userId, eventId) {
  const event = await (await fetch(`${ipAdress}/events/${eventId}`, genericOptions({ userId }))).json();
  const orgs = await (await fetch(`${ipAdress}/orgs`)).json();
  const eventData = {
    ...event,
    orgName: orgs.filter((org) => (org.organizationId === event.organizationId))[0].name,
  };
  return eventData;
}

export {
  updateUser, fetchEvents, authenticateUser, createEvent, addUserToEvent, fetchOrgEvent,
};
