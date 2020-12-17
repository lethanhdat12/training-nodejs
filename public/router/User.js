const uploadFile = (req) => {
    const updateFile = req.files.img;
    const img = updateFile.name;
    updateFile.mv(`public/img/${img}`).then(res => {
        console.log('upload file thanh cong');
    })
    return img;
}


module.exports = {

    addUser: (req, res) => {
        if (!req.files) {
            res.send('Không có file để upload');
        }
        const { name, old, vitri } = req.body;
        const img = uploadFile(req);
        const add_user = db.User.create({
            name: name,
            old: old,
            vitri: vitri,
            img: img
        }).then(data => {
            res.redirect('/');
        }).catch(err => {
            console.log(err);
        })
    },
    deleteUser: async (req, res) => {
        const id = req.params.id;
        await db.User.destroy({
            where: {
                id: id,
            }
        }).then(() => {
            res.redirect('/');
        }).catch(err => {
            console.log(err);
        })
    },

     
    getUseById: (req, res) => {
        const id = req.params.id;
        db.User.findAll({
            where: {
                id: id,
            }
        }).then(data => {
            res.render('views/editUser.ejs', {
                title: 'Edit thành viên',
                user: data[0].dataValues,
            })
        }).catch(err => {
            console.log(err);
        })
    },
    updateUser: async (req, res) => {
        const id = req.params.id;
        const { name, old, vitri } = req.body;
        const img = uploadFile(req);
        const updatedAt = new Date();
        await db.User.update({
            name: name,
            old: old,
            vitri: vitri,
            updatedAt: updatedAt,
            img: img,
        }, {
            where: {
                id: id
            }
        }).then(data => {
            res.redirect('/');
        }).catch(err => {
            console.log(err);
        })
    }

}

