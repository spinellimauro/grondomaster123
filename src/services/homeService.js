import firebase from "firebase";

export async function insertPlayer(request) {
  const root = firebase.database().ref();
  let response = {};
  const playerKey = root.child("players").push().key;

  let updateObject = {};

  updateObject[`trainers/${request.trainerName}/${playerKey}/name`] =
    request.player.name;
  updateObject[`trainers/${request.trainerName}/${playerKey}/value`] =
    request.player.value;
  updateObject[`trainers/${request.trainerName}/${playerKey}/overall_rating`] =
    request.player.overall_rating;

  const errorInsertOrder = await root.update(updateObject);

  if (errorInsertOrder) {
    response.error = errorInsertOrder;
    response.player_key = playerKey;
  }

  return response;
}
