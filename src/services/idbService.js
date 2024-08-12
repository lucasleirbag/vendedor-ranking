import { openDB } from 'idb';

const dbPromise = openDB('vendedor-ranking-db', 1, {
    upgrade(db) {
        const store = db.createObjectStore('vendedores', {
            keyPath: 'id',
            autoIncrement: true,
        });
        store.createIndex('nome', 'nome');
        store.createIndex('quantidade', 'quantidade');
    },
});

export async function getVendedores() {
    return (await dbPromise).getAll('vendedores');
}

export async function addVendedor(vendedor) {
    return (await dbPromise).add('vendedores', vendedor);
}

export async function updateVendedor(id, vendedor) {
    return (await dbPromise).put('vendedores', vendedor);
}

export async function deleteVendedor(id) {
    return (await dbPromise).delete('vendedores', id);
}
