import { PrismaClient } from './generated/prisma/index.js';
import express from 'express';
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Permitir todas as origens
app.use(cors());

// ------------------ PRODUTOS ------------------

// POST cadastrar produto
app.post('/produtos', async (req, res) => {
    const { nome, preco, estoque } = req.body;

    if (!nome || preco === undefined) {
        return res.status(400).json({ error: "Nome e preço são obrigatórios." });
    }

    try {
        const produto = await prisma.produto.create({
            data: {
                nome,
                preco: Number(preco),
                estoque: Number(estoque) ?? 0
            }
        });
        res.status(201).json(produto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET listar produtos (com busca e paginação)
app.get('/produtos', async (req, res) => {
    const { search, page = 1, limit = 10 } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    try {
        const produtos = await prisma.produto.findMany({
            where: search
                ? { nome: { contains: search, mode: "insensitive" } }
                : {},
            skip,
            take: Number(limit),
            orderBy: { id: "asc" }
        });
        res.json(produtos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET buscar produto pelo ID
app.get('/produtos/:id', async (req, res) => {
    try {
        const produto = await prisma.produto.findUnique({
            where: { id: Number(req.params.id) }
        });

        if (!produto) {
            return res.status(404).json({ error: "Produto não encontrado." });
        }

        res.json(produto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// ------------------ CLIENTES ------------------

// POST cadastrar cliente
app.post('/clientes', async (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ error: "Nome e email são obrigatórios." });
    }

    try {
        const cliente = await prisma.cliente.create({
            data: { nome, email }
        });
        res.status(201).json(cliente);
    } catch (error) {
        // se o email já existe
        if (error.code === "P2002") {
            return res.status(400).json({ error: "Email já cadastrado." });
        }
        res.status(400).json({ error: error.message });
    }
});

// GET listar clientes
app.get('/clientes', async (req, res) => {
    try {
        const clientes = await prisma.cliente.findMany({
            orderBy: { id: "asc" }
        });
        res.json(clientes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET buscar cliente pelo ID
app.get('/clientes/:id', async (req, res) => {
    try {
        const cliente = await prisma.cliente.findUnique({
            where: { id: Number(req.params.id) }
        });

        if (!cliente) {
            return res.status(404).json({ error: "Cliente não encontrado." });
        }

        res.json(cliente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000 🚀");
});