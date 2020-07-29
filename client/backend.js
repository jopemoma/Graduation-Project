import { ip } from './ip.json';

const ipAdress = `http://${ip}:3000`;

const userOptions = (data) => ({ method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
const authenticateOptions = (username, password) => ({ method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) });
const genericOptions = (data, method) => ({ method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });

function createUser(data) {
  fetch(`${ipAdress}/users`, userOptions(data));
}

async function fetchUsers(volunteerList) {
  const returnArray = await Promise.all(volunteerList.map(async (fbId) => (await fetch(`${ipAdress}/users/${fbId}`)).json()));
  return returnArray;
}

async function acceptVolunteer(facebookId, eventId) {
  const result = await (await fetch(`${ipAdress}/events/${eventId}`, genericOptions({ facebookId, action: 'accept' }, 'PUT'))).json();
  return result;
}

async function rejectVolunteer(facebookId, eventId) {
  const result = await (await fetch(`${ipAdress}/events/${eventId}`, genericOptions({ facebookId, action: 'reject' }, 'PUT'))).json();
  return result;
}

async function fetchOrgEvent(orgId, cb, options) {
  const events = await (await fetch(`${ipAdress}/orgs/${orgId}/events`, options)).json();
  cb(events);
}

async function fetchEvents(callbacks, options) {
  const events = await (await fetch(`${ipAdress}/events`, options)).json();
  const orgs = await (await fetch(`${ipAdress}/orgs`, options)).json();
  const eventData = events.map((event) => ({
    ...event,
    orgName: orgs.filter((org) => (org.organizationId === event.organizationId))[0].name,
  }));

  callbacks.forEach((cb) => {
    cb(eventData);
  });
  return Promise.resolve();
}

async function fetchUserEvents(facebookId, callbacks) {
  const events = await (await fetch(`${ipAdress}/events`)).json();
  const eventData = events.filter((event) => event.volunteers.includes(facebookId));
  callbacks.forEach((cb) => {
    cb(eventData);
  });
  return Promise.resolve();
}

async function cancelEvent(eventId) {
  const result = await fetch(`${ipAdress}/events/${eventId}`, { method: 'DELETE' });
  return result;
}

async function removeUserFromEvent(facebookId, eventId) {
  const result = await (await fetch(`${ipAdress}/events/${eventId}`, genericOptions({ facebookId, action: 'remove' }, 'PUT'))).json();
  const orgs = await (await fetch(`${ipAdress}/orgs`)).json();
  const eventData = {
    ...result,
    orgName: orgs.filter((org) => (org.organizationId === result.organizationId))[0].name,
  };
  return eventData;
}

async function authenticateUser(username, password) {
  const response = await (await fetch(`${ipAdress}/authenticate`, authenticateOptions(username, password))).json(); // object
  return response;
}

async function createEvent(eventData) {
  const response = await (await fetch(`${ipAdress}/events`, genericOptions(eventData, 'POST'))).json();
  return response;
}

async function addUserToEvent(userId, eventId) {
  const event = await (await fetch(`${ipAdress}/events/${eventId}`, genericOptions({ userId }, 'POST'))).json();
  const orgs = await (await fetch(`${ipAdress}/orgs`)).json();
  const eventData = {
    ...event,
    orgName: orgs.filter((org) => (org.organizationId === event.organizationId))[0].name,
  };
  return eventData;
}

export {
  createUser, fetchEvents, authenticateUser, createEvent, addUserToEvent, fetchOrgEvent,
  fetchUsers, acceptVolunteer, rejectVolunteer, cancelEvent, fetchUserEvents,
};
