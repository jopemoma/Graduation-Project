import { ip } from './ip.json';

const ipAdress = `http://${ip}:3000`;

const authenticateOptions = (username, password) => ({ method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) });
const options = (data, method) => ({ method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });

function createUser(data) {
  fetch(`${ipAdress}/users`, options(data, 'POST'));
}

async function fetchUser(facebookId) {
  return (await fetch(`${ipAdress}/users/${facebookId}`)).json();
}

async function fetchUsers(volunteerList) {
  const returnArray = await Promise.all(volunteerList.map(async (fbId) => (await fetch(`${ipAdress}/users/${fbId}`)).json()));
  return returnArray;
}

async function acceptVolunteer(facebookId, eventId) {
  const result = await (await fetch(`${ipAdress}/events/${eventId}`, options({ facebookId, action: 'accept' }, 'PUT'))).json();
  return result;
}

async function rejectVolunteer(facebookId, eventId) {
  const result = await (await fetch(`${ipAdress}/events/${eventId}`, options({ facebookId, action: 'reject' }, 'PUT'))).json();
  return result;
}

async function fetchOrgEvent(orgId, cb, fetchOptions) {
  const events = await (await fetch(`${ipAdress}/orgs/${orgId}/events`, fetchOptions)).json();
  cb(events);
}

async function fetchEvents(callbacks, fetchOptions) {
  const events = await (await fetch(`${ipAdress}/events`, fetchOptions)).json();
  const orgs = await (await fetch(`${ipAdress}/orgs`, fetchOptions)).json();
  const eventData = events.map((event) => ({
    ...event,
    orgName: orgs.filter((org) => (org.organizationId === event.organizationId))[0].name,
  }));

  callbacks.forEach((cb) => {
    cb(eventData);
  });
  return Promise.resolve();
}

async function fetchUserEvents(callbacks, filter) {
  const events = await (await fetch(`${ipAdress}/events`)).json();
  const eventData = events.filter(filter);
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
  const result = await (await fetch(`${ipAdress}/events/${eventId}`, options({ facebookId, action: 'remove' }, 'PUT'))).json();
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
  const response = await (await fetch(`${ipAdress}/events`, options(eventData, 'POST'))).json();
  return response;
}

async function addUserToEvent(userId, eventId) {
  const event = await (await fetch(`${ipAdress}/events/${eventId}`, options({ userId }, 'POST'))).json();
  const orgs = await (await fetch(`${ipAdress}/orgs`)).json();
  const eventData = {
    ...event,
    orgName: orgs.filter((org) => (org.organizationId === event.organizationId))[0].name,
  };
  return eventData;
}

export {
  createUser, fetchEvents, authenticateUser, createEvent, addUserToEvent, fetchOrgEvent,
  fetchUsers, acceptVolunteer, rejectVolunteer, cancelEvent, fetchUserEvents, removeUserFromEvent,
  fetchUser,
};
