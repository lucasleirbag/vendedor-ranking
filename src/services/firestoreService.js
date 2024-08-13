import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Função para obter todos os vendedores uma vez
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

// Função para obter vendedores em tempo real e ordená-los por quantidade de vendas
export const getVendedoresRealtime = (callback) => {
    const unsubscribe = onSnapshot(collection(db, "vendedores"), (snapshot) => {
        const vendedores = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        // Ordena por quantidade de vendas de forma decrescente
        vendedores.sort((a, b) => b.quantidade - a.quantidade);
        callback(vendedores);
    });
    
    return unsubscribe; // Retorna a função para cancelar a inscrição (unsubscribing)
};
