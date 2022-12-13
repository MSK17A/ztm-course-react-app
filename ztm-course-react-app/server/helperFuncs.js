const getUserFromId = (id = '') => {
    const { id } = req.params; // Params will get :id
    let found = false;

    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return;
        };
    })
}