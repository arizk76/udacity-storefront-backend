import { ProductStore } from '../../models/product';

const store = new ProductStore();

describe('Product Model Test', () => {
    beforeAll(async () => {
        await store.create({
            name: 'ProductTest',
            price: 40,
        });
    });
    it('Product model should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('Product create should add Product successfully', async () => {
        const result = await store.create({
            name: 'productName',
            price: 60,
        });
        expect(result.name).toEqual('productName');
        expect(result.price).toEqual(60);
    });

    it('Product model should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('Product index should return products successfully', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThanOrEqual(1);
    });

    it('Product model should have a show method', () => {
        expect(store.show).toBeDefined();
    });
});
