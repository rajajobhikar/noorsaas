export async function fetchLiveMatches() {
  const res = await fetch('https://cricbuzz-cricket.p.rapidapi.com/series/v1/international', {
      headers: {
        'x-rapidapi-key':'908761e938msh1a5faac21ea56e3p1015c9jsn3a2ac03e9ca8',
        'x-rapidapi-host':'cricbuzz-cricket.p.rapidapi.com'
        }
  });
  const data = await res.json();
  console.log(data)
  return data.matches || [];
}