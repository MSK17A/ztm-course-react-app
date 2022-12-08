async function getInput(url = '', callback) {
    const input = fetch(url, {
        method: 'GET',
        headers: {
            'cookie': '_ga=GA1.2.138448697.1670533011; _gid=GA1.2.567739683.1670533011; session=53616c7465645f5f3708868e5d829c3e5cf50048f9eb7afc892b0e4e4da8d4b6cef2aef8f5f1338074173fc2783ced72e6d2392e4e722c593b211673254b497a'
        }
    }).then((resp) => resp.text()).then((text) => {
        callback(text);
    })
}

exports.getInput = getInput;