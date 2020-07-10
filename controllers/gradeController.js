import { db } from "../models/index.js";
import { logger } from "../config/logger.js";

const Student = db.student;

const create = async (req, res) => {
    const { name, subject, type, value, lastModified } = req.body;

    const student = new Student({
        name: name,
        subject: subject,
        type: type,
        value: value,
        lastModified: lastModified,
    });
    try {
        const data = await Student.save(student);
        console.log(student);
        console.log(data);
        res.send(data);
        logger.info(`POST /grade - ${JSON.stringify()}`);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Algum erro ocorreu ao salvar",
        });
        logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
    }
};

const findAll = async (req, res) => {
    const name = req.query.name;

    //condicao para o filtro no findAll
    var condition = name
        ? { name: { $regex: new RegExp(name), $options: "i" } }
        : {};

    try {
        const data = await Student.find(condition);
        res.send(data);
        logger.info(`GET /grade`);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Erro ao listar todos os documentos",
        });
        logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
    }
};

const findOne = async (req, res) => {
    const id = req.params.id;

    try {
        const data = await Student.findById({ _id: id });
        res.send(data);
        logger.info(`GET /grade - ${id}`);
    } catch (error) {
        res.status(500).send({ message: "Erro ao buscar o Grade id: " + id });
        logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
    }
};

const update = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Dados para atualizacao vazio",
        });
    }

    const id = req.params.id;

    try {
        const data = await Student.findByIdAndUpdate({ _id: id }, req.body, {
            new: true,
        });
        if (!data) {
            res.send(`Grade id ${id} não encontrada`);
        } else {
            res.send({ message: "Grade atualizada com sucesso" });
        }
        logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
    } catch (error) {
        res.status(500).send({
            message: "Erro ao atualizar a Grade id: " + id,
        });
        logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
    }
};

const remove = async (req, res) => {
    const id = req.params.id;

    try {
        const data = await Student.findByIdAndRemove({ _id: id });
        if (!data) {
            res.send(`Grade id ${id} não encontrada`);
        } else {
            res.send({ message: "Grade excluida com sucesso" });
        }
        logger.info(`DELETE /grade - ${id}`);
    } catch (error) {
        res.status(500).send({
            message: "Nao foi possivel deletar o Grade id: " + id,
        });
        logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
    }
};

const removeAll = async (req, res) => {
    try {
        const data = await Student.deleteMany();
        if (!data) {
            res.send(`Nenhuma grade encontrada`);
        } else {
            res.send({
                message: `Grades excluidos`,
            });
        }

        logger.info(`DELETE /grade`);
    } catch (error) {
        res.status(500).send({ message: "Erro ao excluir todos as Grades" });
        logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
    }
};

export default { create, findAll, findOne, update, remove, removeAll };
