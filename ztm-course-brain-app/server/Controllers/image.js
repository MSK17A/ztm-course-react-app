const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();

const imageHandler = (req, res, db) => {
    const { id, img_url } = req.body; // Params will get :id

    metadata.set("authorization", "Key 984ae0d1293347e6b040243f2da618a0");
    stub.PostModelOutputs(
        {
            // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
            model_id: "face-detection",
            inputs: [{ data: { image: { url: img_url } } }]
        },
        metadata,
        (err, response) => {
            if (err) {
                console.log("Error: " + err);
                res.json('An error has occured!')
                return;
            }
            if (response.status.code !== 10000) {
                console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
                res.status(400).json('Receiving image failure!')
                return;
            }

            const bboxes = clarifai_getBBoxes(response);

            // Increment the entries on the database.
            db('users')
                .where('id', '=', id)
                .increment('entries', 1).returning('entries')
                .then(entries => {

                    out = {
                        bboxes: bboxes,
                        entries: entries[0].entries
                    }
                    res.json(out); // return bounding boxes along with entries.
                });
        }
    );
}

const clarifai_getBBoxes = (response) => {

    console.log("Predicted concepts, with confidence values:")
    const faces = response.outputs[0].data.regions;
    let bboxes = [];

    for (let face = 0; face < faces.length; face++) {
        bboxes.push(faces[face].region_info.bounding_box);

    }
    return bboxes;

}

/*const update_entries = (users, id, bboxes, res) => {

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
}*/

module.exports = {
    imageHandler: imageHandler
};