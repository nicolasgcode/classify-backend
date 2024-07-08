// ORM -> Patrón Data Mapper -> Robusto, escalabre, sencillo de modificar y separa los conceptos de BE y DBA en dos componentes (clases) diferentes.

//Permite que todos mis repositorios implementen estos elementos
export interface Repository<T> {
  findAll(): T[] | undefined; // <Promise T[] | undefined> en DBA
  findOne(item: { id: string }): T | undefined;
  add(item: T): T | undefined;
  update(item: T): T | undefined;
  delete(item: { id: string }): T | undefined; // A veces puede ser conveniente devolver el elemento borrado
}
