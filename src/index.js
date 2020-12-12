const list = document.querySelector('#results');

// 1. find the input
const input = document.querySelector('input');
// 2. add an event listener to the input
// releases the key, keyup
// input.addEventListener(EVENT, BEHAVIOR)
input.addEventListener('keyup', (event) => {
  // 3. extract what's inside the input
  const content = input.value;
  // 4. call the api
  const url = "https://places-dsn.algolia.net/1/places/query";

  // this is a post request;
  // by default, fetch() makes a GET request

  const dataToSend = {
    query: content
  }

  const dataToSendAsString = JSON.stringify(dataToSend);

  fetch(url, {
    method: 'POST',
    body: dataToSendAsString
  })
    .then(response => response.json())
    .then((data) => {
      const results = data.hits;

      // clean the list before looping
      list.innerHTML = '';
      
      results.forEach((result) => {
        // digging the json
        // result.locale_names.default[0]
        const placeName = result.locale_names.default[0];

        const placeHTML = `<p> ${placeName} </p>`

        list.insertAdjacentHTML('beforeend', placeHTML)

      })
    });
})


// this is what we do every single time
// fetch(url)
//     .then(response => response.json())
//     .then((data) => {
//       console.log(data);
//     });