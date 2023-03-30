const mapperClassroom = ({ user, classroom }) => {
    const { role } = user;

    if (role !== 'mentor') return mapperMentee({ classroom });
    else return mapperMentor({ classroom });
};

const mapperMentee = ({ classroom }) => {
    let result = [];

    for (const iterator of classroom) {
        let container = {};
        container.class = iterator.name;
        container.quiz = iterator.quiz;
        result.push(container);
    }

    return result;
};

const mapperMentor = ({ classroom }) => {
    let result = [];

    for (const iterator of classroom) {
        let container = {};
        container.class = iterator.name;
        container.quiz = iterator.quiz;
        container.listMentee = iterator.mentee;
        result.push(container);
    }

    return result;
};

module.exports = {
    mapperClassroom,
    mapperMentee,
    mapperMentor,
};
