import { useEffect, useState } from "react";
import { addDoc, collection, getDocs, getFirestore, doc, deleteDoc } from "firebase/firestore";
import { databaseConfig } from "./database";
import "./Produtos.css";

const Produtos = () => {
    const [produtos, setProdutos] = useState([]);
    const [descricao, setDescricao] = useState("");
    const [link_produto, setLinkProduto] = useState("");
    const [valor, setValor] = useState("");


    const db = getFirestore(databaseConfig);
    const produtoCollection = collection(db, "produtos");

    useEffect(() => {
        const fetchProdutos = async () => {
            const data = await getDocs(produtoCollection);
            setProdutos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        fetchProdutos();
    }, [produtoCollection]);

    async function cadastrarProduto() {
        await addDoc(produtoCollection, {
            descricao,
            link_produto,
            valor,
        });

        setDescricao("");
        setLinkProduto("");
        setValor("");
    }

    async function deletarProduto(id) {
        const produtoDoc = doc(db, "produtos", id);
        await deleteDoc(produtoDoc);
        const updatedProdutos = produtos.filter((produto) => produto.id !== id);
        setProdutos(updatedProdutos);
    }

    return (
        <div className="produtos-container">
            <h2>Produtos</h2>
            <div className="form-container">
                <input
                    type="text"
                    placeholder="Descrição..."
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Link..."
                    value={link_produto}
                    onChange={(e) => setLinkProduto(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Valor..."
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                />
                <button onClick={cadastrarProduto}>Cadastrar</button>
            </div>
            <ul className="produtos-list">
                {produtos.map((produto) => (
                    <div className="produto-item" key={produto.id}>
                        <li>{produto.descricao}</li>
                        <li>{produto.link_produto}</li>
                        <li>{produto.nome_reserva}</li>
                        <li>{produto.valor}</li>
                        <li>{produto.reservado}</li>
                        <button onClick={() => deletarProduto(produto.id)}>Deletar</button>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default Produtos;