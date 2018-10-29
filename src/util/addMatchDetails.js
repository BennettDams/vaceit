import axios from "axios";

function fetchMatchDetailsFromAPI(matchId) {
  let config = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.VUE_APP_FACEIT_API_KEY
    }
  };
  return axios
    .get("https://open.faceit.com/data/v4/matches/" + matchId, config)
    .then(response => {
      return response.data;
    })
    .catch(function(error) {
      console.log(error);
    });
}

export default function(matchesRaw) {
  let matches = matchesRaw.map(e => {
    let match = e;
    fetchMatchDetailsFromAPI(match["match_id"]).then(data => {
      console.log(data);
      // match["matchDetails"] = data["rounds"];
      // if (data["rounds"]["round_stats"]) {
      //   match["resultScore"] = data["rounds"]["round_stats"]["Score"];
      // }
    });
    return match;
  });
  return matches;
}
