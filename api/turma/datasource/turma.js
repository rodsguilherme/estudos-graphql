const { SQLDataSource } = require("datasource-sql");

class TurmasAPI extends SQLDataSource {
  constructor(dbConfig) {
    super(dbConfig);

    this.response = {
      mensagem: "",
    };
  }

  async getTurmas() {
    return this.db.select("*").from("turmas");
  }

  async getTurma(id) {
    return this.db.select("*").from("turmas").where({ id }).first();
  }

  async addTurma(turma) {
    const { horario, vagas, docente_id, descricao, inicio } = turma;

    const [turmaCreated] = await this.db
      .insert({ horario, vagas, docente_id, descricao, inicio })
      .into("turmas");

    return this.getTurma(turmaCreated);
  }

  async updateTurma({ id, turma }) {
    const { horario, vagas, docente_id, descricao, inicio } = turma;

    await this.db
      .update({ horario, vagas, docente_id, descricao, inicio })
      .from("turmas")
      .where({ id });

    const turmaUpdated = await this.getTurma(id);

    return turmaUpdated;
  }

  async deleteTurma(id) {
    await this.db("turmas").where({ id }).del();

    this.response.mensagem = "Deleted with sucess";
    return this.response.mensagem;
  }
}

module.exports = TurmasAPI;
