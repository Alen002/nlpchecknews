
function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let formText = document.getElementById('name').value
    if (formText.length == 0) {alert('Please enter a text');} // Validates whether user entered some text
    Client.checkForName(formText)
    console.log('The following text was entered:',formText);
    postText('http://localhost:8080/api', formText); //Constructor function defined below is executed - POST request in index.js
    console.log("::: Form Submitted :::");
}

// constructor function for fetching the data
const postText = async (url, data) => {
    const res = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        text: data})
    });
    try {
        const data = await res.json();
        console.log(data.polarity);
        console.log(data.subjectivity);
        // Some results of the fetch response are displayed in index.html
        document.getElementById('polarity').innerHTML = `Polarity: ${data.polarity}</br>`;
        document.getElementById('subjectivity').innerHTML = `Subjectivity: ${data.subjectivity}</br>`;
      }catch(error) {
      console.log("Something went wrong", error);
      }
  };

export { handleSubmit }

