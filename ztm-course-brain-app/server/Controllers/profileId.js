const profileIdHandler = (req, res, db) => {
    const { id } = req.params; // Params will get :id

    db.select('*').from('users').where('id', id).then(user => {

        if (user.length) { // Since the legnth (if user exists) will be more than zero, then it will be true.
            res.json(user[0]);
        } else {
            res.status(400).json('User not found!');
        }
    })
}

module.exports = {
    profileIdHandler: profileIdHandler
}