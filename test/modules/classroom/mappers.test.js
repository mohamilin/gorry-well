const classroomMapper = require('../../../src/modules/classroom/mappers');

describe('Unit test module classroom - mapper', () => {
    it('should mapper classroom - mentee role', () => {
        const user = {
            role: 'mentee',
        };

        const classroom = [];
        const mapper = classroomMapper.mapperClassroom({ user, classroom });
        expect(mapper).toBeDefined();
    });

    it('should mapper classroom - mentor role', () => {
        const user = {
            role: 'mentor',
        };

        const classroom = [];
        const mapper = classroomMapper.mapperClassroom({ user, classroom });
        expect(mapper).toBeDefined();
    });

    it('should mapper classroom - mentor role - mapperMente', () => {
        const classroom = [
            {
                name: 'name',
                quiz: 'quiz',
            },
        ];
        const mapper = classroomMapper.mapperMentee({ classroom });
        expect(mapper).toBeDefined();
    });

    it('should mapper classroom - mentor role - mapperMentor', () => {
        const classroom = [
            {
                name: 'name',
                quiz: 'quiz',
                mentee: [],
            },
        ];
        const mapper = classroomMapper.mapperMentor({ classroom });
        expect(mapper).toBeDefined();
    });
});
