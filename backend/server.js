require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("📦 Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

// Modelo de Tarefa
const TarefaSchema = new mongoose.Schema({
  nome: String,
  data: String,
  concluida: Boolean,
});

const Tarefa = mongoose.model("Tarefa", TarefaSchema);

// Rotas da API
app.get("/", (req, res) => {
  res.send("API do Gerenciador de Tarefas está rodando...");
});

// 1️⃣ Criar uma nova tarefa
app.post("/tarefas", async (req, res) => {
  try {
    const { nome, data } = req.body;
    const novaTarefa = new Tarefa({ nome, data, concluida: false });
    await novaTarefa.save();
    res.status(201).json(novaTarefa);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar tarefa" });
  }
});

// 2️⃣ Listar todas as tarefas
app.get("/tarefas", async (req, res) => {
  try {
    const tarefas = await Tarefa.find();
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar tarefas" });
  }
});

// 3️⃣ Atualizar uma tarefa
app.put("/tarefas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { concluida } = req.body;
    const tarefaAtualizada = await Tarefa.findByIdAndUpdate(id, { concluida }, { new: true });
    res.json(tarefaAtualizada);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar tarefa" });
  }
});

// 4️⃣ Excluir uma tarefa
app.delete("/tarefas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Tarefa.findByIdAndDelete(id);
    res.json({ message: "Tarefa removida com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir tarefa" });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:5000`);
});