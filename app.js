const form = $('#gifForm'); // Select form using jQuery
const gifsContainer = $('#gifs-container'); // Select gifs-container using jQuery
const input = $('#search'); // Select input using jQuery

form.on('submit', async function (e) {
    e.preventDefault();
    let searchValue = input.val();

    const response = await axios.get('https://api.giphy.com/v1/gifs/search', {
        params: {
            q: searchValue,
            api_key: window.config.apiKey,
        }
    });

    appendGif(response.data);
    input.val(''); // Clear input field after submission
});

function appendGif(response) {
    if (response.data.length > 0) {
        const gifUrl = response.data[0].images.original.url;
        const img = $('<img>', { class: 'img-fluid mx-auto col-md-4' });
        img.attr('src', gifUrl);
        img.css({
            justifyContent: 'center',
            width: '100%',
            padding: '10px'
        })// Set src attribute using attr() method
        gifsContainer.append(img); // Append img to gifsContainer using jQuery
    }
}

$('#removeGif').on('click', () => {
    gifsContainer.empty(); // Clear gifsContainer by removing all its children
});
