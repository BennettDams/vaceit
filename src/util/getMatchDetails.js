import axios from "axios";

async function fetchMatchDetails(matchId) {
  console.log("fetch match details");
  let baseUrl = "https://open.faceit.com/data/v4/matches/";
  let config = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.VUE_APP_FACEIT_API_KEY
    }
  };
  let url = baseUrl + matchId;
  await axios
    .get(url, config)
    .then(function(response) {
      console.log("RESPONSE", response);
      return response.data;
    })
    .catch(function(error) {
      console.log(error);
    });
}

export default function(matchId) {
  fetchMatchDetails(matchId).then(data => {
    console.log("data", data);
  });
}
