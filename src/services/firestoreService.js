import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Função para obter todos os vendedores
export const getVendedores = async () => {
    const querySnapshot = await getDocs(collection(db, "vendedores"));
    const vendedores = [];
    querySnapshot.forEach((doc) => {
        vendedores.push({ id: doc.id, ...doc.data() });
    });
    return vendedores;
};

// Função para adicionar um novo vendedor
export const addVendedor = async (vendedor) => {
    await addDoc(collection(db, "vendedores"), vendedor);
};

// Função para atualizar a quantidade de um vendedor
export const updateVendedorQuantidade = async (id, novaQuantidade) => {
    const vendedorRef = doc(db, "vendedores", id);
    await updateDoc(vendedorRef, {
        quantidade: novaQuantidade
    });
};

// Função para editar um vendedor
export const updateVendedor = async (id, updatedFields) => {
    const vendedorRef = doc(db, "vendedores", id);
    await updateDoc(vendedorRef, updatedFields);
};

// Função para excluir um vendedor
export const deleteVendedor = async (id) => {
    const vendedorRef = doc(db, "vendedores", id);
    await deleteDoc(vendedorRef);
};
