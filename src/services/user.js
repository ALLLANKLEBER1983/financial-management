const ValidationError = require('../errors/ValidationError')

module.exports = (app) => {
    const findAll = (filter = {}) => {
        return app.db('users').where(filter).select();
    };

    const save = async (user) => {
        if(!user.name) throw new ValidationError('nome é um atributo obrigatório');
        if(!user.mail) throw new ValidationError('email é um atributo obrigatório');
        if(!user.passwd) throw new ValidationError('senha é um atributo obrigatório');

        const userDb = await findAll({mail: user.mail})
        if(userDb && userDb.length >0) throw new ValidationError('Já existe um usuário com esse email')

        return app.db('users').insert(user,'*');
    };

    return {findAll,save}
}