const clarifai_getBBoxes = (err, response) => {
    if (err) {
        console.log("Error: " + err);
        return;
    }

    if (response.status.code !== 10000) {
        console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
        return;
    }

    console.log("Predicted concepts, with confidence values:")
    const faces = response.outputs[0].data.regions;
    let bboxes = [];

    for (let face = 0; face < faces.length; face++) {
        bboxes.push(faces[face].region_info.bounding_box);

    }
    return bboxes;

}

const update_entries = (users, id, bboxes, res) => {

    users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;

            out = {
                bboxes: bboxes,
                entries: user.entries
            }
            return res.json(out);
        }
    })
    if (!found) {
        res.status(404).json("no such user");
    }
}

module.exports = {
    clarifai_getBBoxes,
    update_entries
};