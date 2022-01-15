import { UserStore } from '../../models/user';

const store = new UserStore();

describe('User Model Test', () => {
    beforeAll(async () => {
        await store.create({
            user_name: 'admin1',
            first_name: 'adminFirst',
            last_name: 'adminLast',
            password: 'password@1234',
        });
    });
    it('User model should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('User create should add user successfully', async () => {
        const result = await store.create({
            user_name: 'test_name',
            first_name: 'first_name',
            last_name: 'last_name',
            password: 'password@1234',
        });
        expect(result.user_name).toEqual('test_name');
        expect(result.first_name).toEqual('first_name');
        expect(result.last_name).toEqual('last_name');
    });

    it('User model should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('User index should return users successfully', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThanOrEqual(1);
    });

    it('User model should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('User model should have an authenticate method', () => {
        expect(store.authenticate).toBeDefined();
    });
});
